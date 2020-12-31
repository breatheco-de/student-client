/* global Raven */
//import react into the bundle
import Raven from 'raven-js';
import React from 'react';
import ReactDOM from 'react-dom';
//include your index.scss file into the bundle
import '../styles/index.scss';
import './utils/icons';
import Layout from './Layout.js';
import packg from '../../package.json';
import {autoLogin} from './actions/auth';
import TagManager from 'react-gtm-module'

const tagManagerArgs = {
    gtmId: 'GTM-574Z6C5',
    auth: 'HXY0OFiOxShdVVBJHK5sbg',
    preview: 'env-2'
}

TagManager.initialize(tagManagerArgs)



if(process.env.DEBUG == true){
  Raven.config('https://88709bb84c9f42bfbb8fd6d750369e46@sentry.io/1196496').install()

  Raven.setTagsContext({
    environment: process.env.ENVIRONMENT,
    version: packg.version
  });
}

console.log("BreatheCode Platform",packg.version, process.env.ENVIRONMENT, `, debug: ${process.env.DEBUG}`);

const app = document.querySelector('#app');
const urlParams = new URLSearchParams(window.location.search);
const token = urlParams.get('token');

//if token comes in the URL we have to login with that token;
console.log("token", token)
if(token && typeof token != 'undefined' && token != '') 
    autoLogin(token)
        .then(() => { ReactDOM.render(<Layout />,app); })
        .catch(() => { ReactDOM.render(<div className="alert alert-danger text-center">Invalid Credentials</div>,app); });

//else normal rendering
else ReactDOM.render(<Layout />,app);