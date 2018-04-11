import React from "react";
import Flux from "@4geeksacademy/react-flux-dash";
import CheckBox from '../CheckBox.jsx';
import StudentStore from "../../stores/StudentStore";
import StudentActions from "../../actions/StudentActions";

export default class TodoView extends Flux.View {
  
  constructor(){
    super();
    this.state = {
      todos: StudentStore.getTodos(),
      includeDone: false
    };
    this.bindStore(StudentStore, 'todos', this.tasksUpdated.bind(this));
  }
  
  tasksUpdated(){
    this.setState({
      todos: StudentStore.getTodos()
    });
  }
  
  updateTask(task, newValue){
    task.status = (newValue) ? "done":"pending";
    StudentActions.updateTask(task);
  }
  
  getTaskDescription(td){
    switch(td.type){
      case "lesson": return 'Read'; break;
      case "replit": return 'Practice'; break;
      case "assignment": return 'Code'; break;
      case "quiz": return 'Answer'; break;
    }
  }
  
  render() {
    const todoElms = (!this.state.todos) ? [] : this.state.todos.filter((td) => (!this.state.includeDone) ? (td.status === 'pending') : true).map((td,i)=>{
      return (<li key={i}>
                <CheckBox checked={(td.status==='done')} render={() => (
                    <div className={"task task-"+td.type}>
                      <p className="task-title">{td.title}</p>
                      <p className="task-description">{this.getTaskDescription(td)}</p>
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