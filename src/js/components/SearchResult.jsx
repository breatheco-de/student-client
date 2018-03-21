import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import fontawesome from '@fortawesome/fontawesome';
import faBook from '@fortawesome/fontawesome-free-solid/faBook';
fontawesome.library.add(faBook);

class SearchResult extends React.Component{
    
    render(){
        return(
          <li>
            <ul className="toolbar up">
              <li>8 min read</li>
            </ul>
            <ul className="toolbar down">
              <li><Link to="/lesson/1">read now</Link></li>
            </ul>
            <h4><i class="fas fa-book" legend="Lesson"></i> How does the internet works</h4>
            <p className="technolgies">HTML, CSS</p>
            <p className="result-description">Learn the process we have polished to make you learn 2 years of content in just a few weeks.</p>
          </li>
        );
    }
}
SearchResult.propTypes = {
  // You can declare that a prop is a specific JS primitive. By default, these
  // are all optional.
  className: PropTypes.string,
}
SearchResult.defaultProps = {
  className: '',
};
export default SearchResult;