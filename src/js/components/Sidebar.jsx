import React from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import MainMenu from '../components/MainMenu';
import TimeLine from '../components/TimeLine';
import BreadCrumb from '../components/BreadCrumb';
import TodoView from '../views/TodoView';

import BCStore from '../stores/BCStore';

class Sidebar extends React.Component{
    constructor(){
        super();
        this.data = [
            {slug:"home", label:"BreatheCode", component: MainMenu, size: 200 },
            {slug:"syllabus", label:"Journey", component: TimeLine, size: 370, data: BCStore.getSyllabusDays() },
            {slug:"todo", label:"Todo's", component: TodoView, size: 370 }
        ]
        this.state = {
            levels: [this.data[0]],
            currentOption: this.data[0],
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
                levels: [this.data[0]],
                currentOption: this.data[0]
            });
        } 
    }
    
    componentWillMount(){
        this.checkForCollapse(this.props.history.location.pathname);
        this.props.history.listen((e)=> this.checkForCollapse(e.pathname));
    }
    
    checkForCollapse(pathname){
        console.log("History change: ",pathname);
        if(pathname.indexOf('/lesson/') != -1){
            this.toggle(true);
            return true;
        } 
        else{
            this.toggle(false);
            return false;
        }
    }
    
    getOptionData(slug){
        for(let i=0;i<this.data.length;i++) if(this.data[i].slug == slug) return this.data[i];
        return null;
    }
    
    onMenuSelect(option){
        console.log("Navbar: ",option);
        if(typeof(option) === 'string')
        {
            console.log("Selected: ",option);
            const levels = this.data.filter((level)=>{
                return (level.slug == 'home' || level.slug == option)
            });
            if(option == 'home') this.props.history.push('/home');
            const currentOption = this.getOptionData(option);
            this.setState({ levels, currentOption });
            this.props.onSelect(currentOption);
        }
        else if(typeof(option) === 'object'){
            this.props.history.push('/day/'+option.number);
            
        }
    }
    
    render(){
        const CurrentComponent = this.state.currentOption.component;
        return(
            <div className="navbar">
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
  onToggle: PropTypes.func
}
Sidebar.defaultProps = {
  onToggle: null
};
export default withRouter(Sidebar);