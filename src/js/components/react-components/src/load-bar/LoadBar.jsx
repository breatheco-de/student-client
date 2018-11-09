import React from 'react';
import PropTypes from 'prop-types';
import './load-bar.scss';
import EventEmitter from 'events';
import { Dispatcher } from 'flux';
const dispatcher = new Dispatcher();
const NOTIFICATIONS_EVENT = "bc-react-loader";

export const setLoading = (status) =>{
    dispatcher.dispatch(status);
};

export default class LoadBar extends React.Component{
    constructor(){
        super();
        this.state = {
            loading: false
        };
        this.setStatus = (loading) => this.setState({ loading });
    }
    componentDidMount(){
        store.on(NOTIFICATIONS_EVENT, this.setStatus);
    }
    
    componentWillUnmount(){
        store.removeListener(NOTIFICATIONS_EVENT, this.setStatus);
    }
    render(){
        if(!this.state.loading) return null;
        if(this.props.render) return this.props.render(this.state);
        if(this.props.component){
            const Comp = this.props.component;
            return (<Comp {...this.state} />);
        }
        return (<div className="load-bar">&nbsp;</div>);
    }
}
LoadBar.propTypes = {
  render: PropTypes.func,
  component: PropTypes.node
};
LoadBar.defaultProps = {
   render: null,
   component: null
};


/**
 *      Store
 **/
class NotificationStore extends EventEmitter{
    constructor(){
        super();
        this.loading = false;
        dispatcher.register((status) => {
            this.loading = (status == "loading" || status === true);
            this.emit(NOTIFICATIONS_EVENT, this.loading);
        });
    }
    
    isLoading(){
        return this.loading;
    }
}
const store = new NotificationStore();