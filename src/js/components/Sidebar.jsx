import React from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import BreadCrumb from '../components/BreadCrumb';

class Sidebar extends React.Component{
    constructor(){
        super();
        this.state = {
            levels: [],
            currentOption: null,
            collapsed: false
        }
    }
    
    toggle(newCollapsedState){
        if(this.state.collapsed && !newCollapsedState){
            this.props.onToggle({ collapsed: false });
            this.setState({ collapsed: false });
        } 
        else if(!this.state.collapsed && newCollapsedState){
            this.props.onToggle({ collapsed: true });
            this.setState({    
                collapsed: true,
                levels: [this.props.menuItems[0]],
                currentOption: this.props.menuItems[0]
            });
        } 
    }
    
    componentWillMount(){
        this.setState({    
            collapsed: false,
            levels: [this.props.menuItems[0]],
            currentOption: this.props.menuItems[0]
        });
        this.checkForCollapse(this.props.history.location.pathname);
        this.props.history.listen((e)=> this.checkForCollapse(e.pathname));
    }
    
    checkForCollapse(pathname){
        let courseRegex = /course\/(.*)\/(\d*)\/[l|r|a|q]\/(.*)$/;
        const match = pathname.match(courseRegex);
        if(match){
            this.toggle(true);
            return true;
        } 
        else{
            this.toggle(false);
            return false;
        }
    }
    
    getMenuOption(slug){
        for(let i=0;i<this.props.menuItems.length;i++) if(this.props.menuItems[i].slug == slug) return this.props.menuItems[i];
        return null;
    }
    
    onMenuSelect(option){
        if(typeof(option) === 'string')
        {
            if(option == this.props.baseLevel.slug){
                const levels = [this.props.baseLevel];
                this.setState({ levels, currentOption: this.props.baseLevel });
                this.props.onSelect(this.props.baseLevel);
                this.props.history.push(this.props.baseLevel.path);
            } 
            else
            {
                const levels = this.props.menuItems.filter((level)=>{
                    return (level.slug == this.props.baseLevel.slug || level.slug == option)
                });
                const currentOption = this.getMenuOption(option);
                this.setState({ levels, currentOption });
                this.props.onSelect(currentOption);
            }
        }
        else if(typeof(option) === 'object'){
            this.props.onSelect(option);
        }
    }
    
    render(){
        const CurrentComponent = this.state.currentOption.component;
        return(
            <div className="navbar main-menu">
                <h2><BreadCrumb levels={this.state.levels} onClick={this.onMenuSelect.bind(this)}  mobile={this.state.collapsed} /></h2>
                <CurrentComponent mobile={this.state.collapsed} onClick={this.onMenuSelect.bind(this)} data={this.state.currentOption.data} />
            </div>
        )
    }
}
Sidebar.propTypes = {
  // You can declare that a prop is a specific JS primitive. By default, these
  // are all optional.
  onSelect: PropTypes.func.isRequired,
  onToggle: PropTypes.func,
  menuItems: PropTypes.array.isRequired
}
Sidebar.defaultProps = {
  onToggle: null
};
export default withRouter(Sidebar);