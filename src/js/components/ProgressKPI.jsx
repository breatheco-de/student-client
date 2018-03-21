import React from 'react';
class ProgressKPI extends React.Component{
    
    constructor(){
        super();
        this.state = {
            progress: 30
        }
    }
    
    render(){
        
        return(
            <div className="bcprogress" data-progress={this.state.progress}>
                <div className="ko-circle">
                    <div className="full ko-progress-circle__slice">
                        <div className="ko-progress-circle__fill"></div>
                    </div>
                    <div className="ko-progress-circle__slice">
                        <div className="ko-progress-circle__fill"></div>
                        <div className="ko-progress-circle__fill ko-progress-circle__bar"></div>
                    </div>
                </div>
                <div className="ko-progress-circle__overlay">{this.state.progress}%</div>
            </div>
        )
    }
}
export default ProgressKPI;