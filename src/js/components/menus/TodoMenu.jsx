import React from "react";
import Flux from "@4geeksacademy/react-flux-dash";
import {withRouter} from 'react-router-dom';
import StudentStore from "../../stores/StudentStore";
import StudentActions from "../../actions/StudentActions";
import {DropLink, CheckBox, NotifyActions } from '../../utils/react-components/src/index';


class TodoView extends Flux.View {
  
  constructor(){
    super();
    this.state = {
      todos: StudentStore.getTodos(),
      includeDone: false,
      beingDelivered: null
    };
    this.bindStore(StudentStore, 'todos', this.tasksUpdated.bind(this));
    this.projectDeliveredURL = '';
  }
  
  tasksUpdated(){
    this.setState({
      todos: StudentStore.getTodos()
    });
  }
  
  updateTask(task, newValue){
    if(task.type !== 'assignment')
    {
      task.status = (newValue) ? "done":"pending";
      StudentActions.updateTask(task);
    }
    else
    {
      this.setState({ beingDelivered: task });
    }
  }
  
  deliverAssignment(task){
    if(this.projectDeliveredURL !== '') 
    {
      task.status = "done";
      task.github_url = this.projectDeliveredURL;
      StudentActions.updateTask(task);
    }
    else{
      NotifyActions.notify('deliver_assignment_error');
    }
  }
  
  getTaskDescription(td){
    switch(td.type){
      case "lesson": 
        return 'Read'; 
      break;
      case "replit": return 'Practice'; break;
      case "assignment":
        if(td.status=='pending') return 'Code'; 
        else{
          if(td.revision_status=='pending') return 'Code (pending teacher approval)';
          else if(td.revision_status=='approved') return 'Code - (approved by teacher)';
          else if(td.revision_status=='rejected') return 'Code - (rejected by teacher)';
        }
      break;
      case "quiz": return 'Answer'; break;
    }
  }
  
  onDropdownSelect(actionable, option){
    switch(option.slug){
      case "goto":
        this.props.history.push(this.props.match.url+`/${actionable.type.charAt(0)}/`+actionable.associated_slug);
      break;
      case "vtutorial":
        this.props.history.push(this.props.match.url+`/${actionable.type.charAt(0)}/`+actionable.associated_slug+'/vtutorial/'+option.vtutorial_slug);
      break;
    }
  }
  
  getTaskMenu(td){
    switch(td.type){
      case "lesson": return [{label: 'Read the lesson', slug:'goto'}]; break;
      case "replit": return [{label: 'Practice on Repl.it', slug:'goto'}]; break;
      case "quiz": return [{label: 'Take the quiz', slug:'goto'}]; break;
      case "assignment": return [{label: 'Read the instructions', slug:'goto'}]; break;
    }
  }
  
  render() {
    const todoElms = (!this.state.todos) ? [] : this.state.todos.filter((td) => (!this.state.includeDone) ? (td.status === 'pending') : true).map((td,i)=>{
      
      if(this.state.beingDelivered && td.type == this.state.beingDelivered.type && this.state.beingDelivered.associated_slug === td.associated_slug){
        return (<li key={i} className="send-assignment">
                  Assignments need to uploaded into github before delivering them, click "deliver" when you are ready to specify your repository url.
                  <div className="btn-bar text-right">
                    <button className="btn btn-success mr-2"
                      onClick={()=> StudentActions.deliverAssignment(td)}>
                      Deliver
                    </button>
                    <button className="btn btn-danger mr-2"
                      onClick={()=> this.setState({ beingDelivered: null })}>
                      Cancel
                    </button>
                  </div>
                </li>);
      }
        
        
      return (<li key={i}>
                <CheckBox checked={(td.status==='done')} render={() => (
                    <div className={"task task-"+td.type}>
                      <DropLink className="task-menu" dropdown={this.getTaskMenu(td)} 
                          onSelect={(option) => this.onDropdownSelect(td, option)}
                          direction="left"
                      >
                      </DropLink>
                      <p className="task-title">{td.title}</p>
                      <p className="task-description">
                        {this.getTaskDescription(td)}
                      </p>
                    </div> 
                  )}
                  onClick={(newvalue) => this.updateTask(td, newvalue)}
                />
              </li>);
    });
    return (
      <div className="todo-menu with-padding">
        <span className="show-status">{`${todoElms.length} ${(!this.state.includeDone) ? 'pending':''} tasks...`}</span>
        <a className="show-done" href="#" onClick={() => this.setState({ includeDone: !this.state.includeDone })}>{(!this.state.includeDone) ? 'show done':'hide done'}</a>
        { (todoElms.length===0) ?
            (<p>Nothing to do...</p>)
            :
            (<ul className="todolist">
              {todoElms}
            </ul>)
        }
      </div>
    );
  }
}

export default withRouter(TodoView);