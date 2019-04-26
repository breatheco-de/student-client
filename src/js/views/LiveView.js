import Flux from '@4geeksacademy/react-flux-dash';
import React from "react";
import {Panel, Loading} from '../components/react-components/src/index';
import {Session} from 'bc-react-session';
import { getStreaming } from '../actions/actions';

export default class LiveView extends Flux.View {
  
  constructor(){
    super();
    this.state = {
      loading: true,
      token: Session.store.getSession().access_token || '',
      iframeURL: null
    };
  }
  
  componentDidMount(){
    const { currentCohort } = Session.getPayload();
    if(this.props.match.params.cohort_slug){
      getStreaming(this.props.match.params.cohort_slug)
        .then(data => this.setState({ iframeURL: data.iframe }))
        .catch(() => this.setState({ error: "The Cohort Streaming Information could not be retrieved" }));
    }
    else if(currentCohort && currentCohort.streaming){
      this.setState({ iframeURL: currentCohort.streaming.iframe });
    }
    else{
      this.setState({ error: "The Cohort Streaming Information could not be retrieved" });
    }
  }
  
  render() {
    return (
      <Panel padding={false}>
        <Loading show={this.state.loading} />
        { this.state.iframeURL && <iframe onLoad={()=>this.setState({loading: false})} className="live-iframe" src={this.state.iframeURL} 
          height="100%" width="100%" frameBorder="0" />
        }
      </Panel>
    );
  }
}