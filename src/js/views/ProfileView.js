import React from "react";
import {Link} from "react-router-dom";
import Flux from '@4geeksacademy/react-flux-dash';
import {Panel} from '../components/react-components/src/index';
import {saveProfile} from '../actions/actions';
import OldStore from "../stores/OldStore";
import {Session} from 'bc-react-session';
import { Wizard } from '../components/wizard/Wizard';
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
        githubError: null
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
    console.log("Student: ",student);
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
        <div className="container">
        <div className="row text-center">
            <div className="col-12 col-md-6 mx-auto">
                <div className="profile-img mb-4" onClick={() => window.open('https://en.gravatar.com/emails/')}>
                <img src={ hasAvatar ? student.avatar : defaultAvatarURL}/>
                <a target="_blank" href="https://en.gravatar.com/emails/" className="btn">edit</a>
                </div>
                <form className="text-left" onSubmit={(e) => {

                    e.preventDefault();
                    if(this.state.student.github && this.state.student.github !== '' && this.state.student.first_name && this.state.student.first_name !=='' && this.state.student.last_name && this.state.student.last_name !== '')
                    {
                        fetch('https://api.github.com/users/'+student.github)
                            .then(resp => {
                                if(resp.status == 200){
                                    this.setState({ githubError: null });
                                    saveProfile(student.bc_id, {
                                        first_name: student.first_name ? student.first_name : '',
                                        last_name: student.last_name ? student.last_name : '',
                                        full_name: student.first_name + ' ' + student.last_name,
                                        github: student.github
                                    });
                                }
                                else this.setState({ githubError: 'This github username seems to be invalid' })
                            })
                            .catch(err => this.setState({ githubError: 'There github username is invalid' }));
                    }

                }}>
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
                        <input type="text" className={`form-control github ${(this.state.githubError || !hasGithub) ? "has-error" : ''}`} placeholder="Your Github"
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
                    { (!hasGithub || !student.first_name || this.state.githubError) && <div className='alert alert-danger'>
                        { (this.state.githubError || !hasGithub) && <small>Invalid github username</small>}
                        { (!student.first_name || !student.last_name) && <small>Please specify your first and last name</small>}
                        </div>
                    }
                    <div className="text-center">
                        <button className="btn form-control btn-success bg-info text-white">Update Profile Info</button>
                        <small><Link className="a text-info" to="/">or skip and go to dashboard</Link></small>
                    </div>
                </form>
            </div>
          </div>
        </div>
      </Panel>
    );
  }
}