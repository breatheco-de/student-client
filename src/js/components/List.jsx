import React from 'react';

class List extends React.Component{
    
    render(){
        return(
            <ul className="bclist">
                {this.props.children}
            </ul>
        )
    }
}
export default List;