import Flux from 'react-flux-dash';
import React from "react";
import Panel from '../components/Panel.jsx';
import ProgressKPI from '../components/ProgressKPI.jsx';
import DayContent from '../components/DayContent.jsx';
import List from '../components/List.jsx';
import ActionableItem from '../components/ActionableItem.jsx';
import BCStore from '../stores/BCStore';

export default class DayView extends Flux.View {
  
  constructor(){
    super();
    this.state = {
      day: null,
      blocked: true,
      lessons: [
        {id: 1, slug:"introduction-to-the-prework", label: "How the internet works", done: true, menu: this.getDropdown()},
        {id: 2, slug:"learn-html", label: "CSS the right way", done: false, menu: this.getDropdown()},
        {id: 3, slug:"learn-css", label: "HTML deeply", done: false, menu: this.getDropdown()}
      ],
      quizzes: [
        {id: 4, slug:"", label: "How the internet works", done: false, menu: this.getDropdown()},
        {id: 5, slug:"", label: "CSS the right way", done: true, menu: this.getDropdown()},
        {id: 6, slug:"", label: "HTML deeply", done: false, menu: this.getDropdown()}
      ],
      replits: [
        {id: 7, slug:"", label: "How the internet works", done: false, menu: this.getDropdown()},
        {id: 8, slug:"", label: "CSS the right way", done: false, menu: this.getDropdown()},
        {id: 9, slug:"", label: "HTML deeply", done: false, menu: this.getDropdown()}
      ]
    }
  }
  
  getDropdown(){
    return [
      {label: 'Go to lesson', slug:'goto'},
      {label: 'Mark as Read/Done', slug:'mark-done'}
    ]
  }
  
  componentWillMount(){
    this.setState({
      day: BCStore.getSingleDay(this.props.match.params.number)
    })
  }
  
  markAsDone(l){
    this.setState({
      lessons: this.state.lessons.map(function(itm){
        if(itm.id == l.id) itm.done = true;
        return itm;
      }),
      quizzes: this.state.quizzes.map(function(itm){
        if(itm.id == l.id) itm.done = true;
        return itm;
      }),
      replits: this.state.replits.map(function(itm){
        if(itm.id == l.id) itm.done = true;
        return itm;
      }),
    });
  }
  
  enableDay(){
    console.log("Enable Day");
    this.setState({blocked: false});
  }
  
  render() {
    const lessonsElms = this.state.lessons.map((l,i) => {
      return <ActionableItem to={"/lesson/"+l.slug} key={i} done={l.done} label={l.label} dropdown={l.menu} onRead={()=>this.markAsDone(l)} />;
    });
    const quizzes = this.state.quizzes.map((l,i) => {
      return <ActionableItem key={i} done={l.done} label={l.label} dropdown={l.menu} onRead={()=>this.markAsDone(l)} />;
    });
    const replits = this.state.replits.map((l,i) => {
      return <ActionableItem key={i} done={l.done} label={l.label} dropdown={l.menu} onRead={()=>this.markAsDone(l)} />;
    });
    
    return (
      <Panel className="dayview">
        <h1>:Day {this.state.day.number} <ProgressKPI percentage={30} /></h1> 
        <p className="description">{this.state.day.description}</p>
        <DayContent onStart={this.enableDay.bind(this)} blocked={this.state.blocked}>
          <div className="row">
            <div className="col-4">
              <h3>Very short reads</h3>
              <List>{lessonsElms}</List>
            </div>
            <div className="col-4">
              <h3>Exercises</h3>
              <List>{replits}</List>
            </div>
            <div className="col-4">
              <h3>Challenges</h3>
              <List>{quizzes}</List>
            </div>
          </div>
          </DayContent>
      </Panel>
    );
  }
}