import React from 'react';
import Flux from '@4geeksacademy/react-flux-dash';
import { Session } from 'bc-react-session';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import {Notifier} from 'bc-react-notifier';
import { LoadBar } from './components/react-components/src/index';
import { LoginView, ForgotView } from './views/auth';
import CourseView from './views/CourseView';
import HomeView from './views/HomeView';
import ProfileView from './views/ProfileView';
import ChooseView from './views/ChooseView';
import LiveView from './views/LiveView';
class Layout extends Flux.View{
    
    constructor(){
        super();
        this.state = {
            errors: null
        };
    }
    
    render() {
        return (
            <div className="layout">
                <BrowserRouter>
                    <div>
                        <LoadBar />
                        <Notifier />
                        <Switch>
                            <Route exact path='/login' component={LoginView} />
                            <Route exact path='/forgot' component={ForgotView} />
                            <PrivateRoute exact path='/' component={HomeView} />
                            <PrivateRoute exact path='/home' component={HomeView} />
                            <PrivateRoute exact path='/choose' component={ChooseView} />
                            <PrivateRoute exact path='/profile' component={ProfileView} />
                            <PrivateRoute path='/course/:course_slug' component={CourseView} />
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

const PrivateRoute = function(props){
    const Component = props.component;
    var rest = Object.assign({}, props);
    delete rest.component;
    let session = Session.getSession();
    console.log("session info", session)
    return(
        <Route
          {...rest}
          render={(props) => (session.active)
            ? <Component {...rest} {...props} />
            : <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
        />
    );
};