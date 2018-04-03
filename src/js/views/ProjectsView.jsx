import React from "react";
import Flux from '@4geeksacademy/react-flux-dash';

export default class ProjectsView extends Flux.View {
  
  constructor(){
    super();
    this.state = {
      projects: []
    }
    //this.bindStore(WPStore, this.handleStoreChanges.bind(this));
  }
  
  handleStoreChanges(){
    this.setState({
      //projects: WPStore.getCourses()
    });
  }

  render() {
    var projects = this.state.projects.map((project) => (<li>{project.name}</li>));
    return (
      <div>
        <h1>Courses</h1>
        {projects}
      </div>
    );
  }
}