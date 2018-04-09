import React from 'react';
import TimeLineDay from '../TimeLineDay.jsx';

export default class TimeLineMenu extends React.Component{
    
    constructor(){
        super();
        this.state = {
            layout: "one-column",
            side: "left",
            selected: null,
            course: "web-development",
        }
    }
    
    render(){
        const timelineStyles = {
           // width: (this.state.layout === "one-column") ? "330px" : "660px"
        };
        const aditionalLineClasses = () => { return this.state.side; }
        const days = this.props.data.map((day, i)=>{
            if(typeof day.dayNumber === 'undefined') throw new Error('Days must have a dayNumber property');
           return <TimeLineDay key={i} 
                    label={day.label}
                    description={day.description} 
                    technologies={day.technologies}
                    isSelected={(this.state.selected == day.dayNumber)}
                    onClick={()=>{
                        day.course = this.state.course;
                        this.setState({ selected: day.dayNumber });
                        this.props.onClick(day);
            }} />
        });
        return (
            <div className="timeline">
                <span className={"line "+aditionalLineClasses()}></span>
                <ul style={timelineStyles}>
                	{days}
                </ul>
            </div>
        );
    }
}