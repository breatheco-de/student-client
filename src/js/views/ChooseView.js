import React from "react";
import Flux from '@4geeksacademy/react-flux-dash';
import { List, Panel } from '../components/react-components/src/index';
import { Session } from 'bc-react-session';
import { logout } from '../actions/auth';
import { getStreaming } from '../actions/actions';
import BC from "../utils/api";
export default class ChooseView extends Flux.View {

  constructor() {
    super();
    this.state = {
      student: {
        cohorts: []
      }
    };
  }

  componentDidMount() {
    let session = Session.get();
    this.setState({ student: session.payload });
    const unsubscribe = Session.onChange((session) => {
      if (typeof unsubscribe == 'function') unsubscribe();

      const currentCohort = (session.payload) ? session.payload.currentCohort : null;
      if (currentCohort && typeof currentCohort !== 'undefined' && !Array.isArray(currentCohort)) {
        const slug = currentCohort.cohort.syllabus_version.slug + ".v" + currentCohort.cohort.syllabus_version.version;
        this.props.history.push('/course/' + slug);
      }
    });
    console.log("Cohorts STATE: ", this.state);
  }

  render() {
    const cohorts = this.state.student.cohorts.filter((cu) => ["PREWORK", "STARTED", "ACTIVE", "FINAL_PROJECT"].includes(cu.cohort.stage)).map((cu, i) => (
      <li key={i}>
        <button className="btn btn-light ml-3"
          onClick={() => {
            Session.setPayload({ currentCohort: cu });
            BC.setAcademy(cu.cohort.academy.id);
          }}>
          <i className="fas fa-external-link-alt"></i> launch this course
        </button>
        <span className="cohort-name">{cu.cohort.syllabus_version.name}</span>
        <p className="cohort-description m-0">Cohort: {cu.cohort.name}</p>
      </li>
    ))

    // This console log is used to check the cohorts array for the student.
    // console.log("Cohorts Array:", this.state.student.cohorts)

    return (
      <Panel className="choose-view" style={{ padding: "10px" }} zDepth={1}>
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
