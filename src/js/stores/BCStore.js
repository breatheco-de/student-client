import Flux from '@4geeksacademy/react-flux-dash';
import StudentStore from './StudentStore';
import dayReducers from '../reducers/DayReducers';

class BCStore extends Flux.Store{
    constructor(){
        super();
        this.state = {
            syllabus: null,
            projects: null,
            days: []
        }
        StudentStore.on('todos', this._reduceSyllabus.bind(this));
    }
    __reduce(entity){
        return {
            with: (reducers) => {
                for(let key in reducers) entity = reducers[key](entity);
                return entity;
            }
        };
    }
    
    _setSyllabus(syllabus){ 
        
        let allDays = [];
        let dayNumber = 0;
        syllabus.weeks.forEach((week) => { 
            week.days.forEach((day) => { 
                if(day){
                    dayNumber++;
                    day.dayNumber = dayNumber;
                    day = this.__reduce(day).with(dayReducers);
                    allDays.push(day); 
                }
            });
        });
        this.setStoreState({ syllabus, days: allDays }).emit('syllabus');
    }
    _reduceSyllabus(){ 
        if(this.state.syllabus) 
            this._setSyllabus(this.state.syllabus);
    }
    getSyllabus(){ return this.state.syllabus; }
    
    getSingleDay(number){
        for(let i=0;i<this.state.days.length;i++){
            if(this.state.days[i].dayNumber === parseInt(number)){
                const day = this.state.days[i];
                return day;
            }
        };
                
        return null;
    }
    
    getSyllabusDays(){ return this.state.days; }
    getDayTodos(day){
        const todos = day.lessons.map((l) => {
            return {
                title: l.title,
                status: 'pending',
                type: 'lesson',
                associated_slug: l.associated_slug
            };
        })
        .concat(day.quizzes.map((q,i) => {
            return {
                title: q.title,
                status: 'pending',
                type: 'quiz',
                associated_slug: q.associated_slug
            };
        }))
        .concat(day.replits.map((r,i) => {
            return {
                title: r.title,
                status: 'pending',
                type: 'replit',
                associated_slug: r.associated_slug
            };
        }))
        .concat(day.assignments.map((a,i) => {
            return {
                title: a.title,
                status: 'pending',
                type: 'assignment',
                associated_slug: a.associated_slug
            };
        }));
        
        return todos;
    }
    
    _setProjects(projects){ 
        this.setStoreState({ projects }).emit('projects');
        this._reduceSyllabus();
    }
    getProjects(){ return this.state.projects; }
    getSingleProject(slug){
        for(let i=0;i<this.state.projects.length;i++){
            if(this.state.projects[i].slug === slug){
                const project = this.state.projects[i];
                return project;
            }
        };
                
        return null;
    }
}
export default new BCStore();