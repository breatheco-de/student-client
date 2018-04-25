/* global localStorage */
import Flux from '@4geeksacademy/react-flux-dash';
import userReducers from '../reducers/UserReducers';

class StudentStore extends Flux.Store{
    constructor(){
        super();
        
        this.state = this.getPersistedState();
        if (!this.state){
            this.state = {
                breathecodeToken: null,
                githubToken: null,
                history: null,
                user: null,
                currentCohort: null,
                autenticated: false,
            };
        }
        this.state.todos = null;
    }
    __reduce(entity){
        return {
            with: (reducers) => {
                for(let key in reducers) entity = reducers[key](entity);
                return entity;
            }
        };
    }
    
    _reduceUser(){ 
        if(this.state.user) this._setUser(this.state.user);
    }
    
    setPersistedState(data){
        localStorage.setItem('state:StudentStore', JSON.stringify(Object.assign(this.state, data)));
        return this.setStoreState(data);
    }
    getPersistedState(data){
        let persistedState = JSON.parse(localStorage.getItem('state:StudentStore'));
        return persistedState;
    }
    
    _login(data){
        this.setPersistedState({
            githubToken: null,
            autenticated: true,
            history: data.history,
            todos: null,
            breathecodeToken: data.access_token,
            currentCohort: (data.cohorts.length === 1) ? data.cohorts[0] : data.cohorts,
            user: {
                bc_id: data.id,
                cohorts: data.cohorts,
                financial_status: data.financial_status,
                bio: data.bio,
                github: data.github,
                phone: data.phone,
                currently_active: data.currently_active,
                total_points: data.total_points,
                wp_id: data.wp_id,
                created_at: data.created_at,
                email: data.username,
                avatar: data.avatar_url,
                full_name: data.full_name,
                type: data.type || 'student'
            }
        }).emit('session');
    }
    _logout(data){
        this.setPersistedState({ 
            autenticated: false,
            breathecodeToken: null,
            user: null
        }).emit('session');
    }
    
    _setUser(user){
        this.setPersistedState({
            user: this.__reduce(user).with(userReducers)
        }).emit('user');
    }
    getUser(){
        return this.state.user;
    }
    
    getCurrentCohort(){
        return this.state.currentCohort;
    }
    _setCurrentCohort(cohort){
        this.setPersistedState({
            currentCohort: cohort
        }).emit('current_cohort');
    }
    
    
    getAutentication(){
        return {
            autenticated: this.state.autenticated,
            history: this.state.history
        };
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

var userStore = new StudentStore();
export default userStore;