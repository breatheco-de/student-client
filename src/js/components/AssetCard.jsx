import React from 'react';

export default class AssetCard extends React.Component{
    
    onClick(){
        if(typeof this.props.onClick == 'function') this.props.onClick();
    }
    
    render(){
        return(
            <div className="card course-card text-white bg-dark mb-3" style={{maxWidth: "18rem"}} onClick={()=>this.onClick()}>
              <div className="card-header">
                <i className="fas fa-book"></i>
                <span className="time float-right">60 min</span>
              </div>
              <div className="card-body">
                <h5 className="card-title">{this.props.data.title.rendered}</h5>
                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <span className="badge badge-secondary mr-2">HTML</span>
                <span className="badge badge-secondary mr-2">CSS</span>
              </div>
            </div>
        )
    }
}