import React from 'react';
import PropTypes from 'prop-types';

class Loading extends React.Component{
    
    render(){
        if(!this.props.show) return null;
        return(
            <div className="loading">
                <i className="fas fa-spinner"></i>
            </div>
        )
    }
}
Loading.propTypes = {
  // You can declare that a prop is a specific JS primitive. By default, these
  // are all optional.
  show: PropTypes.bool,
}
Loading.defaultProps = {
  show: false
};
export default Loading;