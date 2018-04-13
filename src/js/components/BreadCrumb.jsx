import React from 'react';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
class BreadCrumb extends React.Component{
    
    render(){

        if(this.props.mobile) return (<ul className="breadcrumb" onClick={()=>this.props.onClick(this.props.levels[0].slug)}><li>BC</li></ul>);
        
        const DOMPieces = this.props.levels.map((level,i)=>{
            return (<li key={i} onClick={()=>this.props.onClick(level.slug)}>{level.label}</li>);
        });
        return(<ul className="breadcrumb">{DOMPieces}</ul>)
    }
}
BreadCrumb.propTypes = {
  // You can declare that a prop is a specific JS primitive. By default, these
  // are all optional.
  onClick: PropTypes.func,
  mobile: PropTypes.bool,
  levels: PropTypes.array.isRequired
}
BreadCrumb.defaultProps = {
  mobile: false,
  levels: []
};
export default withRouter(BreadCrumb);