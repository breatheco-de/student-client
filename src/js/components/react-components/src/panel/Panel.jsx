import React from 'react';
import PropTypes from 'prop-types';
import './panel.scss';
class Panel extends React.Component{
    
    render(){
        const padding = (this.props.padding === false) ? "p-0" : '';
        return(
            <div className={padding+" panel deph-"+this.props.deph+" "+this.props.className}
                style={this.props.style}>
                {this.props.children}
            </div>
        )
    }
}

Panel.propTypes = {
  // You can declare that a prop is a specific JS primitive. By default, these
  // are all optional.
  deph: PropTypes.number,
  style: PropTypes.object,
  className: PropTypes.string,
  padding: PropTypes.bool,
};
Panel.defaultProps = {
  deph: 1,
  style: null,
  padding: null,
  className: ''
};
export default Panel;