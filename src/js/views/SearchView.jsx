import Flux from 'react-flux-dash';
import {Link} from 'react-router-dom';
import React from "react";
import Panel from '../components/Panel.jsx';
import List from '../components/List.jsx';

export default class SearchView extends Flux.View {
  
  constructor(){
    super();
    this.state = {
    }
  }
  
  componentDidMount(){
   this.searchInput.focus(); 
  }
  
  render() {
    return (
      <Panel className="searchview">
        <div className="input-group mb-3">
          <i className="fas fa-search"></i>
          <input type="text" className="form-control" placeholder="Search by technology or topic"
            ref={(input) => { this.searchInput = input; }} onChange={(evt)=> this.searchContent = evt.target.value} />
        </div>
        <List className="ml-4 d-block" ordered={true}>
          <li>
            <ul class="toolbar up">
              <li>8 min read</li>
            </ul>
            <ul class="toolbar down">
              <li><Link to="/lesson/1">read now</Link></li>
            </ul>
            <h4 className="mb-0">How does the internet works</h4>
            <p className="technologies">HTML, CSS</p>
            <p className="result-description">Learn the process we have polished to make you learn 2 years of content in just a few weeks.</p>
          </li>
          <li>
            <h4>Learn HTML the right way!</h4>
          </li>
          <li>
            <h4>CSS Selectors infographic</h4>
          </li>
        </List>
      </Panel>
    );
  }
}