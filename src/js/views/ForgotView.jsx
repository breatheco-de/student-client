import React from "react";
import Flux from "@4geeksacademy/react-flux-dash";
import Validator from 'validator';
import bcLogo from '../../img/bc-icon.png';
import StudentActions from '../actions/StudentActions';

export default class Forgot extends Flux.View {

  constructor(){
    super();
    this.state = {
      errorMsg: [],
      successMsg: null
    }
    this.email = '';
  }
  
  componentWillMount(){
//    const session = StudentStore.getAutentication();
  }

  formSubmit(e){
    const errors = this.validateForm();
    if(!errors){
      this.setState({ errorMsg: [], successMsg: null });
      StudentActions.remindUser(this.email)
      .then(() => {
        this.setState({ 
          successMsg: `Check your email for instructions, if you don't receive th email check your spam folder`
        });
      })
      .catch((errorMsg) => {
        this.setState({ errorMsg: [errorMsg.msg] || [errorMsg] });
      });
    }
    else this.setState({ errorMsg: errors });
    
    e.preventDefault();
    return false;
  }
  
  validateForm(){
    let errors = [];
    if(!Validator.isEmail(this.email)) errors.push('Invalid email');
    
    return (errors.length === 0) ? false : errors;
  }
  
  render() {
    
    const errors = this.state.errorMsg.map((msg,i) => (<li key={i}>{msg}</li>));
    return (
      <div className="container">
        <div className="form-signin text-center">
          <img src={process.env.STATIC_PATH+bcLogo} />
          <h2 className="form-signin-heading">What's your account email?</h2>
          <form action="#" onSubmit={(e) => this.formSubmit(e)}>
          { 
            (errors.length > 0) ? 
              (<div className="alert alert-danger"><ul>{errors}</ul></div>)
              : ''
          }
          { 
            (this.state.successMsg) ? 
              (<div className="alert alert-success"><ul>{this.state.successMsg}</ul></div>)
              : ''
          }
            <label htmlFor="inputEmail" className="sr-only">What's your account email?</label>
            <input type="email" id="inputEmail" className="form-control mb-3 mt-3" placeholder="Your account email" required autoFocus 
              onChange={(e) => this.email = e.target.value}
            />
            <button className="btn btn-lg btn-primary btn-block" type="submit">Confirm email</button>
          </form>
          {
            //<button className="btn btn-lg btn-light btn-block" type="submit">or use Github <i className="fab fa-github"></i></button>
          }
        </div>
      </div>
    );
  }
}