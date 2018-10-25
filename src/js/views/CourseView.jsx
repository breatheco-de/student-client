import React from 'react';
import Flux from '@4geeksacademy/react-flux-dash';
import { Route, Switch } from 'react-router-dom';
import SplitLayout from '../components/SplitLayout';

import { Wizard } from '../components/wizard/Wizard.jsx';

import BCStore from '../stores/BCStore';
import BCActions from '../actions/BCActions';

import CourseIntro from '../views/CourseIntro';
import DayView from '../views/DayView';
import LessonView from '../views/panel/LessonView';
import QuizView from '../views/panel/QuizView';
import ReplitView from '../views/panel/ReplitView';
import AssignmentView from '../views/panel/AssignmentView';
import VTurorialView from '../views/panel/VTurorialView';

import StudentActions from '../actions/StudentActions';
import StudentStore from '../stores/StudentStore';
import {Session} from 'bc-react-session';
import {menuModes, getCurrentPath} from '../utils/menu';

class CourseView extends Flux.View{
    
    constructor() {
        super();
        this.state = {
            courseSlug: null,
            runTutorial: false,
            currentCohort: null,
            currentTutorialStep: 'first',
            menuItems: menuModes.course,
            currentMenuOption: menuModes.course[0],
            context: this.getCurrentContext()
        };
        //this.sessionUpdated();
        this.bindStore(BCStore, 'syllabus', this.syllabusUpdated.bind(this));
    }
    
    componentDidMount(){
      const courseSlug = this.props.match.params.course_slug;
      const syllabus = BCStore.getSyllabus(courseSlug);
      const _session = Session.get();
      if(!_session.payload.currentCohort || Array.isArray(_session.payload.currentCohort)) this.props.history.push('/choose');
      if(!syllabus || syllabus.profile != courseSlug) BCActions.fetch().syllabus(courseSlug);
      
      let state = { 
        courseSlug,
        runTutorial: _session.show_tutorial || true,
        currentCohort: _session.payload.currentCohort
      };
      if(this.state.context.path.day) state.currentOption = menuModes.course[0].items[0];
      this.setState(state);
      
    }
    
    getCurrentContext(){
        const path = getCurrentPath();
        let breadcrumb = [{ label: "BreatheCode", path: '/home' }];
        if(path.course) breadcrumb.push({ label: 'Course', path: `/course/${path.course}` });
        if(path.day) breadcrumb.push({ label: 'Day', path: `/course/${path.course}/${path.day}` });
        if(path.type) breadcrumb.push({ label: path.type, path: `/course/${path.course}/${path.day}/${path.type}/${path.view}` });
    
        return { path, breadcrumb };
    }
    
    syllabusUpdated(){
        this.fetchSecondSyllabusPhase();
        this.setState({ menuItems: menuModes.course });
    }
    
    fetchSecondSyllabusPhase(){
      const todos = StudentStore.getTodos();
      if(!todos){
        const student = Session.get().payload;
        if(student) StudentActions.fetch().todos(student.bc_id);
      } 
      const projects = BCStore.getProjects();
      if(!projects){
        BCActions.fetch().projects();
      } 
    }
    
    onSelect(option){
        if(typeof option.slug != 'undefined' && this.state.menuItems.find((item => item.slug = option.slug))){
          if(option.slug == 'syllabus') option.data = BCStore.getSyllabusDays();
          this.setState({
            currentMenuOption: option
          });
        }
        else if(typeof option.dayNumber != 'undefined'){
          this.props.history.push(this.props.match.url+'/'+option.dayNumber);
        }
    }
    
    render() {
        return (
            <SplitLayout 
              menuItems={this.state.menuItems}
              breadcrumb={this.state.context.breadcrumb}
              selectedOption={this.state.currentMenuOption}
              onNavBarSelect={this.onSelect.bind(this)}
              baseLevel="course"
            >
              <Wizard 
                initialStepGroup="first"
                run={this.state.runTutorial}
              />
                    <div>
                        <Switch>
                            <Route exact path={this.props.match.path+'/r/:replit_slug'} component={ReplitView} />
                            <Route exact path={this.props.match.path+'/q/:quiz_slug'} component={QuizView} />
                            <Route exact path={this.props.match.path+'/a/:assignment_slug'} component={AssignmentView} />
                            <Route exact path={this.props.match.path+'/l/:lesson_slug'} component={LessonView} />
                            <Route exact path={this.props.match.path+'/:day_number'} component={DayView} />
                            <Route exact path={this.props.match.path+'/:day_number/l/:lesson_slug'} component={LessonView} />
                            <Route exact path={this.props.match.path+'/:day_number/q/:quiz_slug'} component={QuizView} />
                            <Route exact path={this.props.match.path+'/:day_number/r/:replit_slug'} component={ReplitView} />
                            <Route exact path={this.props.match.path+'/:day_number/r/:replit_slug/vtutorial/:vtutorial_slug'} component={VTurorialView} />
                            <Route exact path={this.props.match.path+'/:day_number/a/:assignment_slug'} component={AssignmentView} />
                            <Route exact path={this.props.match.path} component={CourseIntro} />
                        </Switch>
                    </div>
            </SplitLayout>
        );
    }
    
}
export default CourseView;
//export default withShortcuts(Layout, keymap)