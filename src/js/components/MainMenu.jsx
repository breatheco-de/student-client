import React from 'react';
import {withRouter} from 'react-router-dom';
import MenuItem from '../components/MenuItem';

class _MainMenu extends React.Component{
    
    render(){
        return(
            <div className="main-menu">
                <ul>
                    <MenuItem icon="fas fa-graduation-cap" label="My Journey"
                        onClick={() => this.props.onClick('syllabus')} />
                    <MenuItem icon="fas fa-check" label="Todo's"
                        onClick={() => this.props.onClick('todo')} />
                </ul>
            </div>
        )
    }
}
var MainMenu = withRouter(_MainMenu);
export default MainMenu;