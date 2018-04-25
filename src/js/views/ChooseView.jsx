import React from "react";
import Flux from '@4geeksacademy/react-flux-dash';
import Panel from '../components/Panel.jsx';
import StudentStore from '../stores/StudentStore';
import StudentActions from '../actions/StudentActions';
import List from '../components/List.jsx';

export default class ChooseView extends Flux.View {
  
  constructor(){
    super();
    this.state = {
      student: StudentStore.getUser()
    };
    
    this.bindStore(StudentStore, 'current_cohort', () => {
      const currentCohort = StudentStore.getCurrentCohort();
      if(typeof currentCohort !== 'undefined' && !Array.isArray(currentCohort)) this.props.history.push('/course/'+currentCohort.profile_slug);
    });
  }
  
  componentWillMount(){
    this.setState({
      student: StudentStore.getUser()
    });
  }
  
  render() {
    const cohorts = this.state.student.cohorts.map((cohort,i) => (
      <li key={i}>
        <button className="btn btn-light ml-3"
          onClick={() => StudentActions.chooseCohort(cohort)}>
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
        </div>
      </Panel>
    );
  }
}