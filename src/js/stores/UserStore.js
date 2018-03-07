import Flux from 'react-flux-dash';

class UserStore extends Flux.Store{
    constructor(){
        super();
        this.state = {
            autenticated: false 
        }
    }
    
    _setAutentication(data){
        this.setStoreState({ autenticated: data }).emit();
    }
    
    getAutentication(){
        return this.state.autenticated;
    }
}

var userStore = new UserStore();
export default userStore;