import React from "react";
import Flux from "@4geeksacademy/react-flux-dash";
import Validator from 'validator';
import bcLogo from '../../img/bc-icon.png';
import StudentActions from '../actions/StudentActions';

export default class Forgot extends Flux.View {

  constructor(){
    super();
    this.state = {
      errorMsg: []
    }
    this.password = '';
    this.repeat = '';
  }
  
  componentWillMount(){
//    const session = StudentStore.getAutentication();
  }

  remindSubmit(e){
    const errors = this.validateForm();
    if(!errors){
      StudentActions.loginUser(this.username, this.password, this.props.history)
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
    if(!Validator.isEmail(this.username)) errors.push('Invalid email');
    if(Validator.isEmpty(this.password)) errors.push('Password cannot be empty');
    
    return (errors.length === 0) ? false : errors;
  }
  
  render() {
    
    const errors = this.state.errorMsg.map((msg,i) => (<li key={i}>{msg}</li>));
    return (
      <div className="container">
        <div className="form-signin text-center">
          <img src={process.env.STATIC_PATH+bcLogo} />
          <h2 className="form-signin-heading">Choose a new password</h2>
          <form action="#" onSubmit={(e) => this.remindSubmit(e)}>
          { 
            (errors.length > 0) ? 
              (<div className="alert alert-danger"><ul>{errors}</ul></div>)
              : ''
          }
            <label htmlFor="inputEmail" className="sr-only">Your new password</label>
            <input type="password" id="inputEmail" className="form-control" placeholder="New password" required autoFocus 
              onChange={(e) => this.password = e.target.value}
            />
            <label htmlFor="inputPassword" className="sr-only">Repeat it</label>
            <input type="password" id="inputPassword" className="form-control" placeholder="Repeat" required
              onChange={(e) => this.repeat = e.target.value}
            />
            <button className="btn btn-lg btn-primary btn-block" type="submit">Change my password</button>
          </form>
          {
            //<button className="btn btn-lg btn-light btn-block" type="submit">or use Github <i className="fab fa-github"></i></button>
          }
        </div>
      </div>
    );
  }
}