import React from "react";
import Flux from '@4geeksacademy/react-flux-dash';
import {Panel, BreadCrumb} from '../components/react-components/src/index';
import {Session} from 'bc-react-session';

export default class ProfileView extends Flux.View {
  
  constructor(){
    super();
    this.state = {
      student: {
        full_name: 'Profile'
      }
    };
  }
  
  componentWillMount(){
    const session = Session.get();
    if(session.payload) this.setState({ student: session.payload });
  }
  
  render() {
    return (
      <Panel className="profile-view" style={{padding: "10px"}} zDepth={1}>
        <h2><BreadCrumb levels={[
            {slug: 'breathecode', label: 'BreatheCode'},
            {slug: 'profile', label: 'Profile'}
          ]}
          onClick={(opt) => {
            switch(opt){
              case "breathecode": 
                this.props.history.goBack(); 
                this.props.history.push('/home'); 
              break;
            }
          }}
        /></h2>
        <p className="text-center mb-3">{this.state.student.full_name}</p>
        <div className="profile-img" onClick={() => window.open('https://en.gravatar.com/emails/')}> 
          <img src={this.state.student.avatar}/>
          <a target="_blank" href="https://en.gravatar.com/emails/" className="btn">edit</a>
        </div>
        <div className="row text-center mt-5">
          <div className="col-12 col-md-6 mx-auto">
            Points Accumulated: {this.state.student.total_points}
          </div>
        </div>
        {(this.state.student.github) ?
          (<div className="row text-center">
            <div className="col-12 col-md-6 mx-auto">
              <i className="fab fa-github"></i> {this.state.student.github}
            </div>
          </div>)
          : ''
        }
      </Panel>
    );
  }
}