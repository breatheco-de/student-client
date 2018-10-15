import Flux from '@4geeksacademy/react-flux-dash';
import React from "react";
import {Panel, Loading} from '../../components/react-components/src/index';
import {Session} from 'bc-react-session';

export default class LessonView extends Flux.View {
  
  constructor(){
    super();
    this.state = {
      loading: true,
      token: Session.store.getSession().access_token || ''
    };
  }
  
  render() {
    const src = process.env.ASSETS_URL+'/apps/quiz/'+this.props.match.params.quiz_slug+'?access_token='+this.state.token;
    return (
      <Panel padding={false}>
        <Loading show={this.state.loading} />
        <iframe onLoad={()=>this.setState({loading: false})} className="quiz-iframe" src={src} 
          height="100%" width="100%" frameBorder="0" />
      </Panel>
    );
  }
}