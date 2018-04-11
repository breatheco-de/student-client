import React from "react";
import Flux from "@4geeksacademy/react-flux-dash";
import {Link} from "react-router-dom";
import Validator from 'validator';
import bcLogo from '../../img/bc-icon.png';
import StudentActions from '../actions/StudentActions';
import StudentStore from '../stores/StudentStore';

export default class Login extends Flux.View {

  constructor(){
    super();
    this.state = {
      errorMsg: []
    }
    this.username = '';
    this.password = '';
  }
  
  componentWillMount(){
    const session = StudentStore.getAutentication();
    if(session.autenticated) this.props.history.push('/home');
  }

  login(e){
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
          <h2 className="form-signin-heading mt-5">Please sign in</h2>
          <form action="#" onSubmit={(e) => this.login(e)}>
          { 
            (errors.length > 0) ? 
              (<div className="alert alert-danger"><ul>{errors}</ul></div>)
              : ''
          }
            <label htmlFor="inputEmail" className="sr-only">Email address</label>
            <input type="email" id="inputEmail" className="form-control" placeholder="Email address" required autoFocus 
              onChange={(e) => this.username = e.target.value}
            />
            <label htmlFor="inputPassword" className="sr-only">Password</label>
            <input type="password" id="inputPassword" className="form-control" placeholder="Password" required
              onChange={(e) => this.password = e.target.value}
            />
            <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
            <div className="checkbox">
                <Link to="/forgot">Forgot Password</Link>
            </div>
          </form>
          {
            //<button className="btn btn-lg btn-light btn-block" type="submit">or use Github <i className="fab fa-github"></i></button>
          }
        </div>
      </div>
    );
  }
}