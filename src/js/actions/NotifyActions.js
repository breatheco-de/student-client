import Flux from '@4geeksacademy/react-flux-dash';

class NotifyActions extends Flux.Action{
    
    constructor(){
        super();
    }
    
    notify(error_slug){
        this.dispatch('NotificationStore.notify', error_slug);
    }
}
export default new NotifyActions();