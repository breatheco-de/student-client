import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import {PrivateRoute} from './libraries/react-router-dash/index';

import CodingView from './views/CodingView.jsx';
import LoginView from './views/LoginView.jsx';
import AssignmentsView from './views/AssignmentsView.jsx';
import ProjectsView from './views/ProjectsView.jsx';
import LessonsView from './views/LessonsView.jsx';
import AssetsView from './views/AssetsView.jsx';

import bcIcon from '../img/bc-icon.png';

import MainMenu from './components/MainMenu.jsx';

import Flux from 'react-flux-dash';
import UserStore from './stores/UserStore.js';
import WPActions from './actions/WPActions.js';

export default class Layout extends Flux.View{
    
    constructor(){
        super();
        this.state = {
            navbarOpened: false,
            autenticated: false
        }
        
        //listen to the UserStore changes
        this.bindStore(UserStore, this.handleStoreChanges.bind(this));
    }
    
    handleStoreChanges(){
        
        var isAutenticated = UserStore.getAutentication();
        if(isAutenticated){
            WPActions.loadCourses();
            WPActions.loadAssets();
        }
        this.setState({
            autenticated: isAutenticated
        });
    }
    
    render(){
        return (
            <div>
                <BrowserRouter>
                    <div>
                        <div id="menu">
                            <button className={(this.state.navbarOpened) ? 'on':''} onClick={() => this.setState({ navbarOpened: !this.state.navbarOpened })}>
                                <img className="float-left" src={bcIcon} /> <i className="fas fa-bars"></i>
                            </button>
                        </div>
                        <aside id="navbar" className={(this.state.navbarOpened) ? 'on':''}>
                            <MainMenu onClick={() => this.setState({ navbarOpened: false })} />
                        </aside>
                        <section className={(this.state.navbarOpened) ? 'on':''} onClick={() => this.setState({ navbarOpened: false })}>

                        </section>
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}