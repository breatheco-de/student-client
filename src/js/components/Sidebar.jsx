import React from 'react';
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
            currentOption: this.data[0]
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
                <h2><BreadCrumb levels={this.state.levels} onClick={this.onMenuSelect.bind(this)} /></h2>
                <CurrentComponent onClick={this.onMenuSelect.bind(this)} data={this.state.currentOption.data} />
            </div>
        )
    }
}
export default withRouter(Sidebar);