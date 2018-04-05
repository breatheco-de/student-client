import React from 'react';
import Flux from '@4geeksacademy/react-flux-dash';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import SplitLayout from '../components/SplitLayout';
import CourseMenu from '../components/menus/CourseMenu';
import TimeMenu from '../components/menus/TimeLineMenu';
import TodoMenu from '../components/menus/TodoMenu';

import BCStore from '../stores/BCStore';
import BCActions from '../actions/BCActions';

import CourseIntro from '../views/CourseIntro';
import DayView from '../views/DayView';
import LessonView from '../views/LessonView';
import QuizView from '../views/QuizView';
import ReplitView from '../views/ReplitView';
import AssignmentView from '../views/AssignmentView';

import StudentActions from '../actions/StudentActions';
import StudentStore from '../stores/StudentStore';

class CourseView extends Flux.View{
    
    constructor() {
        super();
        this.state = {
            courseSlug: null,
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
      if(!syllabus) BCActions.fetch().syllabus(courseSlug);
      this.setState({ courseSlug });
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
        const student = StudentStore.getStudent();
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
        return (
            <SplitLayout menuItems={this.state.menuItems}
              onNavBarSelect={this.onSelect.bind(this)}
              baseLevel={
                {slug:"course", path: this.props.match.url, label:"Course", component: CourseMenu, size: 200 }
              }
            >
                    <div>
                        <Switch>
                            <Route exact path={this.props.match.path} component={CourseIntro} />
                            <Route exact path={this.props.match.path+'/:day_number'} component={DayView} />
                            <Route exact path={this.props.match.path+'/:day_number/l/:lesson_slug'} component={LessonView} />
                            <Route exact path={this.props.match.path+'/:day_number/q/:quiz_slug'} component={QuizView} />
                            <Route exact path={this.props.match.path+'/:day_number/r/:replit_slug'} component={ReplitView} />
                            <Route exact path={this.props.match.path+'/:day_number/a/:assignment_slug'} component={AssignmentView} />
                        </Switch>
                    </div>
            </SplitLayout>
        );
    }
    
}
export default CourseView;
//export default withShortcuts(Layout, keymap)