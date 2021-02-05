import React from 'react';
import PropTypes from 'prop-types';
import './kpi-progress.scss';

class KPIProgress extends React.Component{
    
    render(){
        const progress = isNaN(this.props.progress) ? 0 : this.props.progress;
        return(
            <div className="bcprogress" data-progress={progress}>
                <div className="ko-circle">
                    <div className="full ko-progress-circle__slice">
                        <div className="ko-progress-circle__fill"></div>
                    </div>
                    <div className="ko-progress-circle__slice">
                        <div className="ko-progress-circle__fill"></div>
                        <div className="ko-progress-circle__fill ko-progress-circle__bar"></div>
                    </div>
                </div>
                <div className="ko-progress-circle__overlay">{progress}%</div>
            </div>
        )
    }
}
KPIProgress.propTypes = {
  // You can declare that a prop is a specific JS primitive. By default, these
  // are all optional.
  progress: PropTypes.number.isRequired
}
KPIProgress.defaultProps = {
  progress: 0
};
export default KPIProgress;