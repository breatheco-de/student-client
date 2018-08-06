import Flux from '@4geeksacademy/react-flux-dash';
import BC from '../utils/api.js';

class BCActions extends Flux.Action{
    
    constructor(){
        super();
    }
    
    fetch(){
        return {
            syllabus: (slug) =>{
                BC.syllabus().get(slug)
                .then((data) => {
                    this.dispatch('BCStore.setSyllabus', data);
                })
                .catch((data) => {
                    if(typeof data.pending === 'undefined') console.error(data); 
                    else console.warn(data.msg)
                });
            },
            projects: (syllabus_slug) =>{
                BC.project().all(syllabus_slug)
                .then((data) => {
                    this.dispatch('BCStore.setProjects', data);
                })
                .catch((data) => {
                    if(typeof data.pending === 'undefined') console.error(data); 
                    else console.warn(data.msg)
                });
            }
        }
    }
    
}
export default new BCActions();