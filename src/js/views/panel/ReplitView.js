import Flux from '@4geeksacademy/react-flux-dash';
import React from "react";
import {Panel, Loading} from '../../components/react-components/src/index';
import OldStore from '../../stores/OldStore';
import Raven from 'raven-js';
import {Session} from 'bc-react-session';

export default class ReplitView extends Flux.View {
  
  constructor(){
    super();
    this.state = {
      loading: true,
      cohort: '',
      error: false
    };
  }
  
  componentWillMount()
  {
    const session = Session.get();
    this.setState({ cohort: session.payload.currentCohort });
  }

  componentDidMount(){
    window.open(this.getReplitURL());
  }
  
  getReplitURL(){
    const replit_slug = this.props.match.params.replit_slug;
    const cohort_slug = this.state.cohort.slug;
    const profile_slug = this.state.cohort.profile_slug;
    const url = process.env.REPLIT_URL+replit_slug+'&c='+cohort_slug+'&profile='+profile_slug;
    if(typeof replit_slug === 'undefined' || typeof cohort_slug === 'undefined' || typeof process.env.REPLIT_URL === 'undefined')
      Raven.captureException(new Error(`Invalid Replit URL ${url}`));

    return url;
  }
  
  render() {
    return (
      <Panel padding={false} className="text-center">
        <p className="w-50 mx-auto">Opening {this.props.match.params.replit_slug} exercises on a new window...</p>
        <p className="w-50  mx-auto"><a className="small" target="_blank" href={this.getReplitURL()} rel="noopener noreferrer">{this.getReplitURL()}</a></p>
      </Panel>
    );
  }
}