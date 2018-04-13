import React from 'react';
import SplitPane from 'react-split-pane';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import Sidebar from './Sidebar';
import DropLink from '../components/DropLink';
import StudentActions from '../actions/StudentActions';
import StudentStore from '../stores/StudentStore';

class SplitLayout extends React.Component{
    
    constructor() {
        super();
        this.state = {
            size: 200,
            collapsed: false,
            dragging: false,
            duration: 0,
            student: null,
            onRootLevel: true
        };
        this.fixedWidth = false;
    }
    
    componentWillMount(){
        this.setState({
           student: StudentStore.getStudent() 
        });
    }
    
    onSidebarToggle(state){
        if(state.collapsed){
            this.fixedWidth = 50;
            this.setState({ size: 50, collapsed: true });
        }
        else{
            this.fixedWidth = null;
            this.setState({ size: 200, collapsed: false });
        }
    }
    
    handleKeyShorcut(){
        console.log('on the child!');
    }

    handleDragStart() {
        if(!this.fixedWidth) this.setState({ dragging: true });
        else this.setState({ size: this.fixedWidth });
    }

    handleDragEnd() {
        if(!this.fixedWidth){
            this.setState({ dragging: false });
            setTimeout(() => {
                this.setState({ size: undefined });
            }, 0);
        }
        else this.setState({ size: this.fixedWidth });
    }

    handleDrag(width) {
        if(!this.fixedWidth)
        {
            if (width > 400) this.setState({ size: 400 });
            else if (width < 100) this.setState({ size: 100 });
            else this.setState({ size: undefined });
        }
        else this.setState({ size: this.fixedWidth });
    }
    
    onNavBarSelect(option){
        if(typeof(option.size) !== 'undefined') this.setState({ size: option.size });
        if(option.slug == this.props.baseLevel.slug) this.setState({ onRootLevel: true });
        else this.setState({ onRootLevel: false });
        if(this.props.onNavBarSelect) this.props.onNavBarSelect(option);
    }
    
    onSettingsSelect(item){
        switch(item.slug){
            case "logout": StudentActions.logoutUser(); break;
            case "profile": this.props.history.push('/profile'); break;
        }
    }
    
    render() {
        return (
            <div className="layout">
                <SplitPane split="vertical"
                    className="white-resizer"
                    minSize={50}
                    size={this.state.dragging ? undefined : this.state.size}
                    onChange={this.handleDrag.bind(this)}
                    onDragStarted={this.handleDragStart.bind(this)}
                    onDragFinished={this.handleDragEnd.bind(this)}>
                    <div style={{ height: "100%", padding: '10px 0px 10px 10px' }}>
                        <Sidebar 
                            onSelect={this.onNavBarSelect.bind(this)} 
                            onToggle={this.onSidebarToggle.bind(this)} 
                            menuItems={this.props.menuItems}
                            baseLevel={this.props.baseLevel}
                        />
                        {   
                            (this.state.onRootLevel) ? 
                                (<div className="settings-item">
                                    { (this.state.student && !this.state.collapsed) ? this.state.student.full_name : ''}
                                    <DropLink direction="up" dropdown={[
                                            {label: 'Profile', slug:'profile'},
                                            {label: 'Logout', slug:'logout'}
                                        ]} 
                                        onSelect={this.onSettingsSelect.bind(this)}>
                                        <i className="fas fa-cog"></i>
                                    </DropLink>
                                </div>)
                                :''
                        }
                    </div>
                    <div className="app-view" style={{marginLeft: "-5px"}}>
                        {this.props.children}
                    </div>
                </SplitPane>
            </div>
        );
    }
    
}
SplitLayout.propTypes = {
    // the initial with of the sizebar
    //sidebar menu items
    menuItems: PropTypes.array.isRequired,
    onNavBarSelect: PropTypes.func
}
SplitLayout.defaultProps = {
    onNavBarSelect: null
};
export default withRouter(SplitLayout);