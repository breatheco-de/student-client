import Flux from '@4geeksacademy/react-flux-dash';

class _WPStore extends Flux.Store{
    constructor(){
        super();
        this.state = {
            courses: [],
            assets: []
        }
    }
    
    _setCourses(data){ 
        this.setStoreState({ 
            courses: data 
        }).emit();
    }
    getCourses(){ return this.state.courses; }
    
    _setAssets(data){ this.setStoreState({ assets: data }).emit(); }
    getAssets(){ return this.state.assets; }
    
}

var WPStore = new _WPStore();
export default WPStore;