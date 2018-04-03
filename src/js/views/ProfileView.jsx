import React from "react";
import Flux from '@4geeksacademy/react-flux-dash';
import Panel from '../components/Panel.jsx';

import BreadCrumb from '../components/BreadCrumb';

export default class ProfileView extends Flux.View {
  
  render() {
    return (
      <Panel className="profile-view" style={{padding: "10px"}} zDepth={1}>
        <BreadCrumb levels={[
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
        />
        <h2 className="text-center mb-3">Profile</h2>
        <div className="profile-img"> 
          <img src="https://s3-us-west-2.amazonaws.com/harriscarney/images/120x120.png"/>
          <a href="#" className="btn">edit</a>
        </div>
      </Panel>
    );
  }
}