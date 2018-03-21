import Flux from 'react-flux-dash';
import React from "react";
import CheckBox from '../components/CheckBox.jsx';
import UserStore from "../stores/UserStore";

export default class TodoView extends Flux.View {
  
  constructor(){
    super();
    this.state = {
      todos: UserStore.getTodos()
    }
  }
  
  render() {
    const todoElms = this.state.todos.map((td,i)=>{
      return (<li key={i}><CheckBox checked={td.done} label={td.label} /></li>);
    });
    return (
      <div className="todo-view with-padding">
        <ul className="todolist">
          {todoElms}
        </ul>
      </div>
    );
  }
}