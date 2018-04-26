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
      cohort: '',
      error: false
    }
  }
  
  componentWillMount()
  {
    const cohort = StudentStore.getCurrentCohort();
    this.setState({ cohort });
  }
  
  render() {
    return (
      <Panel padding={false}>
        {
          (!this.state.error) ? 
            (<span><Loading show={this.state.loading} />
              <iframe onLoad={()=>this.setState({loading: false})} className="replit-iframe" src={process.env.REPLIT_URL+this.props.match.params.replit_slug+'&c='+this.state.cohort.slug} 
                height="100%" width="100%" frameBorder="0" /></span>)
            : (<div class="alert alert-danger">
                {this.state.error}
              </div>)
        }
      </Panel>
    );
  }
}