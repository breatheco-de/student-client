import React from 'react';
import SplitPane from 'react-split-pane';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import {DropLink, Sidebar} from '../components/react-components/src/index';
import {logout} from '../actions/auth';
import {Session} from 'bc-react-session';
import {getCurrentPath} from '../utils/menu.js';

class SplitLayout extends React.Component{

    constructor() {
        super();
        this.state = {
            currentSize: 200,
            maxSize: 200,
            minSize: 100,
            fixed: false,
            collapsed: false,
            dragging: false,
            duration: 0,
            student: null,
            breakPoint: 70,
            onRootLevel: true
        };
    }

    componentDidMount(){
        const session = Session.get();

        const currentPath = getCurrentPath();
        const collapsed = (currentPath.type) ? true : false;
        this.setState({
            student: session.payload,
            collapsed: collapsed,
            currentSize: (collapsed) ? this.state.minSize : this.state.maxSize
        });
       this.props.history.listen((e)=> {
            const currentPath = getCurrentPath();
            const collapsed = (currentPath.type) ? true : false;
            this.setState({
                collapsed: collapsed,
                currentSize: (collapsed) ? this.state.minSize : this.state.maxSize
            });

       });
    }

    onNavBarSelect(option){
        if(typeof(option.size) !== 'undefined' && !this.state.collapsed) this.setState({ currentSize: option.size });
        if(option.slug == this.props.baseLevel.slug) this.setState({ onRootLevel: true });
        else this.setState({ onRootLevel: false });
        if(this.props.onNavBarSelect) this.props.onNavBarSelect(option);
    }

    onSettingsSelect(item){
        switch(item.slug){
            case "logout": logout(this.props.history); break;
            case "profile": this.props.history.push('/profile'); break;
            case "start_tutorial":
                Session.setPayload({ show_tutorial: true });
                this.props.history.push('/');
            break;
            case "hide_tutorial":
                Session.setPayload({ show_tutorial: false });
                this.setState({ student: Object.assign(this.state.student, { show_tutorial: false }) });
            break;
            case "choose": this.props.history.push('/choose'); break;
        }
    }

    render() {
        return (
            <div className="layout">
                <SplitPane split="vertical"
                    className="white-resizer"
                    minSize={this.state.minSize}
                    size={this.state.currentSize}
                >
                    <div style={{ height: "100%", padding: '10px 0px 10px 10px' }}>
                        <Sidebar
                            breadcrumb={this.props.breadcrumb}
                            onSelect={(opt) => this.onNavBarSelect(opt)}
                            selectedOption={this.props.selectedOption}
                            menuItems={this.props.menuItems}
                            collapsed={this.state.collapsed}
                        />
                        {
                            (this.state.onRootLevel) ?
                                (<div className={"settings-item"+((this.state.collapsed)?' collapsed':'')}>
                                    <span style={{maxWidth: "100px"}}>{ (this.state.student && !this.state.collapsed) ? this.state.student.full_name.split(' ').slice(0, -1).join(' ') : ''}</span>
                                    <DropLink direction="up" dropdown={[
                                            {label: 'Profile', slug:'profile'},
                                            {label: 'My Courses', slug:'choose'},
                                            (this.state.student && this.state.student.show_tutorial) ? {label: 'Hide Tutorial', slug:'hide_tutorial'} : {label: 'Start Tutorial', slug:'start_tutorial'},
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
    selectedOption: PropTypes.object,
    onNavBarSelect: PropTypes.func
};
SplitLayout.defaultProps = {
    onNavBarSelect: null,
    selectedOption: null
};
export default withRouter(SplitLayout);
