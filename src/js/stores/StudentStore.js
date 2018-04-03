/* global localStorage */
import Flux from '@4geeksacademy/react-flux-dash';

class StudentStore extends Flux.Store{
    constructor(){
        super();
        
        this.state = this.getPersistedState();
        if (!this.state)
        {
            this.state = {
                breathecodeToken: null,
                githubToken: null,
                history: null,
                user: null,
                autenticated: false,
            }
        }
        this.state.todos = null;
    }
    
    setPersistedState(data){
        localStorage.setItem('state:'+this.constructor.name, JSON.stringify(Object.assign(this.state, data)));
        return this.setStoreState(data);
    }
    getPersistedState(data){
        let persistedState = JSON.parse(localStorage.getItem('state:'+this.constructor.name));
        return persistedState;
    }
    
    _login(data){
        this.setPersistedState({ 
            autenticated: true,
            history: data.history,
            breathecodeToken: data.access_token,
            user: {
                bc_id: data.id,
                wp_id: data.wp_id,
                created_at: data.created_at,
                email: data.username,
                avatar: data.avatar_url,
                full_name: data.full_name
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
    getSingleTodo(todo){
        
        if(!this.state.todos) return false;
        
        let present = this.state.todos.find((item) => {
            return (item.type === todo.type && item.associated_slug === todo.slug);
        });
        if(typeof present === 'undefined') return false;
        else return present;
    }
    dayWithTodosReducer(day){
        if(day.lessons && day.lessons.length>0){
            day.lessons = day.lessons.map((todo) => {
               let studentTodo = this.getSingleTodo(todo);
                if(studentTodo) todo.status = studentTodo.status;
                todo.type = "lesson";
                todo.label = todo.title;
                return todo;
            });
        }
        if(day.replits && day.replits.length>0){
            day.replits = day.replits.map((todo) => {
               let studentTodo = this.getSingleTodo(todo);
                if(studentTodo) todo.status = studentTodo.status;
                todo.type = "replit";
                todo.label = todo.title;
                return todo;
            });
            
        }
        if(day.quizzes && day.quizzes.length>0){
            day.quizzes = day.quizzes.map((todo) => {
               let studentTodo = this.getSingleTodo(todo);
                if(studentTodo) todo.status = studentTodo.status;
                todo.type = "quiz";
                todo.label = todo.title;
                return todo;
            });
            
        }
        return day;
    }
    
    getStudent(){
        return this.state.user;
    }
    
    hasOpenedDay(day){
        if(day.lessons && day.lessons.length>0)
            return this.getSingleTodo(day.lessons[0]);
        else if(day.replits && day.replits.length>0)
            return this.getSingleTodo(day.replits[0]);
        else if(day.quizzes && day.quizzes.length>0)
            return this.getSingleTodo(day.quizzes[0]);
        else return true;
    }
    
}

var userStore = new StudentStore();
export default userStore;