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
                   console.error(data); 
                });
            }
        }
    }
    
}
export default new BCActions();