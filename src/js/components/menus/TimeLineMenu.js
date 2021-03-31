import React from 'react';
import TimeLineDay from '../TimeLineDay';
import {withRouter} from 'react-router-dom';

class TimeLineMenu extends React.Component{

    constructor(){
        super();
        this.state = {
            layout: "one-column",
            side: "left",
            selected: null,
            course: "web-development",
        };
        //this.timeline = null;
    }

    componentDidMount(){
        //setInterval(() => this.timeline.scrollTo(0,this.timeline.scrollTop + 5), 100);
        const dayNumber = this.props.match.params.day_number;
        if(typeof dayNumber != 'undefined'){
            this.setState({ selected: dayNumber });
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
        const collapsedClass = (this.props.collapsed) ? 'collapsed':'';

        return (
            <div className={"timeline "+collapsedClass}>
                <span className={"line "+aditionalLineClasses()}></span>
                <ul style={timelineStyles}>
                	{days}
                    <li>&nbsp;</li>
                </ul>
            </div>
        );
    }
}
export default withRouter(TimeLineMenu);