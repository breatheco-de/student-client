import React from 'react';
import PropTypes from 'prop-types';
import Button from './Button';
class DayContent extends React.Component{
    
    constructor(){
        super();
        this.state = {
        }
    }
    
    onStart(){
        console.log('a');
        this.props.onStart();
    }
    
    render(){
        
        if(this.props.blocked) return(
            <div className="text-center">
                <div className="panel-toolbar">
                    <Button icon="fas fa-play" label="Start Day"
                        onClick={this.onStart.bind(this)}/>
                    <p className="toolbar-hint">When starting this day, all it's activities will be added into your todo list</p>
                </div>
            </div>
        );
        
        return(<div className="text-center">{this.props.children}</div>)
    }
}
DayContent.propTypes = {
  // You can declare that a prop is a specific JS primitive. By default, these
  // are all optional.
  onStart: PropTypes.func.isRequired,
  blocked: PropTypes.bool.isRequired
}
DayContent.defaultProps = {
  blocked: true
};
export default DayContent;