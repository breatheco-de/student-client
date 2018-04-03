import React from "react";
import WPStore from "../stores/WPStore";
import Flux from '@4geeksacademy/react-flux-dash';
import AssetCard from '../components/AssetCard';
import {ListView} from '../libraries/react-bootstrap-dash/ListView';

export default class AssetsView extends Flux.View {
  
  constructor(){
    super();
    this.state = {
      assets: WPStore.getAssets(),
      searchKeyword: ''
    }
    this.bindStore(WPStore, this.handleStoreChanges.bind(this));
  }
  
  handleStoreChanges(){
    this.setState({
      assets: WPStore.getAssets()
    });
  }

  render() {
    
      const filteredCourses = this.state.assets.filter((item) => {
        if(this.state.searchKeyword.length <= 3) return true;
        return (item.title.rendered.indexOf(this.state.searchKeyword) != -1);
      });
    
    return (
      <div className="with-padding">
        <div>
          <input type="text" placeholder="Search for an asset" onChange={(evt)=> this.setState({ searchKeyword: evt.target.value })} />
        </div>
        <h1>:Assets</h1> 
        <ListView items={filteredCourses} component={AssetCard} />
      </div>
    );
  }
}