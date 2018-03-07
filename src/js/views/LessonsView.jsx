import Flux from 'react-flux-dash';
import React from "react";
import WPStore from "../stores/WPStore";
import CourseCard from '../components/CourseCard';
import {ListView} from '../libraries/react-bootstrap-dash/ListView.jsx';

export default class LessonsView extends Flux.View {
  
  constructor(){
    super();
    this.state = {
      courses: WPStore.getCourses()
    }
    this.bindStore(WPStore, this.handleStoreChanges);
  }
  
  handleStoreChanges(){
    this.setState({
      courses: this.getCourses()
    });
  }

  render() {
    return (
      <div className="with-padding">
        <h1>:Lessons</h1> 
        <ListView items={this.state.courses} component={CourseCard} />
      </div>
    );
  }
}