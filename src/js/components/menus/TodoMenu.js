import React from "react";
import Flux from "@4geeksacademy/react-flux-dash";
import {withRouter} from 'react-router-dom';
import OldStore from "../../stores/OldStore";
import OldActions from "../../actions/OldActions";
import {DropLink, CheckBox, NotifyActions, ProgressKPI, Popover } from '../../components/react-components/src/index';


class TodoView extends Flux.View {

  constructor(){
    super();
    this.state = {
      todos: OldStore.getTodos(),
      includeDone: false,
      selectedType: null,
      beingDeleted: null,
      beingDelivered: null
    };
    this.bindStore(OldStore, 'todos', this.tasksUpdated.bind(this));
    this.projectDeliveredURL = '';
  }

  tasksUpdated(){
    this.setState({
      todos: OldStore.getTodos()
    });
  }

  updateTask(task, newValue){
    if(task.type !== 'assignment')
    {
      task.status = (newValue) ? "done":"pending";
      OldActions.updateTask(task);
    }
    else
    {
        if(newValue) this.setState({ beingDelivered: task });
        else this.setState({ beingDeleted: task });
    }
  }

  deliverAssignment(task){
    if(this.projectDeliveredURL !== '')
    {
      task.status = "done";
      task.github_url = this.projectDeliveredURL;
      OldActions.updateTask(task);
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
        if(td.status=='pending') return <span>Code - <span>(not delivered)</span></span>;
        else{
          if(td.revision_status=='pending') return <span>Code - <span className="text-warning">(pending teacher approval)</span></span>;
          else return <span>Code -
                <Popover
                    body={<div className="bg-light border border-dark p-2"><h5>Your teacher said: </h5><small>{td.description}</small></div>}
                >
                    {td.revision_status === "rejected" && <span className=" ml-2 text-danger">(rejected by teacher)</span>}
                    {td.revision_status === "approved" && <span className=" ml-2 text-success">(approved by teacher)</span>}
                </Popover>
            </span>;
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
    const todoElms = (!this.state.todos) ? [] : this.state.todos.filter((td) => {
        if(!this.state.includeDone && td.status === 'done') return false;
        if(this.state.selectedType && this.state.selectedType.value && this.state.selectedType.value !== td.type) return false;

        return true;
        }).map((td,i)=>{

      if(this.state.beingDelivered && td.type == this.state.beingDelivered.type && this.state.beingDelivered.associated_slug === td.associated_slug){
        return (<li key={i} className="send-assignment">
                  Assignments need to uploaded into github before delivering them, click "deliver" when you are ready to specify your repository url.
                  <div className="btn-bar text-right">
                    <button className="btn btn-success mr-2"
                      onClick={()=> {
                          OldActions.deliverAssignment(td);
                          this.setState({ beingDelivered: null });
                      }}>
                      Deliver {td.status === "done" && "again"}
                    </button>
                    <button className="btn btn-danger mr-2"
                      onClick={()=> {
                          this.setState({ beingDelivered: null });
                      }}>
                      Cancel
                    </button>
                  </div>
                </li>);
      }
      else if(this.state.beingDeleted && td.type == this.state.beingDeleted.type && this.state.beingDeleted.associated_slug === td.associated_slug){
        return (<li key={i} className="send-assignment">
                  Are you sure? By marking this as <strong>not done</strong> you are going to delete your project submition.
                  <div className="btn-bar text-right">
                    <button className="btn btn-danger mr-2"
                      onClick={()=> {
                          OldActions.updateAssignment(td, { status: 'pending', github_url: ' ', revision_status: 'pending' }, false);
                          this.setState({ beingDeleted: null });
                      }}>
                      Delete
                    </button>
                    <button className="btn btn-secondary mr-2"
                      onClick={()=> this.setState({ beingDeleted: null })}>
                      Cancel
                    </button>
                  </div>
                </li>);
      }


      return (<li key={i}>
                <CheckBox checked={td.status === 'done'} render={() => (
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
                  onClick={(newvalue) => td.revision_status !== 'approved' && this.updateTask(td, newvalue)}
                />
              </li>);
    });

    const lesson = this.state.todos.filter(t => t.type === "lesson");
    const project = this.state.todos.filter(t => t.type === "assignment");
    const replit = this.state.todos.filter(t => t.type === "replit");

    return (
      <div className="todo-menu with-padding">
        <div className="row mx-1 text-center">
            <div className="col">
                <span className="show-status">You have completed {this.state.todos.filter(t => t.status === "done").length} tasks out of the {this.state.todos.length} total</span>
            </div>
        </div>
        <div className="row text-center">
            <div className="col">
                <ProgressKPI progress={Math.round((lesson.filter(t=>t.status === "done").length*100)/lesson.length)} />
                <p className="m-0 p-0 show-status"><small>Read</small></p>
            </div>
            <div className="col">
                <ProgressKPI progress={Math.round((replit.filter(t=>t.status === "done").length*100)/replit.length)} />
                <p className="m-0 p-0 show-status"><small>Practice</small></p>
            </div>
            <div className="col">
                <ProgressKPI progress={Math.round((project.filter(t=>t.status === "done").length*100)/project.length)} />
                <p className="m-0 p-0 show-status"><small>Code</small></p>
            </div>
        </div>
        <div className="row mx-2 task-filters">
            <div className="mx-auto">
                <span className="p-2">Show</span>
                <DropLink className="task-menu"
                    dropdown={[
                        { label: "all tasks", value: null },
                        { label: "only readings", value: "lesson" },
                        { label: "only replits", value: "replit" },
                        { label: "only projects", value: "assignment" }
                    ]}
                    onSelect={(option) => {
                        this.setState({ selectedType: option });
                    }}
                    direction="left"
                >{this.state.selectedType ? this.state.selectedType.label: "all tasks"}</DropLink>
                <a className="p-2 last-filter" href="#" onClick={(e) => {
                    this.setState({ includeDone: !this.state.includeDone });
                    e.preventDefault();
                }}>{(!this.state.includeDone) ? 'without done':'including done'}</a>.
            </div>
        </div>
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