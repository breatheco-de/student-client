import React from 'react';
import Flux from '@4geeksacademy/react-flux-dash';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import {PrivateRoute} from './libraries/react-router-dash/index';

import CourseView from './views/CourseView';
import HomeView from './views/HomeView';
import LoginView from './views/LoginView';
import ProfileView from './views/ProfileView';
import StudentStore from './stores/StudentStore';

class Layout extends Flux.View{
    
    constructor(){
        super();
        this.state = {
            loggedIn: StudentStore.getAutentication(),
            history: null,
            redirection: null
        }
        this.bindStore(StudentStore, 'session', this.sessionChange.bind(this));
    }
    
    componentWillMount(){
        this.sessionChange();
    }
    
    sessionChange(){
        const session = StudentStore.getAutentication();
        const needsRedirection = (session.history && typeof session.history.push !== 'undefined' && (session.autenticated && !this.state.loggedIn));
        this.setState({ 
            loggedIn: session.autenticated, 
            redirection: needsRedirection,
            history: session.history
        });
    }
    
    redirect(path){
        this.setState({ history: null });
        this.state.history.push(path);
    }
    
    render() {
        if(this.state.redirection && this.state.history) this.redirect('/home');

        return (
            <div className="layout">
                <BrowserRouter>
                    <div>
                        <Switch>
                            <Route exact path='/login' component={LoginView} />
                            <PrivateRoute exact path='/' loggedIn={this.state.loggedIn} component={HomeView} />
                            <PrivateRoute exact path='/home' loggedIn={this.state.loggedIn} component={HomeView} />
                            <PrivateRoute exact path='/profile' loggedIn={this.state.loggedIn} component={ProfileView} />
                            <PrivateRoute path='/course/:course_slug' loggedIn={this.state.loggedIn} component={CourseView} />
                            <PrivateRoute render={() => (<p className="text-center mt-5">Not found</p>)} />
                        </Switch>
                    </div>
                </BrowserRouter>
            </div>
        );
    }
    
}
export default Layout;
//export default withShortcuts(Layout, keymap)