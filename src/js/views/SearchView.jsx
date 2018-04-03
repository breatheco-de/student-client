import Flux from '@4geeksacademy/react-flux-dash';
import React from "react";
import Panel from '../components/Panel.jsx';
import List from '../components/List.jsx';
import SearchResult from '../components/SearchResult.jsx';

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
          <SearchResult />
          <SearchResult />
          <SearchResult />
        </List>
      </Panel>
    );
  }
}