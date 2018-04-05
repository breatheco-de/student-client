import React from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';

import fontawesome from '@fortawesome/fontawesome';
import faCheckSquare from '@fortawesome/fontawesome-free-regular/faCheckSquare';
import faSquare from '@fortawesome/fontawesome-free-regular/faSquare';
fontawesome.library.add(faCheckSquare);
fontawesome.library.add(faSquare);

class CheckBox extends React.Component{
    
    constructor(){
        super();
        this.state = {
            checked: false
        }
    }
    
    componentWillReceiveProps(){
        if(this.state.checked !== this.props.checked)
            this.setState({ checked: this.props.checked });
    }
    
    onClick(){
        this.setState({
            checked: !this.state.checked
        });
        if(this.props.onClick) this.props.onClick(!this.state.checked);
    }
    
    render(){
        const notchecked = (!this.state.checked) ? "d-none" : "";
        const checked = (this.state.checked) ? "d-none":"";
        const Render = this.props.render;
        return(
            <div className="checkbox">
                <span className={notchecked} onClick={()=>this.onClick()}>
                    <i className="far fa-check-square"></i>
                </span>
                <span className={checked} onClick={()=>this.onClick()}>
                    <i className="far fa-square"></i>
                </span>
                {
                    (Render) ? <Render /> :
                    (<label htmlFor="checkbox">{this.props.label}</label>)
                }
            </div>
        )
    }
}
CheckBox.propTypes = {
  // You can declare that a prop is a specific JS primitive. By default, these
  // are all optional.
  render: PropTypes.func,
  onClick: PropTypes.func,
  checked: PropTypes.bool,
  label: PropTypes.string,
}
CheckBox.defaultProps = {
    label: '<No label defined>',
    checked: false,
    render: null,
};
export default withRouter(CheckBox);