import React from 'react';
import fontawesome from '@fortawesome/fontawesome';
import faCheckSquare from '@fortawesome/fontawesome-free-regular/faCheckSquare';
import faSquare from '@fortawesome/fontawesome-free-regular/faSquare';
fontawesome.library.add(faCheckSquare);
fontawesome.library.add(faSquare);

class CheckBox extends React.Component{
    
    constructor(){
        super();
        this.state = {
            checked: false
        }
    }
    
    onClick(){
        this.setState({
            checked: !this.state.checked
        });
    }
    
    render(){
        const notchecked = (this.state.checked) ? "d-none" : "";
        const checked = (!this.state.checked) ? "d-none":"";
        return(
            <div className="checkbox" onClick={()=>this.onClick()}>
                <span className={notchecked}><i className="far fa-check-square"></i></span>
                <span className={checked}><i className="far fa-square"></i></span>
                <label htmlFor="checkbox">{this.props.label}</label>
            </div>
        )
    }
}
export default CheckBox;