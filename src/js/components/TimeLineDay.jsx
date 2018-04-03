import React from 'react';
import PropTypes from 'prop-types';

class TimeLineDay extends React.Component{
    
    toggleSelected(){
      this.props.onClick(this.props.dayNumber);
    }
    
    render(){
        
        return(
        	<li className={(this.props.isSelected) ? 'selected':''} onClick={() => this.toggleSelected()}>
        		<div className="direction-r">
        			<div className="flag-wrapper">
        			    <span className="flag-point"></span>
        				<span className="flag">Day {this.props.dayNumber}</span>
        				<span className="time-wrapper">
        				    <span className="time">{this.props.technologies.join(', ')}</span>
        				</span>
        			</div>
        			<div className="desc">{this.props.description}</div>
        		</div>
        	</li>
        )
    }
}
TimeLineDay.propTypes = {
  // You can declare that a prop is a specific JS primitive. By default, these
  // are all optional.
  dayNumber: PropTypes.number.isRequired,
  technologies: PropTypes.array,
  description: PropTypes.string.isRequired,
  isSelected: PropTypes.bool,
}
TimeLineDay.defaultProps = {
  deph: 1,
  isSelected: false,
  description: "No description provided",
  technologies: []
};
export default TimeLineDay;