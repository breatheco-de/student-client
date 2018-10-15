import Flux from '@4geeksacademy/react-flux-dash';
import React from "react";
import {Panel, Loading, PanelNavbar} from '../../components/react-components/src/index';
import BCStore from '../../stores/BCStore.js';
import {Session} from 'bc-react-session';
import {getCurrentPath} from '../../utils/menu';

export default class LessonView extends Flux.View {
  
  constructor(){
    super();
    this.state = {
      loading: true,
      navbarCollapsed: false,
      token: Session.get().payload.access_token || ''
    };
  }
  
  componentDidMount(){
    const dayNumber = this.props.match.params.day_number;
    this.loadDay(dayNumber);
    this.bindStore(BCStore, 'syllabus', () => {
      const dayNumber = this.props.match.params.day_number;
      this.loadDay(dayNumber);
    });
  }
  
  loadDay(newDay=null){
    const day = BCStore.getSingleDay(newDay || this.props.match.params.day_number);
    if(day){
      const currentSlug = getCurrentPath().view;
      let previousAction, nextAction, currentAction = null;
      day.actionables.forEach((act, i) => {
        if(act.associated_slug == currentSlug){
          currentAction = day.actionables[i] || null;
          previousAction = day.actionables[i-1] || null;
          nextAction = day.actionables[i+1] || null;
        }
      });
      this.setState({ day, currentAction, previousAction, nextAction });
    }
  }
  
  getCurrentSlug(){
      const quiz = this.props.match.params.quiz_slug;
      const lesson = this.props.match.params.lesson_slug;
      const replit = this.props.match.params.replit_slug;
      return quiz || lesson || replit;
  }
  
  render(option) {
    const course_slug = this.props.match.params.course_slug;
    let getSlug = (as) => {
      return `/course/${course_slug}/${this.state.day.dayNumber}/${as.type.charAt(0)}/${as.associated_slug}`;
    };
    const src = `${process.env.CMS_URL}/en/lesson/${this.props.match.params.lesson_slug}?plain=true&access_token=${this.state.token}`;
    return (
      <Panel padding={false} style={{overflow: 'hidden'}}>
        <Loading show={this.state.loading} />
        <PanelNavbar 
          collapsed={this.state.navbarCollapsed}
          day={this.state.day}
          current={this.state.currentAction} 
          previous={this.state.previousAction} 
          next={this.state.nextAction} 
          onClick={(option) => {
            this.props.history.push(getSlug(option));
            this.setState({loading: true});
            this.loadDay(option.day.number);
          }}
          onCollapse={() => this.setState({navbarCollapsed: !this.state.navbarCollapsed})}
        />
        <iframe onLoad={()=>this.setState({loading: false})} className="lesson-iframe" src={src} 
          height="100%" width="100%" frameBorder="0" />
      </Panel>
    );
  }
}