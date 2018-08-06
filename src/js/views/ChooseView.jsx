import React from "react";
import Flux from '@4geeksacademy/react-flux-dash';
import { List, Panel, logout} from '../utils/react-components/src/index';
import {Session} from 'bc-react-session';

export default class ChooseView extends Flux.View {
  
  constructor(){
    super();
    this.state = {
      student: {
        cohorts: []
      }
    };
  }
  
  componentDidMount(){
    const session = Session.store.getSession();
    this.setState({ student: session.user });
    const unsubscribe = Session.onChange((session) => {
      if(typeof unsubscribe == 'function') unsubscribe();
      const currentCohort = (session.user) ? session.user.currentCohort : null;
      if(currentCohort && typeof currentCohort !== 'undefined' && !Array.isArray(currentCohort)) 
        this.props.history.push('/course/'+currentCohort.profile_slug);
    });
  }

  render() {
    const cohorts = this.state.student.cohorts.map((cohort,i) => (
      <li key={i}>
        <button className="btn btn-light ml-3"
          onClick={() => {
            Session.actions.setUser({currentCohort: cohort});
            
          }}>
          <i className="fas fa-external-link-alt"></i> launch this course
        </button>
        <span className="cohort-name">{cohort.profile_slug}</span>
        <p className="cohort-description m-0">Cohort: {cohort.name}</p>
      </li>
    ));
    return (
      <Panel className="choose-view" style={{padding: "10px"}} zDepth={1}>
        <div className="col-10 col-sm-6 mx-auto pt-5">
          <h4>Please choose a course to launch:</h4>
          <List className="courses">
            {cohorts}
          </List>
          <div className="text-center">
            <a className="btn btn-light" href="#" onClick={() => logout()}>or go ahead and logout</a>
          </div>
        </div>
      </Panel>
    );
  }
}