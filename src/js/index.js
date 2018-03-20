//import react into the bundle
import React from 'react';
import ReactDOM from 'react-dom';
//include your index.scss file into the bundle
import '../styles/index.scss';

import fontawesome from '@fortawesome/fontawesome';
import faCheck from '@fortawesome/fontawesome-free-solid/faCheck';
import faGraduationCap from '@fortawesome/fontawesome-free-solid/faGraduationCap';
import faPlay from '@fortawesome/fontawesome-free-solid/faPlay';
import faSpinner from '@fortawesome/fontawesome-free-solid/faSpinner';
fontawesome.library.add(faCheck);
fontawesome.library.add(faGraduationCap);
fontawesome.library.add(faPlay);
fontawesome.library.add(faSpinner);

//import your own components
import Layout from './Layout.jsx';

ReactDOM.render(
  <Layout />,
  document.getElementById('app')
);