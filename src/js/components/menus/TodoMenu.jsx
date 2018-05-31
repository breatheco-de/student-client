import React from "react";
import Flux from "@4geeksacademy/react-flux-dash";
import CheckBox from '../CheckBox.jsx';
import StudentStore from "../../stores/StudentStore";
import StudentActions from "../../actions/StudentActions";
import NotifyActions from "../../actions/NotifyActions";
import DropLink from "../DropLink";

export default class TodoView extends Flux.View {
  
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
  
  getTaskMenu(td){
    switch(td.type){
      case "lesson": return [{lable: 'Read the lesson', slug:'goto'}]; break;
      case "replit": return [{lable: 'Practice on Repl.it', slug:'goto'}]; break;
      case "quiz": return [{lable: 'Take the quiz', slug:'goto'}]; break;
      case "assignment": return [{lable: 'Read the instructions', slug:'goto'}]; break;
    }
  }
  
  render() {
    const todoElms = (!this.state.todos) ? [] : this.state.todos.filter((td) => (!this.state.includeDone) ? (td.status === 'pending') : true).map((td,i)=>{
      
      if(this.state.beingDelivered && td.type == this.state.beingDelivered.type && this.state.beingDelivered.associated_slug === td.associated_slug){
        return (<li key={i} className="send-assignment">
                  Coding assignments cannot be delivered yet
                  <div className="btn-bar text-right">
                    <button className="btn btn-danger mr-2"
                      onClick={()=> this.setState({ beingDelivered: null })}>
                      Ok
                    </button>
                    {
                      // <button className="btn btn-success"
                      //   onClick={()=> this.deliverAssignment(this.state.beingDelivered)}>
                      //   deliver my assignment
                      // </button>
                    }
                  </div>
                </li>);
      }
        
        
      return (<li key={i}>
                <CheckBox checked={(td.status==='done')} render={() => (
                    <div className={"task task-"+td.type}>
                    {
                      // <DropLink className="task-menu" dropdown={this.getTaskMenu(td)} 
                      //     onSelect={(option) => this.props.onDropdownSelect(option)}>
                      //     <i className="fas fa-ellipsis-v"></i>
                      // </DropLink>
                    }
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