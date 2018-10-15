import React from 'react';
import PropTypes from 'prop-types';
import './list.scss';
class List extends React.Component{
    
    render(){
        if(this.props.ordered) return(<ol className={"bclist "+this.props.className}>{this.props.children}</ol>)
        else return(<ul className={"bclist "+this.props.className}>{this.props.children}</ul>)
    }
}
List.propTypes = {
  // You can declare that a prop is a specific JS primitive. By default, these
  // are all optional.
  className: PropTypes.string,
  ordered: PropTypes.bool,
}
List.defaultProps = {
  className: '',
  ordered: false
};
export default List;