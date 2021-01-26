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
    if(task.task_type !== 'PROJECT')
    {
      task.task_status = (newValue) ? "DONE":"PENDING";
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
      task.task_status = "DONE";
      task.github_url = this.projectDeliveredURL;
      OldActions.updateTask(task);
    }
    else{
      NotifyActions.notify('deliver_assignment_error');
    }
  }

  getTaskDescription(td){
    switch(td.type){
      case "LESSON":
        return 'Read';
      break;
      case 'EXERCISE': return 'Practice'; break;
      case 'PROJECT':
        if(td.task_status=='PENDING') return <span>Code - <span>(not delivered)</span></span>;
        else{
          if(td.revision_status=='PENDING') return <span>Code - <span className="text-warning">(pending teacher approval)</span></span>;
          else return <span>Code -
                <Popover
                    body={<div className="bg-light border border-dark p-2"><h5>Your teacher said: </h5><small>{td.description}</small></div>}
                >
                    {td.revision_status === 'REJECTED' && <span className=" ml-2 text-danger">(rejected by teacher)</span>}
                    {td.revision_status === 'APPROVED' && <span className=" ml-2 text-success">(approved by teacher)</span>}
                </Popover>
            </span>;
        }
      break;
      case "QUIZ": return 'Answer'; break;
    }
  }

  onDropdownSelect(actionable, option){
    switch(option.slug){
      case "goto":
        this.props.history.push(this.props.match.url+`/${actionable.task_type.charAt(0).toLowerCase()}/`+actionable.associated_slug);
      break;
      case "goto_blank":
        window.open(this.props.match.url+`/${actionable.task_type.charAt(0).toLowerCase()}/`+actionable.associated_slug);
      break;
      case "vtutorial":
        this.props.history.push(this.props.match.url+`/${actionable.task_type.charAt(0).toLowerCase()}/`+actionable.associated_slug+'/vtutorial/'+option.vtutorial_slug);
      break;
    }
  }

  getTaskMenu(td){
    switch(td.type){
      case "LESSON": return [{label: 'Read the lesson', slug:'goto'}]; break;
      case 'EXERCISE': return [{label: 'Open Exercises', slug:'goto_blank'}]; break;
      case "QUIZ": return [{label: 'Take the quiz', slug:'goto'}]; break;
      case 'PROJECT': return [{label: 'Read the instructions', slug:'goto'}]; break;
    }
  }

  render() {
    const todoElms = (!this.state.todos) ? [] : this.state.todos.filter((td) => {
        if(!this.state.includeDone && td.task_status === 'DONE') return false;
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
                      Deliver {td.task_status === "DONE" && "again"}
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
                          OldActions.updateAssignment(td, { task_status: 'PENDING', github_url: ' ', revision_status: 'PENDING' }, false);
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
                <CheckBox checked={td.task_status === 'DONE'} render={() => (
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
                  onClick={(newvalue) => td.revision_status !== 'APPROVED' && this.updateTask(td, newvalue)}
                />
              </li>);
    });

    const lesson = this.state.todos.filter(t => t.task_type === "LESSON");
    const project = this.state.todos.filter(t => t.task_type === 'PROJECT');
    const exercise = this.state.todos.filter(t => t.task_type === 'EXERCISE');

    return (
      <div className="todo-menu with-padding">
        <div className="row mx-1 text-center">
            <div className="col">
                <span className="show-status">You have completed {this.state.todos.filter(t => t.task_status === "DONE").length} tasks out of the {this.state.todos.length} total</span>
            </div>
        </div>
        <div className="row text-center">
            <div className="col">
                <ProgressKPI progress={Math.round((lesson.filter(t=>t.task_status === "DONE").length*100)/lesson.length)} />
                <p className="m-0 p-0 show-status"><small>Read</small></p>
            </div>
            <div className="col">
                <ProgressKPI progress={Math.round((exercise.filter(t=>t.task_status === "DONE").length*100)/exercise.length)} />
                <p className="m-0 p-0 show-status"><small>Practice</small></p>
            </div>
            <div className="col">
                <ProgressKPI progress={Math.round((project.filter(t=>t.task_status === "DONE").length*100)/project.length)} />
                <p className="m-0 p-0 show-status"><small>Code</small></p>
            </div>
        </div>
        <div className="row mx-2 task-filters">
            <div className="mx-auto">
                <span className="p-2">Show</span>
                <DropLink className="task-menu"
                    dropdown={[
                        { label: "all tasks", value: null },
                        { label: "only readings", value: "LESSON" },
                        { label: "only exercises", value: 'EXERCISE' },
                        { label: "only projects", value: 'PROJECT' }
                    ]}
                    onSelect={(option) => {
                        this.setState({ selectedType: option });
                    }}
                    direction="left"
                >{this.state.selectedType ? this.state.selectedType.label: "all tasks"}</DropLink>
                <a className="p-2 last-filter" href="#" onClick={(e) => {
                    this.setState({ includeDone: !this.state.includeDone });
                    e.preventDefault();
                }}>{(!this.state.includeDone) ? 'show done tasks':'hide done tasks'}</a>.
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