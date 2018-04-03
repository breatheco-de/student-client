import React from "react";
import Flux from '@4geeksacademy/react-flux-dash';
import Panel from '../components/Panel.jsx';

export default class HomeView extends Flux.View {
  
  componentWillMount(){
    this.props.history.push('/course/full-stack');
  }
  
  render() {
    return (
      <div className="with-padding">
        <Panel style={{padding: "10px"}} zDepth={1}>
        </Panel>
      </div>
    );
  }
}