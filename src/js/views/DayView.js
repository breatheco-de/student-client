import Flux from '@4geeksacademy/react-flux-dash';
import React from "react";
import {withRouter} from "react-router-dom";
import DayContent from '../components/DayContent';
import { Notify } from 'bc-react-notifier';
import {ActionableItem, List, ProgressKPI, Panel} from '../components/react-components/src/index';
import {Session} from 'bc-react-session';
import OldStore from '../stores/OldStore';
import OldActions from '../actions/OldActions';

class DayView extends Flux.View {

  constructor(){
    super();
    this.state = {
      day: null,
      blocked: true,
      blockedError: null,
      visibleLesson: null,
      actionables: [],
    };
    this.bindStore(OldStore, 'syllabus', this.syllabusUpdated.bind(this));
    this.stopDayChangeListener = null;
  }

  componentWillMount(){
    this.syllabusUpdated();
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
          if(parseInt(newDayNumber, 10) !== this.state.day.dayNumber)
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
    const student = Session.get().payload;
    const singleDay = OldStore.getSingleDay(newDayNumber || this.props.match.params.day_number);
    if(singleDay){
      if(singleDay.opened && singleDay.actionables) setTimeout(() => window.location.hash = "started&menu=syllabus", 500);
      else setTimeout(() => window.location.hash = "menu=syllabus", 500);
      this.setState({
        day: singleDay,
        blocked: (student.type === 'teacher') ? false : !singleDay.opened,
        actionables: singleDay.actionables
      });
    }
  }

  actionableSelected(actionable, option){
    const s = Session.get().payload;
    let task = OldStore.getSingleTodo(actionable);
    if(!task){
        Notify.error("The task was not not found");
        return;
    } 

    switch(option.slug){
      case "mark-done":
        if(task.type != 'assignment'){
          task.status = (task.status == "pending") ? "done": "pending";
          OldActions.updateTask(task);
        }
        else{
            if(task.status == "done") OldActions.updateAssignment(task, { status: 'pending', github_url: '', revision_status: 'pending' });
            else OldActions.deliverAssignment(task);
        }
      break;
      case "goto":
        this.props.history.push(this.props.match.url+`/${actionable.type.charAt(0)}/`+actionable.associated_slug);
      break;
      case "new_window":
        window.open(`${option.url}&assets_token=${s.assets_token}`);
      break;
      case "vtutorial":
        this.props.history.push(this.props.match.url+`/${actionable.type.charAt(0)}/`+actionable.associated_slug+'/vtutorial/'+option.vtutorial_slug);
      break;
    }
  }

  enableDay(){
    OldActions.startDay(this.state.day);
  }

  render() {

    if(!this.state.day) return (<Panel className="dayview"><h1>Loading...</h1></Panel>);

    const unsynced = this.state.actionables.filter(act => act.status === 'unsynced');

    const actionable = this.state.actionables.filter(act => this.state.blocked || act.status !== 'unsynced').map((l,i) => {
      return <ActionableItem key={i} type={l.type}
                done={(l.status === "done")}
                revisionStatus={l.revision_status}
                description={l.description}
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
              {(unsynced.length>0) ?
                (<div className="alert alert-warning">
                  <span>There are {unsynced.length} new activities on this day &nbsp;</span>
                  <button className="btn btn-warning"
                  onClick={() => OldActions.addUnsyncedTodos(unsynced)}><i className="fas fa-sync"></i> Sync now</button>
                </div>) : ''
              }
              <h3>To finish this day you have to complete the following actions:</h3>
              <List>{actionable}</List>
          </DayContent>):''
        }
      </Panel>
    );
  }
}
export default withRouter(DayView);