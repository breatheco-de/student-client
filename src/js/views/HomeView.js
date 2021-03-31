import React from "react";
import Flux from '@4geeksacademy/react-flux-dash';
import {Panel} from '../components/react-components/src/index';
import OldStore from '../stores/OldStore';
import {Session} from 'bc-react-session';
import {logout} from '../actions/auth';

export default class HomeView extends Flux.View {
  
  componentDidMount(){
    const session = Session.get();
    if(session.active){
      let currentCohort = session.payload.currentCohort;
      if(currentCohort){
        if(Array.isArray(currentCohort)) this.props.history.push('/choose');
        else{
            const slug = currentCohort.cohort.syllabus.certificate.slug+".v"+currentCohort.cohort.syllabus.version;
            this.props.history.push('/course/'+slug);
        } 
      }
    }
    // let user = OldStore.getUser();
    //if(user.type === 'student' && currentCohort) this.props.history.push('/course/'+currentCohort.profile_slug);
    //else this.setState({ user, currentCohort });
  }
  
  render() {
    
    return (
      <div className="with-padding">
        <Panel style={{padding: "10px"}} zDepth={1}>
          <h2>We couldn't find your courses, <a href="#" onClick={() => logout()}>please logout to refresh</a></h2>
        </Panel>
      </div>
    );
  }
}