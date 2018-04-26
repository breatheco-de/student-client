import React from "react";
import Flux from '@4geeksacademy/react-flux-dash';
import Panel from '../components/Panel.jsx';
import StudentStore from '../stores/StudentStore';
import StudentActions from '../actions/StudentActions';

export default class HomeView extends Flux.View {
  
  constructor(){
    super();

    this.state = {
      user: StudentStore.getUser(),
      currentCohort: StudentStore.getCurrentCohort()
    };
  }
  
  componentDidMount(){
    const session = StudentStore.getAutentication();
    if(session.autenticated){
      let currentCohort = StudentStore.getCurrentCohort();
      if(Array.isArray(currentCohort)) this.props.history.push('/choose');
      else this.props.history.push('/course/'+currentCohort.profile_slug);
    }
    else this.props.history.push('/login');
    // let user = StudentStore.getUser();
    //if(user.type === 'student' && currentCohort) this.props.history.push('/course/'+currentCohort.profile_slug);
    //else this.setState({ user, currentCohort });
  }
  
  render() {
    
    return (
      <div className="with-padding">
        <Panel style={{padding: "10px"}} zDepth={1}>
          {
            (this.state.user && this.state.user.type !== 'student') ? 
              (<div className="alert alert-danger">This platform is for students only</div>) : ''
          }
          We couldn't find your course, <a href="#" onClick={() => StudentActions.logoutUser()}>please logout to refresh</a>
        </Panel>
      </div>
    );
  }
}