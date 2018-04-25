import React from "react";
import Flux from '@4geeksacademy/react-flux-dash';
import Panel from '../components/Panel.jsx';
import StudentStore from '../stores/StudentStore';

export default class HomeView extends Flux.View {
  
  componentWillMount(){
    this.setState({
      currentCohort: StudentStore.getCurrentCohort(),
      user: StudentStore.getUser()
    });
  }
  
  render() {
    if(this.state.user.type === 'student' && this.state.currentCohort) this.props.history.push('/course/'+this.state.currentCohort.profile_slug);
    
    return (
      <div className="with-padding">
        <Panel style={{padding: "10px"}} zDepth={1}>
          {
            (this.state.user.type !== 'student') ? 
              (<div className="alert alert-danger">This platform is for students only</div>) : ''
          }
          Welcome
        </Panel>
      </div>
    );
  }
}