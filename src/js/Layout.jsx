import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import CodingView from './views/CodingView.jsx';
import LoginView from './views/LoginView.jsx';
import AssignmentsView from './views/AssignmentsView.jsx';

import {FluxComponent} from './libraries/react-flux-dash/index';
import UserStore from './stores/UserStore';

export class Layout extends FluxComponent{
    
    constructor(){
        super();
        this.state = {
            navbarOpened: false
        }
        
        this.bindStore(UserStore);
    }
    
    handleStoreChanges(){
        this.setState({
            autenticated: UserStore.isAutenticated()
        });
    }
    
    render(){
        return (
            <div>
                <button id="menu" className={(this.state.navbarOpened) ? 'on':''} onClick={() => this.setState({ navbarOpened: !this.state.navbarOpened })}>
                    <span id="line"></span><span id="arrow"></span>
                </button>
                <aside id="navbar" className={(this.state.navbarOpened) ? 'on':''}>
                    <h2>Some Menu here</h2>
                </aside>
                <section className={(this.state.navbarOpened) ? 'on':''} onClick={() => this.setState({ navbarOpened: false })}>
                    <BrowserRouter>
                        <div>
                            <Switch>
                                <Route exact path='/code' component={CodingView} />
                                <Route exact path='/login' component={LoginView} />
                                <Route exact path='/assignments' component={AssignmentsView} />
                                <Route render={() => (<p className="text-center mt-5">Not found</p>)} />
                            </Switch>
                        </div>
                    </BrowserRouter>
                </section>
            </div>
        );
    }
}