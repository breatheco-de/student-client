import React from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import fontawesome from '@fortawesome/fontawesome';
import faCheckSquare from '@fortawesome/fontawesome-free-regular/faCheckSquare';
import faSquare from '@fortawesome/fontawesome-free-regular/faSquare';
fontawesome.library.add(faCheckSquare);
fontawesome.library.add(faSquare);

import './checkbox.scss';
const CheckBox = ({label, checked, render, onClick}) => {

        const _onClick = () => onClick && onClick(!checked);

        const _notchecked = (!checked) ? "d-none" : "";
        const _checked = (checked) ? "d-none":"";
        const Render = render;
        return(
            <div className="checkbox">
                <span className={"check "+_notchecked} onClick={()=>_onClick()}>
                    <i className="far fa-check-square"></i>
                </span>
                <span className={"check "+_checked} onClick={()=>_onClick()}>
                    <i className="far fa-square"></i>
                </span>
                {
                    (Render) ? <Render /> :
                    (<label htmlFor="checkbox">{label}</label>)
                }
            </div>
        );
}
CheckBox.propTypes = {
  //you can pass your own component to render the to-do
  render: PropTypes.func,
  //what happends on click
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