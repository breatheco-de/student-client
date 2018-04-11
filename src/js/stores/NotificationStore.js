import Flux from '@4geeksacademy/react-flux-dash';

class NotificationStore extends Flux.Store{
    constructor(){
        super();
        this.state = {
            notifications: [],
            templates: {
                update_todos_error: { msg: "There has been an error adding your new todos", type: "error" }
            }
        };
    }
    
    getNotification(slug){
        if(typeof this.state.templates[slug] === 'undefined') throw new Error(`Invalid error template slug: ${slug}`);
        
        return { slug: slug, msg: this.state.templates[slug].msg, type: this.state.templates[slug].type };
    }
    
    _notify(slug){
        this.setStoreState({ 
            notifications: this.state.notifications.concat(this.getNotification(slug))
        }).emit('notifications');
        
        setTimeout(() => {
            this.setStoreState({ 
                notifications: this.state.notifications.filter((noti) => noti.slug !== slug)
            }).emit('notifications');
        },4000);
    }
    
    getAllNotifications(){
        return this.state.notifications;
    }
}

export default new NotificationStore();