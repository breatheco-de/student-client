import Flux from 'react-flux-dash';
import React from "react";
import CheckBox from '../components/CheckBox.jsx';

export default class TodoView extends Flux.View {
  
  constructor(){
    super();
    this.state = {
    }
  }
  
  render() {
    return (
      <div className="todo-view with-padding">
        <ul className="todolist">
          <li><CheckBox checked={false} label="Notifications" /></li>
          <li><CheckBox checked={true} label="Sounds" /></li>
          <li><CheckBox checked={false} label="Video" /></li>
        </ul>
      </div>
    );
  }
}