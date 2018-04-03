import React from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import MenuItem from '../MenuItem';

class CourseMenu extends React.Component{
    
    render(){
        return(
            <div className="main-menu">
                <ul>
                    <MenuItem icon="fas fa-graduation-cap" label="My Journey" slug="journey" 
                        mobile={this.props.mobile}
                        onClick={() => this.props.onClick('syllabus')}
                    />
                    <MenuItem icon="fas fa-check" label="Todo's" slug="home" 
                        mobile={this.props.mobile}
                        onClick={() => this.props.onClick('todo')} 
                    />
                    {
                    // <MenuItem icon="fas fa-search" label="Search" slug="search" 
                    //     mobile={this.props.mobile}
                    //     onClick={() => this.props.onClick('search')} 
                    // />
                    }
                </ul>
            </div>
        )
    }
}
CourseMenu.propTypes = {
  // You can declare that a prop is a specific JS primitive. By default, these
  // are all optional.
  onClick: PropTypes.func,
  mobile: PropTypes.bool
}
CourseMenu.defaultProps = {
  mobile: false
};
export default withRouter(CourseMenu);