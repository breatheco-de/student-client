import Flux from 'react-flux-dash';
import React from 'react';
import TimeLineDay from './TimeLineDay.jsx';

export default class TimeLine extends Flux.View{
    
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
           return <TimeLineDay key={i} 
                    number={day.number}
                    description={day.description} 
                    technologies={day.technologies}
                    isSelected={(this.state.selected == day.number)}
                    onClick={()=>{
                        day.course = this.state.course;
                        this.setState({ selected: day.number });
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