import React from "react";
import Flux from 'react-flux-dash';
import WPStore from "../stores/WPStore";
import Paper from 'material-ui/Paper';

export default class WelcomeView extends Flux.View {
  getMarkdownText() {
    var rawMarkup = require('../../../messages/welcome.md');
    return { __html: rawMarkup };
  }
  
  render() {
    return (
      <div className="with-padding">
        <Paper style={{padding: "10px"}} zDepth={1}>
            <div dangerouslySetInnerHTML={this.getMarkdownText()} />
        </Paper>
      </div>
    );
  }
}