import React from 'react';
export default class BreadCrumb extends React.Component{
    
    render(){
        
        const DOMPieces = this.props.levels.map((level,i)=>{
            return (<li key={i} onClick={()=>this.props.onClick(level.slug)}>{level.label}</li>);
        });
        
        return(
            <ul className="breadcrumb">
                {DOMPieces}
            </ul>
        )
    }
}