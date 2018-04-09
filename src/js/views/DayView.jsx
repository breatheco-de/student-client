import Flux from '@4geeksacademy/react-flux-dash';
import React from "react";
import {withRouter} from "react-router-dom";
import Panel from '../components/Panel.jsx';
import ProgressKPI from '../components/ProgressKPI.jsx';
import DayContent from '../components/DayContent.jsx';
import List from '../components/List.jsx';
import ActionableItem from '../components/ActionableItem.jsx';
import BCStore from '../stores/BCStore';

import StudentStore from '../stores/StudentStore';
import StudentActions from '../actions/StudentActions';

class DayView extends Flux.View {
  
  constructor(){
    super();
    this.state = {
      day: null,
      blocked: true,
      visibleLesson: null,
      actionables: [],
    }
    this.bindStore(BCStore, 'syllabus', this.syllabusUpdated.bind(this));
    this.stopDayChangeListener = null;
  }
  
  getDropdown(){
    return [
      {label: 'Go to lesson', slug:'goto'},
      {label: 'Mark as Read/Done', slug:'mark-done'}
    ];
  }
  
  componentWillMount(){
    this.syllabusUpdated()
  }
  
  syllabusUpdated(){
    this.loadDay();
    if(!this.stopDayChangeListener){
      this.stopDayChangeListener = this.props.history.listen((location, action) => {
        let courseRegex = /course\/(.*)\/(\d*)$/;
        const match = location.pathname.match(courseRegex);
        if(match)
        {
          let newDayNumber = match[2]; // id = 'Ahg6qcgoay4'
          if(parseInt(newDayNumber) !== this.state.day.dayNumber)
            this.loadDay(newDayNumber);
        }
      });
    }
  }
  
  componentWillUnmount(){
    if(this.stopDayChangeListener){
      this.stopDayChangeListener();
      this.stopDayChangeListener = null;
    } 
  }
  
  loadDay(newDayNumber=null){
    const singleDay = BCStore.getSingleDay(newDayNumber || this.props.match.params.day_number);
    if(singleDay){
      this.setState({ 
        day: singleDay,
        blocked: !singleDay.opened,
        actionables: singleDay.actionables
      });
    }
  }
  
  markAsDone(l){
    this.setState({
      lessons: this.state.lessons.map(function(itm){
        if(itm.id == l.id) itm.done = true;
        return itm;
      }),
      quizzes: this.state.quizzes.map(function(itm){
        if(itm.id == l.id) itm.done = true;
        return itm;
      }),
      replits: this.state.replits.map(function(itm){
        if(itm.id == l.id) itm.done = true;
        return itm;
      }),
    });
  }
  
  enableDay(){
    console.log("Enable Day");
    StudentActions.startDay(this.state.day);
    this.setState({blocked: false});
  }
  
  show(actionable){
    switch(actionable.type){
      case "lesson":
        this.props.history.push(this.props.match.url+'/l/'+actionable.associated_slug);
      break;
      case "replit":
        this.props.history.push(this.props.match.url+'/r/'+actionable.associated_slug);
      break;
      case "quiz":
        this.props.history.push(this.props.match.url+'/q/'+actionable.associated_slug);
      break;
      case "assignment":
        this.props.history.push(this.props.match.url+'/a/'+actionable.associated_slug);
      break;
    }
  }
  
  render() {
    
    if(!this.state.day) return (<Panel className="dayview"><h1>Loading...</h1></Panel>);
    
    const actionable = this.state.actionables.map((l,i) => {
      return <ActionableItem key={i} type={l.type} 
                done={(l.status === "done")} 
                label={(typeof l.title !== 'undefined') ? l.title : l.associated_slug} 
                dropdown={l.menu} 
                onRead={()=>this.markAsDone(l)} 
                onClick={() => this.show(l)}
              />;
    });

    return (
      <Panel className="dayview">
        <h1>:{this.state.day.label} <ProgressKPI progress={this.state.day.completition} /></h1> 
        <p className="description">{this.state.day.description}</p>
        <DayContent onStart={this.enableDay.bind(this)} blocked={this.state.blocked}>
            <h3>To finish this day you have to complete the following actions:</h3>
            <List>{actionable}</List>
        </DayContent>
      </Panel>
    );
  }
}
export default withRouter(DayView);