import React from 'react';
import SplitPane from 'react-split-pane';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import {PrivateRoute} from './libraries/react-router-dash/index';
import Sidebar from './components/Sidebar.jsx';

import CodingView from './views/CodingView.jsx';
import LoginView from './views/LoginView.jsx';
import AssignmentsView from './views/AssignmentsView.jsx';
import ProjectsView from './views/ProjectsView.jsx';
import LessonView from './views/LessonView.jsx';
import SyllabusView from './views/SyllabusView.jsx';
import WelcomeView from './views/WelcomeView.jsx';
import CourseView from './views/CourseView.jsx';
import AssetsView from './views/AssetsView.jsx';
import DayView from './views/DayView.jsx';
import HomeView from './views/HomeView.jsx';
import SearchView from './views/SearchView.jsx';

import Flux from '@4geeksacademy/react-flux-dash';
import UserStore from './stores/UserStore.js';
import BCStore from './stores/BCStore.js';
import MenuModes from './utils/MenuModes';
//import WPActions from './actions/WPActions.js';
//import BCActions from './actions/BCActions.js';

//import keymap from '../keymap';
//import withShortcuts from './components/Shortcuts';

//create your first component
class Layout extends Flux.View{
    
    constructor() {
        super();
        this.state = {
            size: 200,
            dragging: false,
            duration: 0,
            menuMode: 'default',
            autenticated: UserStore.getAutentication()
        };
        this.fixedWidth = false;
        this.handleDragStart = this.handleDragStart.bind(this);
        this.handleDragEnd = this.handleDragEnd.bind(this);
        this.handleDrag = this.handleDrag.bind(this);
        
        this.bindStore(UserStore, this.handleStoreChanges.bind(this));
    }
    
    onSidebarToggle(state){
        if(state.collapsed){
            this.fixedWidth = 50;
            this.setState({ size: 50 });
        }
        else{
            this.fixedWidth = null;
            this.setState({ size: 200 });
        }
    }
    
    handleKeyShorcut(){
        console.log('on the child!');
    }

    handleDragStart() {
        if(!this.fixedWidth) this.setState({ dragging: true });
        else this.setState({ size: this.fixedWidth });
    }

    handleDragEnd() {
        if(!this.fixedWidth){
            this.setState({ dragging: false });
            setTimeout(() => {
                this.setState({ size: undefined });
            }, 0);
        }
        else this.setState({ size: this.fixedWidth });
    }

    handleDrag(width) {
        if(!this.fixedWidth)
        {
            if (width > 400) this.setState({ size: 400 });
            else if (width < 100) this.setState({ size: 100 });
            else this.setState({ size: undefined });
        }
        else this.setState({ size: this.fixedWidth });
    }
    
    handleStoreChanges(){
        var isAutenticated = UserStore.getAutentication();
        if(isAutenticated){
            //WPActions.loadCourses();
            //WPActions.loadAssets();
            //BCActions.loadSyllabus();
        }
        this.setState({
            autenticated: isAutenticated
        });
    }
    
    onNavBarSelect(option){
        if(typeof(option.size) !== 'undefined') this.setState({ size: option.size });
    }
    
    render() {
        return (
            <div className="layout">
                <BrowserRouter>
                    <SplitPane split="vertical"
                        className="white-resizer"
                        minSize={50}
                        size={this.state.dragging ? undefined : this.state.size}
                        onChange={this.handleDrag}
                        onDragStarted={this.handleDragStart}
                        onDragFinished={this.handleDragEnd}>
                        <div style={{ height: "100%", padding: '10px 0px 10px 10px' }}>
                                <Sidebar 
                                    onSelect={this.onNavBarSelect.bind(this)} 
                                    onToggle={this.onSidebarToggle.bind(this)} 
                                    menuItems={MenuModes[this.state.menuMode]}
                                />
                        </div>
                        <div className="app-view" style={{marginLeft: "-5px"}}>
                            <Switch onChange={this.historyChange}>
                                <Route exact path='/' render={()=>(<p className="text-center mt-5">Hello Human</p>)} />
                                <Route exact path='/course/:course_slug'  component={CourseView} />
                                <Route exact path='/home' component={HomeView} />
                                <Route exact path='/lesson/:slug' component={LessonView} />
                                
                                <Route exact path='/search' component={SearchView} />
                                <Route exact path='/syllabus/:slug' loggedIn={this.state.autenticated} component={SyllabusView} />
                                <PrivateRoute exact path='/welcome' loggedIn={this.state.autenticated} component={WelcomeView} />
                                <PrivateRoute exact path='/challenge/:slug' loggedIn={this.state.autenticated} component={CodingView} />
                                <PrivateRoute exact path='/code' loggedIn={this.state.autenticated} component={CodingView} />
                                <PrivateRoute exact path='/assignments' loggedIn={this.state.autenticated} component={AssignmentsView} />
                                <PrivateRoute exact path='/projects' loggedIn={this.state.autenticated} component={ProjectsView} />
                                <PrivateRoute exact path='/assets' loggedIn={this.state.autenticated} component={AssetsView} />
                                <Route render={() => (<p className="text-center mt-5">Not found</p>)} />
                            </Switch>
                        </div>
                    </SplitPane>
                </BrowserRouter>
            </div>
        );
    }
    
}
export default Layout;
//export default withShortcuts(Layout, keymap)