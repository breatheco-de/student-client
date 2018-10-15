import React from 'react';
import {withRouter} from 'react-router-dom';
import bcLogo from '../../img/bc-icon.png';
import PropTypes from 'prop-types';
import './breadcrumb.scss';
class BreadCrumb extends React.Component{
    
    render(){

        if(this.props.collapsed) return (
            <ul className="breadcrumb">
                <li onClick={()=>this.props.history.push(this.props.levels[0].path)}><img className="logo" src={process.env.STATIC_PATH+bcLogo} /></li>
            </ul>);
        
        const DOMPieces = this.props.levels.map((level,i)=>{
            return (<li key={i} onClick={()=>this.props.history.push(level.path)}>{level.label}</li>);
        });
        return(<ul className="breadcrumb">{DOMPieces}</ul>);
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