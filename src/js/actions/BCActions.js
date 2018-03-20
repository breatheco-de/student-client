import Flux from 'react-flux-dash';
import BCAssets from '../utils/BCAssets';
import BCStore from '../stores/BCStore';
class BCActions extends Flux.Action{
    
    constructor(){
        super();
    }
    
    loadSyllabus(){
        BCAssets.get('/syllabus/web-dev').then((data) => {
            this.dispatch('BCStore.setSyllabus', data)
        }).catch(function( err ) {
            // handle error 
            console.log("ERROR!!",err);
        });;
    }
    
}
export default new BCActions();