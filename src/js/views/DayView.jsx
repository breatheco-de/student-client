import Flux from '@4geeksacademy/react-flux-dash';
import React from "react";
import {withRouter} from "react-router-dom";
import Panel from '../components/Panel.jsx';
import ProgressKPI from '../components/ProgressKPI.jsx';
import DayContent from '../components/DayContent.jsx';
import List from '../components/List.jsx';
import ActionableItem from '../components/ActionableItem.jsx';
import BCStore from '../stores/BCStore';
import StudentActions from '../actions/StudentActions';
import StudentStore from '../stores/StudentStore';

class DayView extends Flux.View {
  
  constructor(){
    super();
    this.state = {
      day: null,
      blocked: true,
      blockedError: null,
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
    const student = StudentStore.getStudent();
    const singleDay = BCStore.getSingleDay(newDayNumber || this.props.match.params.day_number);
    if(singleDay){
      this.setState({ 
        day: singleDay,
        blocked: (student.type === 'teacher') ? false : !singleDay.opened,
        actionables: singleDay.actionables
      });
    }
  }
  
  actionableSelected(actionable, option){
    switch(option.slug){
      case "mark-done":
        let task = StudentStore.getSingleTodo(actionable);
        if(task){
          task.status = "done";
          StudentActions.updateTask(task);
        }
      break;
      case "goto":
        this.show(actionable);
      break;
    }
  }
  
  enableDay(){
    console.log("Enable Day");
    StudentActions.startDay(this.state.day);
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
                onDropdownSelect={(option)=>this.actionableSelected(l,option)} 
              />;
    });

    return (
      <Panel className="dayview">
        <h1>:{this.state.day.label} <ProgressKPI progress={this.state.day.completition} /></h1> 
        <p className="description">{this.state.day.description}</p>
        {(actionable.length > 0)?
          (<DayContent onStart={this.enableDay.bind(this)} blocked={this.state.blocked}>
              <h3>To finish this day you have to complete the following actions:</h3>
              <List>{actionable}</List>
          </DayContent>):''
        }
      </Panel>
    );
  }
}
export default withRouter(DayView);