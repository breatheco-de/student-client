import Flux from '@4geeksacademy/react-flux-dash';
import BC from '../utils/BreatheCodeWrapper';

class BCActions extends Flux.Action{
    
    constructor(){
        super();
    }
    
    fetch(){
        return {
            syllabus: (slug) =>{
                BC.syllabus().get(slug)
                .then((data) => {
                    console.log(data);
                    this.dispatch('BCStore.setSyllabus', data);
                })
                .catch((data) => {
                    if(typeof data.pending === 'undefined') console.error(data); 
                    else console.warn(data.msg)
                });
            },
            projects: (syllabus_slug) =>{
                BC.projects().all(syllabus_slug)
                .then((data) => {
                    console.log(data);
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