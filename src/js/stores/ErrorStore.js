import Flux from '@4geeksacademy/react-flux-dash';

class ErrorStore extends Flux.Store{
    constructor(){
        super();
        this.state = {
            errors: false 
        }
    }
    
    _notifyError(data){
        this.setStoreState({ autenticated: data }).emit();
    }
    
    getErrors(){
        return this.state.autenticated;
    }
}

export default new ErrorStore();