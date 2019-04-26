import React, {Component} from "react";
import {Panel, Loading} from '../../components/react-components/src/index';

export default class IFrameView extends Component {
  constructor(){
    super();
    this.state = {
      loading: true,
    };
  }

  render() {
    return (
      <Panel padding={false} style={{overflow: 'hidden'}}>
        <Loading show={this.state.loading} />
        <iframe onLoad={()=>this.setState({loading: false})} className="lesson-iframe" src={this.props.src} width="100%" style={{ height: "calc(100vh - 62px)" }} frameBorder="0" />
      </Panel>
    );
  }
}