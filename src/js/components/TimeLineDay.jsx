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
        				<span className="flag">{this.props.label}</span>
        				{ (this.props.technologies.length > 0) ? 
          				(<span className="time-wrapper">
          				    <span className="time">{this.props.technologies.join(', ')}</span>
          				</span>)
          				:''
        				}
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
  label: PropTypes.string.isRequired,
  technologies: PropTypes.array,
  description: PropTypes.string,
  isSelected: PropTypes.bool,
};
TimeLineDay.defaultProps = {
  deph: 1,
  label: '',
  isSelected: false,
  description: "",
  technologies: []
};
export default TimeLineDay;