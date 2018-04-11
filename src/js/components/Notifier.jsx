import React from 'react';
import PropTypes from 'prop-types';
import { CSSTransitionGroup } from 'react-transition-group';
class Notifier extends React.Component{

    constructor(){
      super();
      this.state = {
        typeClasses: {
          error: 'alert-danger',
          info: 'alert-success',
          warning: 'alert-warning'
        }
      }    
    }
    
    render(){
        const notifications = this.props.notifications.map((noti, i) => (
          <CSSTransitionGroup key={i}
            transitionName="bcnotification"
            transitionAppear={true}
            transitionAppearTimeout={3000}
            transitionEnter={false}
            transitionLeave={false}>
            <li className={`alert ${this.state.typeClasses[noti.type]}`}>{noti.msg}</li>
          </CSSTransitionGroup>
        ));
        return(<ul className={"bcnotifier "+this.props.className}>{notifications}</ul>)
    }
}
Notifier.propTypes = {
  // You can declare that a prop is a specific JS primitive. By default, these
  // are all optional.
  notifications: PropTypes.array.isRequired,
  className: PropTypes.string
};
Notifier.defaultProps = {
  notifications: [],
  className: ''
};
export default Notifier;