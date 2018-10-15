import React from 'react';
import validator from 'validator';
import {Notify} from '../components/react-components/src/index';

export default class DeliverAssignment extends React.Component{
    
    constructor(){
        super();
        this.state = {
            github_url: ''
        };
    }
    
    onSend(){
        if(validator.isURL(this.state.github_url)){
            if(typeof this.props.onConfirm == 'function') this.props.onConfirm(this.state.github_url);
        }
        else Notify.error('Please specify a Github URL');
    }
    
    onCancel(){
        if(typeof this.props.onConfirm == 'function') this.props.onConfirm(false);
    }
    
    render(){
        return(
            <div>
                <h5>Please specify your repository github url:</h5>
                <form className="form-inline justify-content-center" onSubmit={(e)=>e.preventDefault()}>
                    <input type="url" style={{width: '400px'}} 
                        className="form-control mr-3"
                        placeholder="https://github.com/..."
                        onChange={(e) => this.setState({ github_url: e.target.value })} />
                    <button className="btn btn-success" type="button"
                        onClick={()=>this.onSend()}
                    >
                        Send
                    </button>
                    <button className="btn btn-light" type="button"
                        onClick={() => this.onCancel()}
                    >
                        Cancel
                    </button>
                </form>
            </div>
        );
    }
}