import Flux from '@4geeksacademy/react-flux-dash';
import WP from 'wordpress-rest-api';
import BC from '../utils/api.js';

import StudentStore from '../stores/StudentStore';
import DeliverAssignment from '../components/DeliverAssignment';
import BCStore from '../stores/BCStore';
import { NotifyActions, Notify, logout } from '../utils/react-components/src/index';

class StudentActions extends Flux.Action{
    
    constructor(){
        super();
        this.wp = new WP({ endpoint: process.env.CMS_URL+'/wp-json' });
        this.wp.lessons = this.wp.registerRoute( 'wp/v2', '/lesson/(?P<id>)' );
        this.wp.assets = this.wp.registerRoute( 'wp/v2', '/lesson-asset/(?P<id>)' );
        this.wp.courses = this.wp.registerRoute( 'breathecode/v1', '/courses', {
            mixins: {
                user: function( val ) {
                    console.log(this);
                    return this.param( 'user', val );
                }
            }
        });
    }
    
    loadCourses(){
        this.wp.courses().user(3).then((data) => {
            this.dispatch('WPStore.setCourses', data)
        }).catch(function( err ) {
            // handle error 
            console.log("ERROR!!",err);
        });;
    }
    loadAssets(){
        this.wp.assets().then((data) => {
            this.dispatch('WPStore.setAssets', data)
        }).catch(function( err ) {
            // handle error 
            console.log("ERROR!!",err);
        });;
    }
    
    startDay(day){
        const todos = BCStore.getDayTodos(day);
        const student = StudentStore.getUser();
        return BC.todo().add(student.bc_id,todos)
                .then((data) => {
                    this.dispatch('StudentStore.appendTodos', data.data || data);
                })
                .catch(()=>{
                    NotifyActions.error('There was an error creating the day todo\'s');
                });
    }
    
    addUnsyncedTodos(unsyncedTodos){
        const student = StudentStore.getUser();
        return BC.todo().add(student.bc_id,unsyncedTodos)
                .then((data) => {
                    Notify.success('The day was updated successfully, you can review your new todo\'s');
                    this.dispatch('StudentStore.appendTodos', data.data || data);
                })
                .catch(()=>{
                    NotifyActions.error('There was an error updating the day todo\'s');
                });
    }
    
    updateTask(task){
        return BC.todo().update(task)
            .then((data) => {
                Notify.success('The task has been updated successfully');
                this.dispatch('StudentStore.updateSingleTodo', data.data || data);
            })
            .catch((error) => {
                Notify.error('There was an error delivering the task');
            });
    }
    
    deliverAssignment(task){
        Notify.info(DeliverAssignment, (githubURL) => {
            if(githubURL){
                task.github_url = githubURL;
                task.status = 'done';
                Notify.info("Are you sure you want to submit?", (answer) => {
                    Notify.clean();
                    if(answer){
                        return BC.todo().update(task)
                            .then((data) => {
                                Notify.success('Your assignment has been delivered successfully');
                                this.dispatch('StudentStore.updateSingleTodo', data.data || data);
                            })
                            .catch((error) => {
                                Notify.error('There was an error delivering your assignment');
                            });
                    }
                });
            }else{
                Notify.clean();
            } 
        }, false);
    }
    
    fetch(){
        return {
            todos: (studentId) =>{
                BC.todo().getByStudent(studentId)
                .then((data) => {
                    if(typeof data.code === 'undefined' || data.code==200)
                        this.dispatch('StudentStore.setTodos', data.data || data);
                    else console.error(data);
                })
                .catch((data) => {
                    if(typeof data.pending === 'undefined') console.error(data); 
                    else console.warn(data.msg)
                });
            }
        };
    }
    
}
export default new StudentActions();