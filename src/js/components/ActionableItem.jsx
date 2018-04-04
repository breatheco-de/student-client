import React from 'react';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import DropLink from './DropLink.jsx';

const options = ['lesson', 'replit', 'quiz', 'project'];

class ActionableItem extends React.Component{
    
    onClick(force=false){
        if(this.props.dropdown.length==0 || force==true)
        {
            if(typeof(this.props.to) !== 'undefined') this.props.history.push(this.props.to);
            if(typeof(this.props.onClick) !== 'undefined') this.props.onClick();
        }
    }
    
    onDropdownSelect(option)
    {
        if(option.slug == "goto") this.onClick(true);
        if(option.slug == "mark-done") this.props.onRead(option);
    }
    
    prependMessage(){
        switch(this.props.type){
            case "lesson": return "Read the lesson "; break;
            case "quiz": return "Take the quiz "; break;
            case "replit": return "Do the Repl "; break;
            default: return ""; break;
        }
    }
    
    render(){
        
        return(
            <li className="actionable-item" onClick={this.onClick.bind(this)}>
                {(this.props.icon) ? (<i className={this.props.icon+" menuicon"}></i>):''}
                {this.prependMessage()}
                <DropLink dropdown={this.props.dropdown} 
                    onSelect={this.onDropdownSelect.bind(this)}>
                    {this.props.label}
                </DropLink>
                {(this.props.done) ? (<i className="fas fa-check done"></i>):''}
            </li>
        )
    }
}
ActionableItem.propTypes = {
  // You can declare that a prop is a specific JS primitive. By default, these
  // are all optional.
  label: PropTypes.string.isRequired,
  dropdown: PropTypes.array,
  isSelected: PropTypes.bool,
  onRead: PropTypes.func.isRequired,
  type: PropTypes.oneOf(options),
}
ActionableItem.defaultProps = {
  icon: false,
  dropdown: [],
  done: false
};
export default withRouter(ActionableItem);