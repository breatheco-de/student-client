import React from 'react';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import DropLink from '../droplink';
import Popover from '../popover';

const options = ['lesson', 'exercise', 'QUIZ', 'project'];

class ActionableItem extends React.Component{

    onClick(force=false){
        if(this.props.dropdown.length==0 || force==true)
        {
            if(typeof(this.props.to) !== 'undefined') this.props.history.push(this.props.to);
            if(typeof(this.props.onClick) !== 'undefined') this.props.onClick();
        }
    }

    componentDidCatch(error, info) {
        // You can also log the error to an error reporting service
        console.log(error, info);
    }

    prependMessage(){
        const upper = this.props.type.toUpperCase();
        switch(upper){
            case "LESSON": return "Read:"; break;
            case "QUIZ": return "Answer:"; break;
            case "EXERCISE": return "Practice:"; break;
            case "PROJECT": return "Code:"; break;
            default: return ""; break;
        }
    }

    render(){
        return(
            <li className="actionable-item" onClick={this.onClick.bind(this)}>
                {(this.props.icon) ? (<i className={this.props.icon+" menuicon"}></i>):''}
                {this.prependMessage()}
                <DropLink dropdown={this.props.dropdown}
                    onSelect={(option) => this.props.onDropdownSelect(option)}>
                    {this.props.label}
                </DropLink>
                { this.props.done && <i className={"fas fa-check done"}></i>}
                { this.props.revisionStatus !== "PENDING" &&
                    <Popover
                        body={<div className="bg-light border border-dark p-2"><h5>Your teacher said: </h5><small>{this.props.description}</small></div>}
                    >
                        {this.props.revisionStatus === 'REJECTED' && <span className=" ml-2 text-danger">(rejected by teacher)</span>}
                        {this.props.revisionStatus === 'APPROVED' && <span className=" ml-2 text-success">(approved by teacher)</span>}
                    </Popover>
                }
                { this.props.details }
            </li>
        )
    }
}
ActionableItem.propTypes = {
  // You can declare that a prop is a specific JS primitive. By default, these
  // are all optional.
  label: PropTypes.string.isRequired,
  icon: PropTypes.string,
  description: PropTypes.string,
  revisionStatus: PropTypes.string,
  dropdown: PropTypes.array,
  isSelected: PropTypes.bool,
  onDropdownSelect: PropTypes.func.isRequired,
  type: PropTypes.oneOf(options),
};
ActionableItem.defaultProps = {
  icon: null,
  revisionStatus: "PENDING",
  description: null,
  dropdown: [],
  done: false
};
export default withRouter(ActionableItem);