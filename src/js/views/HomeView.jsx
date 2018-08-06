import React from "react";
import Flux from '@4geeksacademy/react-flux-dash';
import {Panel, logout} from '../utils/react-components/src/index';
import StudentStore from '../stores/StudentStore';
import {Session} from 'bc-react-session';

export default class HomeView extends Flux.View {
  
  componentDidMount(){
    const session = Session.store.getSession();
    if(session.autenticated){
      let currentCohort = session.user.currentCohort;
      if(currentCohort){
        if(Array.isArray(currentCohort)) this.props.history.push('/choose');
        else this.props.history.push('/course/'+currentCohort.profile_slug);
      }
    }
    // let user = StudentStore.getUser();
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