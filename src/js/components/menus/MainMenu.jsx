import React from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import MenuItem from '../MenuItem';

class MainMenu extends React.Component{
    
    render(){
        return(
            <div className="main-menu">
            {
                    // <MenuItem icon="fas fa-graduation-cap" label="My Journey" slug="journey" mobile={this.props.mobile}
                    //         onClick={() => this.props.onClick('syllabus')} to="/home" />
            }
            </div>
        )
    }
}
MainMenu.propTypes = {
  // You can declare that a prop is a specific JS primitive. By default, these
  // are all optional.
  onClick: PropTypes.func,
  mobile: PropTypes.bool
}
MainMenu.defaultProps = {
  mobile: false
};
export default withRouter(MainMenu);