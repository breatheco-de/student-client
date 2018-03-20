import React from 'react';
import PropTypes from 'prop-types';

class Panel extends React.Component{
    
    render(){
        const padding = (this.props.padding === false) ? "p-0" : '';
        return(
            <div className={padding+" panel deph-"+this.props.deph}>
                {this.props.children}
            </div>
        )
    }
}

Panel.propTypes = {
  // You can declare that a prop is a specific JS primitive. By default, these
  // are all optional.
  deph: PropTypes.number,
  padding: PropTypes.string,
}
Panel.defaultProps = {
  deph: 1,
  padding: null
};
export default Panel;