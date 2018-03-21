import Flux from 'react-flux-dash';

class UserStore extends Flux.Store{
    constructor(){
        super();
        this.state = {
            autenticated: false,
            todos: [
                { type: 'lesson', label: 'How does the internet works', done: false },
                { type: 'lesson', label: 'How does the internet works', done: false },
                { type: 'lesson', label: 'How does the internet works', done: false },
            ]
        }
    }
    
    _setAutentication(data){
        this.setStoreState({ autenticated: data }).emit();
    }
    
    getAutentication(){
        return this.state.autenticated;
    }
    
    getTodos(){
        return this.state.todos;
    }
}

var userStore = new UserStore();
export default userStore;