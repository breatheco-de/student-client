import Flux from '@4geeksacademy/react-flux-dash';
import WP from 'wordpress-rest-api';
import BC from '../utils/BreatheCodeWrapper';

import StudentStore from '../stores/StudentStore';
import BCStore from '../stores/BCStore';
import NotificationStore from '../stores/NotificationStore';

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
    
    loginUser(username, password, history){
     
        return BC.credentials().autenticate(username, password)
        .then((data) => {
            data.history = history;
            this.dispatch('StudentStore.login', data);
        });
    }
    
    logoutUser(history){
        this.dispatch('StudentStore.logout');
    }
    
    remindUser(email){
     
        return BC.credentials().remind(email)
        .then((data) => {
            return data;
        });
    }
    
    startDay(day){
        const todos = BCStore.getDayTodos(day);
        const student = StudentStore.getStudent();
        return BC.todos().add(student.bc_id,todos)
                .then((data) => {
                    this.dispatch('StudentStore.appendTodos', data.data || data);
                })
                .catch(()=>{
                    this.dispatch('NotificationStore.notify', 'update_todos_error');
                });
    }
    
    updateTask(task){
        const student = StudentStore.getStudent();
        return BC.todos().update(task)
                .then((data) => {
                    this.dispatch('StudentStore.updateSingleTodo', data.data || data);
                });
    }
    
    fetch(){
        return {
            todos: (studentId) =>{
                BC.todos().getByStudent(studentId)
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