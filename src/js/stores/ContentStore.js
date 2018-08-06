import Flux from '@4geeksacademy/react-flux-dash';

class ContentStore extends Flux.DashStore{
    constructor(){
        super();
        this.addEvent('lessons');
        this.addEvent('assets');
    }
}

export default new ContentStore();