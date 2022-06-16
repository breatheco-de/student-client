import Flux from '@4geeksacademy/react-flux-dash';
import React from "react";
import {Panel, Loading} from '../../components/react-components/src/index';
import {Session} from 'bc-react-session';

export default class LessonView extends Flux.View {

  constructor(){
    super();
    const session = Session.store.getSession();
    this.state = {
      loading: true,
      token: session.access_token || ''
    };
  }

  render() {
    const url = "https://project.breatheco.de/?slug="+this.props.match.params.assignment_slug;
    return (
      <Panel padding={false}>
        <Loading show={this.state.loading} />
        <iframe onLoad={()=>this.setState({loading: false})} className="assignment-iframe" src={url}
          height="100%" width="100%" frameBorder="0" />
      </Panel>
    );
  }
}
