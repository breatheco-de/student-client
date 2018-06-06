import React from 'react';
import Flux from '@4geeksacademy/react-flux-dash';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import {PrivateRoute, Notifier, Notify} from './utils/react-components/index';
import {LoginView, ForgotView, Session} from './utils/react-components/index';
import Raven from 'raven-js';//for error monitoring

import CourseView from './views/CourseView';
import HomeView from './views/HomeView';
import ProfileView from './views/ProfileView';
import ChooseView from './views/ChooseView';

class Layout extends Flux.View{
    
    constructor(){
        super();
        const session = Session.getSession();
        this.state = {
            loggedIn: (session && session.autenticated),
            errors: null
        };
    }
    
    componentDidMount(){
        const session = Session.getSession();
        this.setState({
            loggedIn: (session && session.autenticated)
        });
        this.sessionSubscription = Session.subscribe("session", this.sessionChange.bind(this));
    }
    
    sessionChange(session){
        this.setState({ 
            loggedIn: session.autenticated, 
        });
        if(session.autenticated){
            if(session.user){
                Raven.setUserContext({ email: session.user.email, id: session.user.bc_id });
                Raven.setExtraContext({ cohort: session.user.cohorts });
            }
        } 
    }
    
    render() {
        return (
            <div className="layout">
                <BrowserRouter>
                    <div>
                        <Notifier />
                        <Switch>
                            <Route exact path='/login' component={LoginView} />
                            <Route exact path='/forgot' component={ForgotView} />
                            <PrivateRoute exact path='/' loggedIn={this.state.loggedIn} component={HomeView} />
                            <PrivateRoute exact path='/choose' loggedIn={this.state.loggedIn} component={ChooseView} />
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