import Flux from '@4geeksacademy/react-flux-dash';
import BC from '../utils/api.js';
import { Session } from 'bc-react-session';
import { Notify } from 'bc-react-notifier';

export const loadCourses = () => {
    BC.courses().user(3).then((data) => {
        Flux.dispatchEvent('courses', data);
    }).catch(function( err ) {
        // handle error
        console.log("ERROR!!",err);
    });
};
export const loadLessons = () => {
    BC.lessons().all().then((data) => {
        Flux.dispatchEvent('lessons', data);
    }).catch(function( err ) {
        // handle error
        console.log("ERROR!!",err);
    });
};
export const loadAssets = () => {
    wpEndpoint.assets().then((data) => {
        Flux.dispatchEvent('assets', data);
    }).catch(function( err ) {
        // handle error
        console.log("ERROR!!",err);
    });
};
export const saveProfile = (id, args) => {
    BC.student().update('me', args).then(() => {
        Session.setPayload(args);
    }).catch(function( err ) {
        console.log("ERROR!!",err);
    });
};
export const lessonOpened = (slug) => {
    const session = Session.get();
    BC.activity().addStudentActivity(session.payload.bc_id, { user_agent: 'bc/student', slug: 'lesson_opened', data: slug }).then(() => {
        //nothing to do
    }).catch(function( err ) {
        console.log("ERROR!!",err);
    });
};
export const loadMessages = (filters) => {
    const session = Session.getPayload();
    BC.message().templates()
        .then((data) => {
            Flux.dispatchEvent('message-templates', data);
            BC.message().getByStudent(session.bc_id)
                .then((data) => Flux.dispatchEvent('messages', data))
                .catch((data) => {
                    if(typeof data.pending === 'undefined') console.error(data);
                    else console.warn(data.msg);
                });
        })
        .catch((data) => {
            if(typeof data.pending === 'undefined') console.error(data);
            else console.warn(data.msg);
        });
};
export const markMessageAs = (message, status) => {
    if(status === 'later') Flux.dispatchEvent('messages', store.replace('messages', message.key, Object.assign(message, { answered: true, read: true })));
    else BC.message().markAs(message.key, status)
        .then((data) => {
            Flux.dispatchEvent('messages', store.replace('messages', message.key, data));
        })
        .catch((data) => {
            Notify.error(data.msg);
            if(typeof data.pending === 'undefined') console.error(data);
            else console.warn(data.msg);
        });
};

export const getStreaming = (cohortSlug) => BC.streaming().getCohort(cohortSlug);

class Store extends Flux.DashStore{
    constructor(){
        super();
        this.addEvent('lessons');
        this.addEvent('assets');
        this.addEvent('message-templates');
        this.addEvent('messages', (messages) => {
            if(!Array.isArray(messages)) return [];

            const templates = this.getState('message-templates');
            return messages.map(m => {
               m.template = templates[m.slug].template;
               return m;
            });
        });
    }
    get(type, id){
        const entities = this.getState(type);
        if(entities) return entities.find(ent => ent.id == parseInt(id, 10) || ent.key == id);
        else return null;
    }
    add(type, item){
        const entities = this.getState(type);
        if(item) return entities.concat([item]);
        //else return entities;
        else throw new Error('Trying to add a null item into '+type);
    }
    replace(type, id, item){
        const entities = this.getState(type);
        if(!entities) throw new Error("No item found in "+type);

        if(Array.isArray(entities)){
            return entities.concat([]).map(ent => {
                if(ent.id == id ||ent.key == id) return item;
                return ent;
            });
        }
        else return item;
    }
    replaceMerged(type, id, item){
        const entities = this.getState(type);
        if(!entities) throw new Error("No item found in "+type);
        if(Array.isArray(entities)){
            return entities.concat([]).map(ent => {
                if(ent.id == id ||ent.key == id) return Object.assign(ent, item);
                return ent;
            });
        }
        else{
            return Object.assign(entities, item);
        }
    }
    remove(type, id){
        const entities = this.getState(type);
        if(entities) return entities.filter(ent => {
            return (ent.id != parseInt(id, 10) && ent.key != id);
        });
        else throw new Error("No items found in "+entities);
    }
    filter(type, callback){
        const entities = this.getState(type);
        if(entities) return entities.filter(callback);
        else throw new Error("No items found in "+entities);
    }
}

export const store = new Store();