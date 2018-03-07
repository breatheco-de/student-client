import React from "react";
import SessionActions from '../actions/SessionActions';

export default class Login extends React.Component {

  render() {
    return (
      <div className="container">
        <div className="form-signin">
          <h2 className="form-signin-heading">Please sign in</h2>
          <label htmlFor="inputEmail" className="sr-only">Email address</label>
          <input type="email" id="inputEmail" className="form-control" placeholder="Email address" required autoFocus />
          <label htmlFor="inputPassword" className="sr-only">Password</label>
          <input type="password" id="inputPassword" className="form-control" placeholder="Password" required />
          <div className="checkbox">
            <label>
              <input type="checkbox" value="remember-me" /> Remember me
            </label>
          </div>
          <button onClick={() => SessionActions.loginUser(this.props.history)} className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
        </div>
      </div>
    );
  }
}