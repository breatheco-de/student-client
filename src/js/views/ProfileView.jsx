import React from "react";
import {Link} from "react-router-dom";
import Flux from '@4geeksacademy/react-flux-dash';
import {Panel} from '../components/react-components/src/index';
import {saveProfile} from '../actions/actions';
import OldStore from "../stores/OldStore";
import {Session} from 'bc-react-session';
import { Wizard } from '../components/wizard/Wizard.jsx';
import defaultAvatarURL from '../../img/default-user-image.png';
import moment from 'moment';

export default class ProfileView extends Flux.View {
  
  constructor(){
    super();
    this.state = {
      student: {
        full_name: 'Profile',
        first_name: null,
        last_name: null,
        avatar: null,
        cohorts: [],
        github: '',
        githubChartURL: null
      }
    };
  }
  
  componentDidMount(){
    const session = Session.get();
    console.log(session.payload);
    if(session.payload) this.setState({ 
      student: session.payload
    });
    Session.onChange((session) => {
      this.setState({ 
        student: session.payload,
        githubChartURL: process.env.ASSETS_URL+"/apis/github/student/"+session.payload.bc_id+"/contributions?"+session.payload.github
      });
      
    });
  }
  
  updateProfile(newProfile){
    this.setState({ student: Object.assign(this.state.student, newProfile) });
  }
  
  render() {
    const { student } = this.state;
    const hasGithub = typeof student.github === 'string' && student.github !== '';
    const hasAvatar = typeof student.avatar === 'string' && student.avatar !== '';
    return (
      <Panel className="profile-view" style={{padding: "10px"}} zDepth={1}>
        <Wizard 
          run={!hasGithub}
          showSkipButton={false}
          continuous={false}
          steps={[
              {
                  target: '.github',
                  content: <div>Please specify your github username and save your profile</div>,
                  placement: 'right',
                  disableBeacon: true
              }
          ]}
        />
        <h2><i className="fas fa-arrow-left"></i> <Link className="text-dark" to="/">Back to the courses</Link></h2>
        <div className="row text-center mt-5">
          <div className="col-12 col-md-4 col-lg-3 pt-5">
            <div className="profile-img mb-4" onClick={() => window.open('https://en.gravatar.com/emails/')}> 
              <img src={ hasAvatar ? student.avatar : defaultAvatarURL}/>
              <a target="_blank" href="https://en.gravatar.com/emails/" className="btn">edit</a>
            </div>
            <form className="text-left" onSubmit={(e) => {
              e.preventDefault();
              saveProfile(student.bc_id, {
                first_name: student.first_name ? student.first_name : '',
                last_name: student.last_name ? student.last_name : '',
                full_name: student.first_name + ' ' + student.last_name,
                github: student.github
              })}
            }>
                <div className="form-group">
                    <div class="input-group mb-3">
                      <div class="input-group-prepend">
                        <span class="input-group-text" id="basic-addon1">First Name</span>
                      </div>
                      <input type="text" className="form-control"  aria-describedby="emailHelp" placeholder="First Name"
                          value={student.first_name || student.full_name} 
                          onChange={(e) => this.updateProfile({ first_name: e.target.value})}
                      />
                    </div>
                </div>
                <div className="form-group">
                    <div class="input-group mb-3">
                      <div class="input-group-prepend">
                        <span class="input-group-text" id="basic-addon1">Last Name</span>
                      </div>
                      <input type="text" className="form-control" aria-describedby="emailHelp" placeholder="Last Name"
                          value={student.last_name} 
                          onChange={(e) => this.updateProfile({ last_name: e.target.value})}
                      />
                    </div>
                </div>
                <div className="form-group">
                    <div class="input-group mb-3">
                      <div class="input-group-prepend">
                        <span class="input-group-text" id="basic-addon1"><i className="fab fa-github"></i></span>
                      </div>
                      <input type="text" className="form-control github" placeholder="Your Github"
                          value={ !hasGithub ? '' : student.github.replace(/(:?https?:\/\/)?(?:www\.)?github.com\//gm, '')} 
                          onChange={(e) => this.updateProfile({ github: e.target.value})}
                      />
                    </div>
                </div>
                <div className="form-group">
                    <div class="input-group mb-3">
                      <div class="input-group-prepend">
                        <span class="input-group-text" id="basic-addon1"><i class="fas fa-envelope"></i></span>
                      </div>
                      <input type="email" readOnly="true" className="form-control" placeholder="Your email"
                          value={student.email} style={{ background: "#FBFBFB"}}
                      />
                    </div>
                </div>
                { !hasGithub || !student.first_name || !student.last_name ? <div className='alert alert-danger'><small>Please specify github, first and last name</small></div> :
                  <div>
                    <button className="btn form-control btn-success bg-info text-white">Update Profile Info</button>
                  </div>
                }
              </form>
          </div>
          <div className="col-12 col-md-8 text-left">
            { hasGithub ? '':
              <div className="alert alert-danger">Please complete your Github username</div>
            }
            {/* ACADEMY SITUATION */}
            <div>
              <h4 className="mt-5">Your academy status</h4>
              { !Array.isArray(student.cohorts) ? <p>You don't seem to be a student</p> :  
                <div>
                  <p className="mb-0">
                    <small>You started {moment(student.created_at).fromNow()}, </small>
                    <small> since then you have joined {student.cohorts.length} cohorts: </small>
                    <small>{student.cohorts.map(c => c.name).join(', ')}.</small>
                  </p>
                  <p className="mt-0">
                  <small>You have acumulated {student.total_points} points of the <a target="_blank" href="https://www.4geeksacademy.co/the-talent-tree/">Talent Tree ™️</a></small>
                  </p>
                </div>
              }
            </div>
            {/* GITHUB SITUATION */}
            <div>
              <h4 className="mt-5">Your github status</h4>
              <p><small>You can think of Github as the LinkedIn for developers, other people need to see active your are and Github reflects your activity using the following chart: </small></p>
              {(hasGithub) ?
                (<p><img src={this.state.githubChartURL} /></p>)
                : <div className="alert alert-danger">The Activity Graph could not be loaded</div>
              }
              <p>
                <small>Each square is one day of the past 364 days and the color of the square determins how active where you on that day. The greener the better! 
                <a target="_blank" href="https://help.github.com/articles/viewing-contributions-on-your-profile/"> You can read more about it here</a></small>
              </p>
            </div>
          </div>
        </div>
      </Panel>
    );
  }
}