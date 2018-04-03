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
      lessons: [],
      quizzes: [],
      replits: []
    }
    this.bindStore(BCStore, 'syllabus', this.syllabusUpdated.bind(this));
    this.bindStore(StudentStore, 'todos', this.syllabusUpdated.bind(this));
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
      const hasOpened = StudentStore.hasOpenedDay(singleDay || this.state.day);
      this.setState({ 
        day: singleDay,
        blocked: !hasOpened,
        lessons: singleDay.lessons,
        replits: singleDay.replits,
        quizzes: singleDay.quizzes
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
        this.props.history.push(this.props.match.url+'/l/'+actionable.slug);
      break;
      case "replit":
        this.props.history.push(this.props.match.url+'/r/'+actionable.slug);
      break;
      case "quiz":
        this.props.history.push(this.props.match.url+'/q/'+actionable.slug);
      break;
    }
  }
  
  render() {
    
    if(!this.state.day) return (
      <Panel className="dayview">
        <h1>Loading...</h1>
      </Panel>);
    let count = 0;
    let countDone = 0;
    const actionable = this.state.lessons.map((l,i) => {
      count++;
      if(l.status === "done") countDone++;
      return <ActionableItem key={count} type={l.type} done={(l.status === "done")} 
                label={l.title} dropdown={l.menu} onRead={()=>this.markAsDone(l)} 
                onClick={() => this.show(l)}
              />;
    })
    .concat(this.state.quizzes.map((l,i) => {
      count++;
      if(l.status === "done") countDone++;
      return <ActionableItem key={count} done={(l.status === "done")} type={l.type} 
                label={l.title} dropdown={l.menu} onRead={()=>this.markAsDone(l)} 
                onClick={() => this.show(l)}
              />;
    }))
    .concat(this.state.replits.map((l,i) => {
      count++;
      if(l.status === "done") countDone++;
      return <ActionableItem key={count} done={(l.status === "done")} type={l.type} label={l.title} dropdown={l.menu} onRead={()=>this.markAsDone(l)} />;
    }));
    let completitionPercentage = 0;
    //if(!this.state.blocked) completitionPercentage = (count===0) ? 100 : Math.round((countDone/count)*100);
    return (
      <Panel className="dayview">
        <h1>:Day {this.state.day.dayNumber} <ProgressKPI progress={completitionPercentage} /></h1> 
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