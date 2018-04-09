import Flux from '@4geeksacademy/react-flux-dash';
import React from "react";
import Panel from '../components/Panel';
import Loading from '../components/Loading';
import StudentStore from '../stores/StudentStore';

export default class ReplitView extends Flux.View {
  
  constructor(){
    super();
    this.state = {
      loading: true,
      cohort: ''
    }
  }
  
  componentWillMount()
  {
    const user = StudentStore.getStudent();
    if(user.cohorts && user.cohorts.length>0)
    this.setState({ cohort: user.cohorts[0] });
  }
  
  render() {
    return (
      <Panel padding={false}>
        <Loading show={this.state.loading} />
        <iframe onLoad={()=>this.setState({loading: false})} className="replit-iframe" src={process.env.REPLIT_URL+this.props.match.params.replit_slug+'&c='+this.state.cohort} 
          height="100%" width="100%" frameBorder="0" />
      </Panel>
    );
  }
}