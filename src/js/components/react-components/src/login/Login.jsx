import React from "react";
import Validator from 'validator';

class Login extends React.Component {

  constructor(){
    super();
    this.state = {
      errorMsg: [],
      pending: false
    };
    this.username = '';
    this.password = '';
  }

  login(e){
    const errors = this.validateForm();
    
    if(!errors){
      this.setState({ errorMsg: [], pending: true });
      this.props.onSubmit(this.username, this.password)
      .catch((err) => {
        this.setState({ errorMsg: [err.msg || err.message || err], pending: false });
      });
    }
    else this.setState({ errorMsg: errors, pending: false });
    
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
          <img src={this.props.logoURL} />
          <small className="text-center d-block">[{this.props.appName}]</small>
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
            {
              (!this.state.pending) ?
                <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
              :
                <button className="btn btn-lg btn-secondary btn-block" type="button" disabled={this.state.pending}>Loading...</button>
            }
            <div className="checkbox">
                <a href="#" onClick={() => this.props.onForgot()}>Forgot Password</a>
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
export default Login;