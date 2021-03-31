import Flux from '@4geeksacademy/react-flux-dash';
import WP from 'wordpress-rest-api';
import BC from '../utils/api.js';

import DeliverAssignment from '../components/DeliverAssignment';
import OldStore from '../stores/OldStore';
import { Notify } from 'bc-react-notifier';
import { Session } from 'bc-react-session';

class OldActions extends Flux.Action{

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
            this.dispatch('WPStore.setCourses', data);
        }).catch(function( err ) {
            // handle error
            console.log("ERROR!!",err);
        });
    }
    loadAssets(){
        this.wp.assets().then((data) => {
            this.dispatch('WPStore.setAssets', data);
        }).catch(function( err ) {
            // handle error
            console.log("ERROR!!",err);
        });
    }

    startDay(day){
        const todos = OldStore.getDayTodos(day);
        const session = Session.get();
        return BC.todo().add(session.payload.bc_id,todos)
                .then((data) => {
                    this.dispatch('OldStore.appendTodos', data.data || data);
                })
                .catch(()=>{
                    Notify.error('There was an error creating the day todo\'s');
                });
    }

    addUnsyncedTodos(unsyncedTodos){
        const session = Session.get();
        return BC.todo().add(session.payload.bc_id,unsyncedTodos)
                .then((data) => {
                    Notify.success('The day was updated successfully, you can review your new todo\'s');
                    this.dispatch('OldStore.appendTodos', data.data || data);
                })
                .catch(()=>{
                    Notify.error('There was an error updating the day todo\'s');
                });
    }

    updateTask(task){
        const session = Session.get();
        return BC.todo().update(session.payload.bc_id, task)
            .then((data) => {
                Notify.success('The task has been updated successfully');
                this.dispatch('OldStore.updateSingleTodo', data.data || data);
            })
            .catch((error) => {
                Notify.error('There was an error delivering the task');
            });
    }

    createTask(task){

        return BC.todo().add(task)
            .then((data) => {
                Notify.success('The task has added updated successfully');
                this.dispatch('OldStore.appendTodos', [data.data || data]);
            })
            .catch((error) => {
                Notify.error('There was an error adding the task');
            });
    }

    deliverAssignment(task){
        const session = Session.get();
        Notify.info(DeliverAssignment, (githubURL) => {
            if(githubURL){
                task.github_url = githubURL;
                task.task_status = 'DONE';
                task.revision_status = 'PENDING';
                Notify.info("Are you sure you want to submit?", (answer) => {
                    Notify.clean();
                    if(answer){
                        return BC.todo().update(session.payload.bc_id, task)
                            .then((data) => {
                                Notify.success('Your assignment has been delivered successfully');
                                this.dispatch('OldStore.updateSingleTodo', data.data || data);
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

    updateAssignment(task, updatedFields, confirm=true){
        const session = Session.get();
        if(confirm) Notify.info("Are you sure you want to remove your project submission?", (answer) => {
                Notify.clean();
                if(answer){
                    const _task = Object.assign(task, updatedFields);
                    return BC.todo().update(session.payload.bc_id, _task)
                        .then((data) => {
                            Notify.success('Your assignment has been updated successfully');
                            this.dispatch('OldStore.updateSingleTodo', data.data || data);
                        })
                        .catch((error) => {
                            Notify.error('There was an error updated your assignment');
                        });
                }
            });
        else{
            const _task = Object.assign(task, updatedFields);
            return BC.todo().update(session.paylod.bc_id, _task)
                .then((data) => {
                    Notify.success('Your assignment has been updated successfully');
                    this.dispatch('OldStore.updateSingleTodo', data.data || data);
                })
                .catch((error) => {
                    Notify.error('There was an error updated your assignment');
                });
        }
    }

    deleteAssignment(task){
        BC.todo().delete(task)
            .then((data) => {
                Notify.success('Your assignment has been delete successfully');
                this.dispatch('OldStore.deleteSingleTodo', data.data || data);
            })
            .catch((error) => {
                Notify.error('There was an error deleting your assignment');
            });
    }

    fetch(){
        return {
            todos: (studentId) =>{
                BC.todo().getByStudent(studentId)
                .then((data) => {
                    if(typeof data.code === 'undefined' || data.code==200)
                        this.dispatch('OldStore.setTodos', data.data || data);
                    else console.error(data);
                })
                .catch((data) => {
                    if(typeof data.pending === 'undefined') console.error(data);
                    else console.warn(data.msg);
                });
            },
            syllabus: (slug) =>{
                const [ _slug, version ] = slug.split('.');
                BC.syllabus().get(_slug, version.replace(/[a-z]/ig,''))
                    .then((data) => {
                        this.dispatch('OldStore.setSyllabus', typeof(data.json) === "string" ? JSON.parse(data.json) : data.json);
                    })
                    .catch((data) => {
                        if(typeof data.pending === 'undefined') console.error(data);
                        else console.warn(data.msg);
                    });
            },
            projects: (syllabus_slug) =>{
                BC.project().all(syllabus_slug)
                .then((data) => {
                    this.dispatch('OldStore.setProjects', data);
                })
                .catch((data) => {
                    if(typeof data.pending === 'undefined') console.error(data);
                    else console.warn(data.msg);
                });
            }
        };
    }

}
export default new OldActions();