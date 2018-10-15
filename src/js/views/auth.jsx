import React from 'react';
import {login, remind} from '../actions/auth.js';
import {Login, Forgot} from '../components/react-components/src/index';

export const LoginView = () => <Login onSubmit={login} />;
export const ForgotView = () => <Forgot onSubmit={remind} />;