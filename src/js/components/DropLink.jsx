import React from 'react';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
class DropLink extends React.Component{
    
    constructor(){
        super();
        this.state = {
            opened: false
        }
        this.beingHovered = false;
    }
    
    buttonType(){
        switch(this.props.type){
            case "light": return "btn btn-light"; break;
            default:  return "btn btn-light"; break;
        }
    }
    
    onClick(e){
        this.setState({ opened: !this.state.opened });
        e.preventDefault();
        return false;
    }
    
    onMouseOut(){
        this.beingHovered = false;
        if(this.state.opened) setTimeout(() => {
            if(!this.beingHovered) this.setState({ opened: false });
        }, 1000);
    }
    
    render(){
        
        const menuOptions = this.props.dropdown.map((opt,i) => (<li key={i} onClick={()=>this.props.onSelect(opt)}>{opt.label}</li>));
        return(
            <a href="#" onClick={(e) => this.onClick(e)} className={"bclink"}>
                {this.props.children}
                {(this.props.dropdown.length>0 && this.state.opened) ?
                (<ul className="bclink-dropdown" 
                    onMouseOut={this.onMouseOut.bind(this)} 
                    onMouseOver={()=>this.beingHovered = true}>
                    {menuOptions}
                </ul>)
                :''}
            </a>
        )
    }
}
DropLink.propTypes = {
  // You can declare that a prop is a specific JS primitive. By default, these
  // are all optional.
  dropdown: PropTypes.array,
  onSelect: PropTypes.func.isRequired,
}
DropLink.defaultProps = {
  dropdown: []
};
export default withRouter(DropLink);
