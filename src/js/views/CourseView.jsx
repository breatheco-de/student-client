import React from 'react';
import Flux from '@4geeksacademy/react-flux-dash';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import SplitLayout from '../components/SplitLayout';
import CourseMenu from '../components/menus/CourseMenu';
import TimeMenu from '../components/menus/TimeLineMenu';
import TodoMenu from '../components/menus/TodoMenu';
//import Modal from '../components/Modal';

import BCStore from '../stores/BCStore';
import BCActions from '../actions/BCActions';

import { NotifyActions } from 'react-router-dom';

import CourseIntro from '../views/CourseIntro';
import DayView from '../views/DayView';
import LessonView from '../views/LessonView';
import QuizView from '../views/QuizView';
import ReplitView from '../views/ReplitView';
import VTurorialView from '../views/VTurorialView';
import AssignmentView from '../views/AssignmentView';

import StudentActions from '../actions/StudentActions';
import StudentStore from '../stores/StudentStore';

class CourseView extends Flux.View{
    
    constructor() {
        super();
        this.state = {
            courseSlug: null,
            currentCohort: null,
            menuItems: [
              {slug:"course", label:"Course", component: CourseMenu, size: 200 },
              {slug:"syllabus", label:"Journey", component: TimeMenu, size: 370, data: BCStore.getSyllabusDays() },
              {slug:"todo", label:"Todo's", component: TodoMenu, size: 370 },
              {slug:"search", label:"Search", size: 250 }
            ]
        };
        //this.sessionUpdated();
        this.bindStore(BCStore, 'syllabus', this.syllabusUpdated.bind(this));
    }
    
    componentWillMount(){
      const courseSlug = this.props.match.params.course_slug;
      const syllabus = BCStore.getSyllabus(courseSlug);
      if(!syllabus || syllabus.profile != courseSlug) BCActions.fetch().syllabus(courseSlug);
      this.setState({ 
        courseSlug,
        currentCohort: StudentStore.getCurrentCohort()
      });
    }
    
    syllabusUpdated(){
        this.fetchSecondSyllabusPhase();
        this.setState({
            menuItems: [
              {slug:"course", label:"Course", component: CourseMenu, size: 200 },
              {slug:"syllabus", label:"Journey", component: TimeMenu, size: 370, data: BCStore.getSyllabusDays() },
              {slug:"todo", label:"Todo's", component: TodoMenu, size: 370 },
              {slug:"search", label:"Search", size: 250 }
            ]
        });
    }
    
    fetchSecondSyllabusPhase(){
      const todos = StudentStore.getTodos();
      if(!todos){
        const student = StudentStore.getUser();
        if(student) StudentActions.fetch().todos(student.bc_id);
      } 
      const projects = BCStore.getProjects();
      if(!projects){
        BCActions.fetch().projects();
      } 
    }
    
    onSelect(option){
        if(typeof option.dayNumber !== 'undefined'){
          this.props.history.push(this.props.match.url+'/'+option.dayNumber);
        }
    }
    
    render() {
        if(!this.state.currentCohort || Array.isArray(this.state.currentCohort)) this.props.history.push('/choose');
        else if(this.state.currentCohort.profile_slug !== this.state.courseSlug){
          NotifyActions.notify('invalid_cohort');
          this.props.history.push('/choose');
        }
        
        return (
            <SplitLayout menuItems={this.state.menuItems}
              onNavBarSelect={this.onSelect.bind(this)}
              baseLevel={
                {slug:"course", path: this.props.match.url, label:"Course", component: CourseMenu, size: 200 }
              }
            >
                    <div>
                    {
                        // <Modal show={true} confirmLabel="Send Assignment" cancelLabel="Cancel"
                        //   onConfirm={}
                        // >
                        //   Please specify the github url
                        // </Modal>
                    }
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