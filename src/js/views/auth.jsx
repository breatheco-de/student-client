import React from 'react';
import {login, remind} from '../actions/auth.js';
import {Login, Forgot} from '../components/react-components/src/index';

export const LoginView = (props) => (<Login 
    onSubmit={(username, password) => login(username, password, props.history)} 
    logoURL="https://assets.breatheco.de/apis/img/images.php?blob&cat=icon&tags=breathecode,64" 
    appName={process.env.APP_NAME}
    onForgot={() => props.history.push("/forgot")}
/>);
export const ForgotView = (props) => (<Forgot 
    onSubmit={(username) => remind(username)} 
    logoURL="https://assets.breatheco.de/apis/img/images.php?blob&cat=icon&tags=breathecode,64" 
    appName={process.env.APP_NAME}
    onBackToLogin={() => props.history.push("/login")}
/>);