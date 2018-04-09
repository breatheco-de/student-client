import Flux from '@4geeksacademy/react-flux-dash';
import React from "react";
import Panel from '../components/Panel.jsx';
import Loading from '../components/Loading.jsx';

export default class LessonView extends Flux.View {
  
  constructor(){
    super();
    this.state = {
      loading: true
    }
  }
  
  render() {
    return (
      <Panel padding={false} style={{overflow: 'hidden'}}>
        <Loading show={this.state.loading} />
        <iframe onLoad={()=>this.setState({loading: false})} className="lesson-iframe" src={`${process.env.CMS_URL}/en/lesson/${this.props.match.params.lesson_slug}?plain=true`} 
          height="100%" width="100%" frameBorder="0" />
      </Panel>
    );
  }
}