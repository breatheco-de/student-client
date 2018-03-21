import React from 'react';
class Button extends React.Component{
    
    constructor(){
        super();
        this.state = {
            checked: "checked"
        }
    }
    
    buttonType(){
        switch(this.props.type){
            case "light": return "btn btn-light"; break;
            default:  return "btn btn-light"; break;
        }
    }
    
    render(){
        
        return(
            <button className={"bcbutton "+this.buttonType()} onClick={this.props.onClick.bind(this)}>
                <i className={this.props.icon+" btnicon"}></i> {this.props.label}
            </button>
        )
    }
}
export default Button;