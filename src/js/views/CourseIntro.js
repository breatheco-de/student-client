import React from "react";
import Flux from '@4geeksacademy/react-flux-dash';
import {Panel} from '../components/react-components/src/index';

export default class CourseIntro extends Flux.View {

  render() {
    return (
      <div className="with-padding">
        <Panel style={{padding: "10px"}} zDepth={1}>
            <h1>Welcome to 4Geeks Academy!</h1>
            <p>To start your learning, please click on "My Journey" on the left menu and start completing the `readings`, `exercises`, and `projects` one by one.</p>
            <ol>
                <li><a target="_blank" rel="noopener noreferrer" href="https://4geeksacademy.slack.com">Academy Slack (Chat & Ask questions)</a></li>
                <li><a target="_blank" rel="noopener noreferrer" href="https://gitpod.io/">Gitpod (Code)</a></li>
                <li><a target="_blank" rel="noopener noreferrer" href="https://breatheco.de/assets">Additional Assets (infographics, eBooks, etc.)</a></li>
            </ol>
        </Panel>
      </div>
    );
  }
}
