import React from 'react';
import PropTypes from 'prop-types';
class Modal extends React.Component{
    render(){
        return (
            <div className="bcmodal modal" tabIndex="-1" role="dialog" style={{
                display: (this.props.show) ? 'block':'none'
            }}>
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">{this.props.title}</h5>
                        </div>
                        <div className="modal-body">
                            {this.props.children}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary"
                                onClick={() => this.props.onSave()}
                            >Save changes</button>
                            {
                                (this.props.onCancel) ?
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal"
                                        onClick={() => this.props.onCancel()}
                                    >
                                    Close
                                    </button>
                                : ''
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
Modal.propTypes = {
  // You can declare that a prop is a specific JS primitive. By default, these
  // are all optional.
  show: PropTypes.bool,
  title: PropTypes.string,
  onCancel: PropTypes.func
};
Modal.defaultProps = {
    show: true,
    title: '',
    onCancel: null
};
export default Modal;