/* global localStorage */
import Flux from '@4geeksacademy/react-flux-dash';
import userReducers from '../reducers/UserReducers';
import {Session} from '../utils/react-components/src/index';

class StudentStore extends Flux.Store{
    constructor(){
        super();
        
        this.sessionSubscription = Session.subscribe("session", this.sessionChange.bind(this));
        this.state.todos = null;
    }
    
    sessionChange(session){
        this.state.session = session;
    }
    
    getUser(){
        const session = Session.getSession();
        return session.user;
    }
    
    getCurrentCohort(){
        const session = Session.getSession();
        return session.currentCohort;
    }
    
    _setTodos(todos){
        this.setStoreState({ todos }).emit('todos');
    }
    getTodos(){
        return this.state.todos;
    }
    
    _updateSingleTodo(task){
        for(let i = 0; i<this.state.todos.length;i++)
            if(this.state.todos[i].id === task.id){
                this.state.todos[i].status = task.status;
                this.emit('todos');
                return this.state.todos[i];
            }
        
        throw new Error(`Task ${task.id} not found`);
        
        return false;
    }
    _appendTodos(newTodos){
        this.setStoreState({ 
            todos: this.state.todos.concat(newTodos) 
        }).emit('todos');
    }
    getSingleTodo(actionable){
        
        if(!this.state.todos) return false;
        
        let present = this.state.todos.find((item) => {
            return (item.type === actionable.type && item.associated_slug === actionable.associated_slug);
        });
        if(typeof present === 'undefined') return false;
        else return present;
    }
    
}
export default new StudentStore();