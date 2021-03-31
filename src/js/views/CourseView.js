import React from 'react';
import Flux from '@4geeksacademy/react-flux-dash';
import { Route, Switch } from 'react-router-dom';
import SplitLayout from '../components/SplitLayout';

import { Wizard } from '../components/wizard/Wizard';
import TimeMenu from '../components/menus/TimeLineMenu';
import OldStore from '../stores/OldStore';
import OldActions from '../actions/OldActions';

import CourseIntro from '../views/CourseIntro';
import DayView from '../views/DayView';
import LessonView from '../views/panel/LessonView';
import QuizView from '../views/panel/QuizView';
import IFrameView from '../views/panel/IFrameView';
import ExerciseView from '../views/panel/ExerciseView';
import AssignmentView from '../views/panel/AssignmentView';
import VTurorialView from '../views/panel/VTurorialView';
import LiveView from '../views/LiveView';

import {Session} from 'bc-react-session';
import {menuModes, getCurrentPath} from '../utils/menu';

class CourseView extends Flux.View{

    constructor() {
        super();
        const context = this.getCurrentContext();
        this.state = {
            courseSlug: null,
            runTutorial: false,
            currentCohort: null,
            importantMessages: null,
            menuItems: (menuModes[context.path.menu]) ? menuModes[context.path.menu] : menuModes.course,
            currentMenuOption: (menuModes[context.path.menu]) ? menuModes[context.path.menu][0] : menuModes.course[0],
            context
        };
        //this.sessionUpdated();
        console.log("Constructooooooooooor")
        this.bindStore(OldStore, 'syllabus', this.syllabusUpdated.bind(this));
    }

    componentDidMount(){
      const courseSlug = this.props.match.params.course_slug;
      const syllabus = OldStore.getSyllabus(courseSlug);
        console.log("syllabus", syllabus);
      const _session = Session.get();
      if(!_session.payload.currentCohort || Array.isArray(_session.payload.currentCohort)) this.props.history.push('/choose');
      if(!syllabus || syllabus.profile != courseSlug) OldActions.fetch().syllabus(courseSlug);

      let currentMenuOption = this.state.currentMenuOption;
      if(this.state.context.path.menu == 'syllabus') currentMenuOption = {
        slug: this.state.context.path.menu,
        data: OldStore.getSyllabusDays(),
        component: TimeMenu
      };

      if((currentMenuOption.slug === 'course' || currentMenuOption.slug ==='live')  && _session.payload.currentCohort.streaming){
        currentMenuOption = Object.assign(currentMenuOption,
        { items: currentMenuOption.items.filter(item => item.slug !== "live").concat([{
              slug: "live",
              label: "Live",
              url: this.state.context.path.pathname.replace("/live")+"/live",
              items: currentMenuOption.items,
              icon: "fab fa-youtube"
            }])
        });
      }
      console.log("Context:", this.state.context);

      let state = {
        courseSlug,
        currentMenuOption,
        runTutorial: (typeof _session.payload.show_tutorial != 'undefined') ? _session.payload.show_tutorial : true,
        currentCohort: _session.payload.currentCohort,
        session: _session.payload,
        liveStreaming: null
      };
      if(this.state.context.path.day) state.currentOption = menuModes.course[0].items[0];
      this.setState(state);

    }

    getCurrentContext(){
        const path = getCurrentPath();
        let breadcrumb = [{ label: "BreatheCode", path: '/home' }];
        // if(path.course) breadcrumb.push({ label: 'Course', path: `/course/${path.course}` });
        // if(path.day) breadcrumb.push({ label: 'Day', path: `/course/${path.course}/${path.day}` });
        // if(path.type) breadcrumb.push({ label: path.type, path: `/course/${path.course}/${path.day}/${path.type}/${path.view}` });

        return { path, breadcrumb };
    }

    syllabusUpdated(){
        console.log("Syllabus updated");
        this.fetchSecondSyllabusPhase();

        let currentMenuOption = this.state.currentMenuOption;
        if(this.state.context.path.menu == 'syllabus')
          currentMenuOption = {
            slug: this.state.context.path.menu,
            data: OldStore.getSyllabusDays(),
            component: TimeMenu
          };


        this.setState({ menuItems: menuModes.course, currentMenuOption });
    }

    fetchSecondSyllabusPhase(){
        const todos = OldStore.getTodos();
        console.log("fetchSecondSyllabusPhase", todos);
      if(!todos){
        const student = Session.get().payload;
        if(student) OldActions.fetch().todos(student.bc_id);
      }
      const projects = OldStore.getProjects();
      if(!projects){
        OldActions.fetch().projects();
      }
    }

    onSelect(option){
        if(typeof option.slug != 'undefined' && this.state.menuItems.find((item => item.slug = option.slug))){
          if(option.slug == 'syllabus') option.data = OldStore.getSyllabusDays();
          if(typeof option.url != 'undefined') this.props.history.push(typeof option.url == 'string' ? option.url : option.url());
          if((typeof option.items == 'undefined' || !option.items) && !option.component) options.items = this.state.menuItems;
          this.setState({
            currentMenuOption: option,
            context: this.getCurrentContext()
          });
        }
        else if(typeof option.dayNumber != 'undefined'){
          this.props.history.push(this.props.match.url+'/'+option.dayNumber);
          this.setState({
            context: this.getCurrentContext(this.props.match.url+'/'+option.dayNumber)
          });
        }
    }

    render() {

        if(!this.state.session) return <p>Loading...</p>;
        const { assets_token, email } = this.state.session;
        return (
          <div>
              <SplitLayout
                menuItems={this.state.menuItems}
                breadcrumb={this.state.context.breadcrumb}
                selectedOption={this.state.currentMenuOption}
                onNavBarSelect={this.onSelect.bind(this)}
                baseLevel="course"
              >
                <Wizard
                  run={this.state.runTutorial}
                  context={this.state.context}
                />
                <div>
                    <Switch>
                        <Route exact path={this.props.match.path+'/r/:exercise_slug'} component={ExerciseView} />
                        <Route exact path={this.props.match.path+'/q/:quiz_slug'} component={QuizView} />
                        <Route exact path={this.props.match.path+'/p/:assignment_slug'} component={AssignmentView} />
                        <Route exact path={this.props.match.path+'/l/:lesson_slug'} component={LessonView} />
                        <Route exact path={this.props.match.path+'/live'} component={LiveView} />
                        <Route exact path={this.props.match.path+'/new-project'}
                            component={() =>
                                <IFrameView src={`https://assets.breatheco.de/apps/new-project?assets_token=${token || ''}&email=${email || ''}`} />
                            }
                        />
                        <Route exact path={this.props.match.path+'/:day_number'} component={DayView} />
                        <Route exact path={this.props.match.path+'/:day_number/l/:lesson_slug'} component={LessonView} />
                        <Route exact path={this.props.match.path+'/:day_number/q/:quiz_slug'} component={QuizView} />
                        <Route exact path={this.props.match.path+'/:day_number/e/:exercise_slug'} component={ExerciseView} />
                        <Route exact path={this.props.match.path+'/:day_number/e/:exercise_slug/vtutorial/:vtutorial_slug'} component={VTurorialView} />
                        <Route exact path={this.props.match.path+'/:day_number/p/:assignment_slug'} component={AssignmentView} />
                        <Route exact path={this.props.match.path} component={CourseIntro} />
                    </Switch>
                </div>
              </SplitLayout>
          </div>
        );
    }

}
export default CourseView;
//export default withShortcuts(Layout, keymap)