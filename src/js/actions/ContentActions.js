import Flux from '@4geeksacademy/react-flux-dash';
import BC from '../utils/api.js';

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