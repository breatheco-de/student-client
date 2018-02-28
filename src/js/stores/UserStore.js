import {FluxStore} from '../libraries/react-flux-dash/index';

class UserStore extends FluxStore{
    constructor(){
        super();
        this.state = {
            autenticated: false
        }
    }
    
    handleActions(actionType){
        switch (actionType) {
            case 'LOGGED_IN':
                this.setStoreState({ autenticated: true });
            break;
        }
    }
}

var userStore = new UserStore();
export default userStore;