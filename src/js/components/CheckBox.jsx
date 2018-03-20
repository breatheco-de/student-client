import React from 'react';

class CheckBox extends React.Component{
    
    constructor(){
        super();
        this.state = {
            checked: "checked"
        }
    }
    
    render(){
        
        return(
            <div className="checkbox" onClick={()=>this.props.onClick()}>
                <input type="checkbox" id={this.props.id} checked={this.state.checked} />
                <label for="checkbox">{this.props.label}</label>
            </div>
        )
    }
}
export default CheckBox;