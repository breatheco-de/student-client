//import react into the bundle
import React from 'react';
import ReactDOM from 'react-dom';
//include your index.scss file into the bundle
import '../styles/index.scss';
import './utils/icons';

//import your own components
import Layout from './Layout.jsx';

var packg = require('../../package.json');
console.log("BreatheCode Platform",packg.version);

ReactDOM.render(
  <Layout />,
  document.getElementById('app')
);