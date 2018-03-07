import Flux from 'react-flux-dash';

class SessionActions extends Flux.Action{
    
    loginUser(history){
        
        this.dispatch('UserStore.setAutentication', true);
        history.push('/code');
    }
    
}
var actionsInstance = new SessionActions();
export default actionsInstance;