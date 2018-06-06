import React from 'react';

export default class DeliverAssignment extends React.Component{
    
    constructor(){
        super();
        this.state = {
            github_url: ''
        };
    }
    
    onSend(){
        if(typeof this.props.onConfirm == 'function') this.props.onConfirm(this.state.github_url);
    }
    
    onCancel(){
        if(typeof this.props.onConfirm == 'function') this.props.onConfirm(false);
    }
    
    render(){
        return(
            <div>
                <h5>Please specify your repository github url:</h5>
                <form class="form-inline justify-content-center" onSubmit={(e)=>e.preventDefault()}>
                    <input type="text" style={{width: '400px'}} 
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