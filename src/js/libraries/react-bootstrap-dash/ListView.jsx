import React from 'react';

export class ListView extends React.Component{
    
    
    
    render(){

        if(typeof this.props.items == 'undefined') throw "No property items defined for the ListView";
        else if(typeof this.props.items == 'array' && this.props.items.length==0){
            if(this.props.renderEmpty) return this.props.renderEmpty();
            else return (<span>No items</span>);
        }
        
        const Component = this.props.component;
        const dataList = this.props.items.map((data, index) => <Component key={index} data={data} />);
        
        return(
            <div>
                {dataList}
            </div>
        )
    }
}