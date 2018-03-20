import React from 'react';
import {withRouter} from 'react-router-dom';

class MenuItem extends React.Component{
    
    onClick(){
        if(typeof(this.props.to) !== 'undefined') this.props.history.push(this.props.to);
        if(typeof(this.props.onClick) !== 'undefined') this.props.onClick();
    }
    
    render(){
        
        return(
            <li onClick={this.onClick.bind(this)}>
                <i className={this.props.icon+" menuicon"}></i>
                {this.props.label}
            </li>
        )
    }
}
export default withRouter(MenuItem);