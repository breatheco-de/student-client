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
        
        const menuOptions = this.props.dropdown.map((opt,i) => (<a key={i} className="dropdown-item" onClick={()=>this.props.onSelect(opt)}>{opt.label}</a>));
        return(
            <div className={"dropdown "+this.props.className+((this.state.opened) ? ' show':'')}>
                <a className="btn dropdown-toggle" 
                    data-toggle="dropdown" onClick={(e) => this.onClick(e)}
                >
                    {this.props.children}
                </a>
                {(this.props.dropdown.length>0 && this.state.opened) ?
                (<div className={"dropdown-menu "+this.props.direction+((this.state.opened) ? ' show':'')}
                    onMouseOut={this.onMouseOut.bind(this)} 
                    onMouseOver={()=>this.beingHovered = true}>
                    {menuOptions}
                </div>)
                :''}
            </div>
        );
    }
}
DropLink.propTypes = {
  // You can declare that a prop is a specific JS primitive. By default, these
  // are all optional.
  dropdown: PropTypes.array,
  className: PropTypes.string,
  onSelect: PropTypes.func.isRequired,
  direction: PropTypes.string
}
DropLink.defaultProps = {
  dropdown: [],
  className: '',
  direction: 'down'
};
export default withRouter(DropLink);
