import Flux from '@4geeksacademy/react-flux-dash';
import React from "react";
import Panel from '../components/Panel';
import Loading from '../components/Loading';
import StudentStore from '../stores/StudentStore';

export default class ReplitView extends Flux.View {
  
  constructor(){
    super();
    this.state = {
      loading: true
    }
  }
  
  componentWillMount()
  {
    this.setState({
      user: StudentStore.getStudent()
    });
  }
  
  render() {
    return (
      <Panel padding={false}>
        <Loading show={this.state.loading} />
        <iframe onLoad={()=>this.setState({loading: false})} className="replit-iframe" src={process.env.REPLIT_URL+this.props.match.params.replit_slug} 
          height="100%" width="100%" frameBorder="0" />
      </Panel>
    );
  }
}