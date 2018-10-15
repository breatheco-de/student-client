import React from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import BreadCrumb from '../breadcrumb';
import MenuItem from '../menu-item';
import './sidebar.scss';
const Menu = (props) => {
    const htmlItems = props.items.map((item,i) => (<MenuItem key={i}
        icon={item.icon} 
        label={item.label} 
        slug={item.slug} 
        collapsed={props.collapsed}
        onClick={() => props.onClick(item)}
    />));
        
    return (<div className="main-menu">
        <ul>{htmlItems}</ul>
    </div>);
};

const Sidebar = (props) => {
    
    if(!props.selectedOption) return <small>No option recognized</small>;
    
    const collapsedClass = (props.collapsed) ? 'collapsed':'';
    const MenuComponent = (props.selectedOption.component) ? props.selectedOption.component : Menu;
    return(
        <div className={"navbar bc-sidebar "+collapsedClass}>
            <h2>
                <BreadCrumb 
                    levels={props.breadcrumb} 
                    onClick={(option) => props.onSelect(option)}  
                    collapsed={props.collapsed} 
                />
            </h2>
            {(MenuComponent) ?
                <MenuComponent 
                    collapsed={props.collapsed} 
                    onClick={(option) => props.onSelect(option)}  
                    items={(props.selectedOption) ? props.selectedOption.items : null} 
                    data={(props.selectedOption) ? props.selectedOption.data : null} 
                />:''
            }
        </div>
    );
};
Sidebar.propTypes = {
  // You can declare that a prop is a specific JS primitive. By default, these
  // are all optional.
  onSelect: PropTypes.func.isRequired,
  onToggle: PropTypes.func,
  menuItems: PropTypes.array.isRequired
};
Sidebar.defaultProps = {
  onToggle: null
};
export default withRouter(Sidebar);