import React from "react";
import Flux from "@4geeksacademy/react-flux-dash";
import {withRouter} from 'react-router-dom';
import {loadAssets} from '../../actions/ContentActions';
import ContentStore from "../../stores/ContentStore";
import BCStore from "../../stores/BCStore";
import {DropLink } from '../../components/react-components/src/index';

class SearchMenu extends Flux.DashView {
  
  constructor(){
    super();
    this.state = {
      assets: ContentStore.getState('assets'),
      days: BCStore.getSyllabusDays(),
      syllabusContents: [],
      search: ''
    };
  }
  
  componentDidMount(){
    //loadAssets();
    this.subscribe(ContentStore, 'assets', (assets) => this.setState({ assets }));
    let syllabusContents = [];
    this.state.days.forEach((day) => {
      syllabusContents = syllabusContents.concat(day.assignments);
      syllabusContents = syllabusContents.concat(day.lessons);
      syllabusContents = syllabusContents.concat(day.quizzes);
    });
    this.setState({syllabusContents});
  }
  
  onDropdownSelect(actionable, option){
    switch(option.slug){
      case "goto":
        this.props.history.push(this.props.match.url+`/${actionable.type.charAt(0)}/`+actionable.associated_slug);
      break;
      case "vtutorial":
        this.props.history.push(this.props.match.url+`/${actionable.type.charAt(0)}/`+actionable.associated_slug+'/vtutorial/'+option.vtutorial_slug);
      break;
    }
  }
  
  getTaskMenu(td){
    switch(td.type){
      case "lesson": return [{label: 'Read the lesson', slug:'goto'}]; break;
      case "replit": return [{label: 'Practice on Repl.it', slug:'goto'}]; break;
      case "quiz": return [{label: 'Take the quiz', slug:'goto'}]; break;
      case "assignment": return [{label: 'Read the instructions', slug:'goto'}]; break;
    }
  }
  
  render() {
    
    const getLabel = (type) => {
      switch(type){
        case "assignment": return "Code";
        case "lesson": return "Read";
        case "quiz": return "Answer";
        case "repl": return "Practice";
      }
    };
    
    const lessonsHTML = this.state.syllabusContents.filter((l) => {
      if(this.state.search=='') return true;
      return (l.title.toLowerCase().indexOf(this.state.search.toLowerCase()) != -1);
    }).map((l,i)=>(<li className="actionable" key={i}>
      <DropLink className="task-menu" dropdown={this.getTaskMenu(l)} 
          onSelect={(option) => this.onDropdownSelect(l, option)}
          direction="left"
      ></DropLink>
      <p className="actionable-title">{l.title}</p>
      <p className="actionable-details">
        <span className={"type "+l.type}>{getLabel(l.type)}</span> during <span className="day">{l.day.label}</span>
      </p>
    </li>));
    return (
      <div className="search-menu with-padding">
        <p className="search-input">
          <i className="fas fa-search"></i>
          <input type="text" className="form-control" placeholder="Search any lesson, project, etc." onChange={(e) => this.setState({search: e.target.value})}/>
        </p>
        <ul>{lessonsHTML}</ul>
      </div>
    );
  }
}

export default withRouter(SearchMenu);