import React from "react";
import Flux from '@4geeksacademy/react-flux-dash';
import Panel from '../components/Panel.jsx';

export default class CourseIntro extends Flux.View {
  getMarkdownText() {
    var rawMarkup = require('../../../messages/full-stack.md');
    return { __html: rawMarkup };
  }
  
  render() {
    return (
      <div className="with-padding">
        <Panel style={{padding: "10px"}} zDepth={1}>
            <div dangerouslySetInnerHTML={this.getMarkdownText()} />
        </Panel>
      </div>
    );
  }
}