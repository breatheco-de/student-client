/* global Raven */
//import react into the bundle
import Raven from 'raven-js';
import React from 'react';
import ReactDOM from 'react-dom';
//include your index.scss file into the bundle
import '../styles/index.scss';
import './utils/icons';

import Layout from './Layout.jsx';

Raven.config('https://88709bb84c9f42bfbb8fd6d750369e46@sentry.io/1196496').install()

var packg = require('../../package.json');
Raven.setTagsContext({ 
  environment: process.env.ENVIRONMENT,
  version: packg.version
});
console.log("BreatheCode Platform",packg.version, process.env.ENVIRONMENT);

ReactDOM.render(
  <Layout />,
  document.getElementById('app')
);