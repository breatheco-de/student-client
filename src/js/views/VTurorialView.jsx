import Flux from '@4geeksacademy/react-flux-dash';
import React from "react";
import {Link} from "react-router-dom";
import {Panel, Loading} from '../utils/react-components/index';
export default class VTurorialView extends Flux.View {
  
  constructor(){
    super();
    this.state = {
      loading: true,
      alertMsg: null
    };
  }
  
  componentDidMount(){
    this.setState({
      alertMsg: <span>You should only watch this video if you are stuck <Link to={'/course/'+this.props.match.params.course_slug+'/'+this.props.match.params.day_number+'/r/'+this.props.match.params.replit_slug}>continue working on the exercises</Link></span>
    });
    setTimeout(() => this.setState({alertMsg: null}), 4000);
  }
  
  render() {
    return (
      <Panel padding={false} style={{overflow: 'hidden'}}>
        <Loading show={this.state.loading} />
        {
          (this.state.alertMsg) ? 
            <div className="alert alert-warning m-0 text-center">{this.state.alertMsg}</div>
            :''
        }
        <iframe onLoad={()=>this.setState({loading: false})} className="lesson-iframe" src={`${process.env.ASSETS_URL}/apps/video/?v=${this.props.match.params.vtutorial_slug}`} 
          height="100%" width="100%" frameBorder="0" />
      </Panel>
    );
  }
}