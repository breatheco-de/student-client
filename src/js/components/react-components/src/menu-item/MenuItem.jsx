import React from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';

class MenuItem extends React.Component{
    constructor(){
        super();
        this.state = {
            mobile: false
        }
    }
    onClick(){
        if(this.props.to) this.props.history.push(this.props.to);
        if(this.props.onClick) this.props.onClick();
    }
    
    render(){
        return(
            <li onClick={this.onClick.bind(this)} className={(this.props.collapsed) ? 'collapsed':''}>
                <i id={this.props.slug} className={this.props.icon+" menuicon"}></i>
                <span>{this.props.label}</span>
            </li>
        )
    }
}
MenuItem.propTypes = {
  // You can declare that a prop is a specific JS primitive. By default, these
  // are all optional.
  mobile: PropTypes.bool,
  label: PropTypes.string.isRequired,
  icon: PropTypes.string,
  to: PropTypes.string,
  onClick: PropTypes.func.isRequired
}
MenuItem.defaultProps = {
    icon: '',
    onClick: null,
    to: null,
    mobile: false
};
export default withRouter(MenuItem);