import React from 'react';
import {NavLink} from 'react-router-dom';

//const _BNavLink = function(args){
export const BNavLink = function(args){
    const {to} = args;
    var rest = Object.assign({}, args);
    delete rest.children;
    delete rest.to;
    return (<NavLink to={to} className="nav-link" {...rest}>{args.children}</NavLink>);
}
//export const BNavLink = withRouter(_BNavLink)