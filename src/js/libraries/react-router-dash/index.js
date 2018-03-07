import { Route, Redirect } from 'react-router-dom';
import React from 'react';

export const PrivateRoute = function(args){
    const Component = args.component;
    var rest = Object.assign({}, args);
    delete rest.component;
    return(
        <Route
          {...rest}
          render={(props) => args.loggedIn === true
            ? <Component {...rest} />
            : <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
        />
    );
} 


