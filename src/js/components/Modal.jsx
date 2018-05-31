import React from 'react';
import PropTypes from 'prop-types';

class Modal extends React.Component{
    constructor(){
        super();
        this.state = {
            opened: false  
        };
    }
    
    componentDidMount(){
        this.setState({
            opened: this.props.show
        });
    }

    render(){
        return (
        <div className="modal bc-modal" tabIndex="-1" role="dialog" style={{display: (this.state.opened) ? 'inline-block' : 'none'}}>
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        { (this.props.title != '') ?
                            <h5 className="modal-title">Modal title</h5>
                            : ''
                        }
                        { (this.props.allowClose) ?
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close"
                                onClose={() => this.setState({ opened: false })}
                            >
                                <span aria-hidden="true">&times;</span>
                            </button> 
                            :''
                        }
                    </div>
                    <div className="modal-body">
                        {this.props.children}
                    </div>
                    <div className="modal-footer">
                        { (this.props.confirmLabel != '') ?
                            <button type="button" className="btn btn-primary"
                                onConfirm={() => this.props.onConfirm()}
                            >{this.props.confirmLabel}</button>
                            : ''
                        }
                        { (this.props.cancelLabel != '') ?
                            <button type="button" className="btn btn-secondary" data-dismiss="modal"
                                onConfirm={() => this.props.onCancel()}
                            >{this.props.cancelLabel}</button>
                            : ''
                        }
                    </div>
                </div>
            </div>
        </div>
        );
    }
}
Modal.propTypes = {
  // You can declare that a prop is a specific JS primitive. By default, these
  // are all optional.
  title: PropTypes.string,
  confirmLabel: PropTypes.string,
  cancelLabel: PropTypes.string,
  allowClose: PropTypes.bool,
  className: PropTypes.string
};
Modal.defaultProps = {
  title: '',
  className: '',
  confirmLabel: '',
  allowClose: false,
  cancelLabel: ''
};
export default Modal;