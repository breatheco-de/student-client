import Flux from '@4geeksacademy/react-flux-dash';
import {Session} from 'bc-react-session';
import BC from '../utils/api.js';
import { setLoading } from '../components/react-components/src/load-bar/LoadBar.jsx';

BC.setOptions({
    getToken: (type='api')=> {
        const session = Session.get();
        
        if(type == 'assets'){
            const token = (typeof session.payload != 'undefined') ? session.payload.assets_token : '';
            return 'JWT '+token;
        } 
        else if(type == 'api'){
            const token = (typeof session.payload != 'undefined') ? session.payload.access_token : '';
            return 'Bearer '+token;
        } 
    },
    onLoading: setLoading,
    onLogout: () => logout()
});

export const login = (username, password, history) =>{
    return BC.credentials().autenticate(username, password)
    .then((data) => {
        
        const user = {
            bc_id: data.id,
            wp_id: data.wp_id,
            access_token: data.access_token,
            assets_token: data.assets_token,
            bio: data.bio,
            cohorts: data.cohorts,
            currently_active: data.currently_active,
            total_points: data.total_points,
            financial_status: data.financial_status,
            avatar: data.avatar_url,
            phone: data.phone,
            show_tutorial: (typeof data.show_tutorial != 'undefined' && (data.show_tutorial == '0' || data.show_tutorial == 'false')) ? false : true,
            github: data.github,
            email: data.email || data.username,
            first_name: data.first_name || null,
            last_name: data.last_name || null,
            created_at: data.created_at,
            full_name: (data.first_name && data.last_name) ? data.first_name+' '+data.first_name : data.full_name,
            type: data.type || 'student',
            currentCohort: (!Array.isArray(data.cohorts)) ? null : (data.cohorts.length === 1) ? data.cohorts[0] : data.cohorts
        };
        Session.start({ payload: user, expiration: (3600*24) });
        
        if( data.type != 'student') history.push('/');
        else if(!data.github || typeof data.github == 'undefined' || data.github == '') history.push('/profile');
        else history.push('/');
    });
};
    
export const logout = (history=null) => {
    Session.destroy();
    if(history) history.push('/login');
    else window.location.href= "/login";
};
    
export const remind = (email) =>{
    return BC.credentials().remind(email)
    .then((data) => {
        return data;
    });
};