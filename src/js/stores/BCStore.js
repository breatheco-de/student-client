import Flux from '@4geeksacademy/react-flux-dash';
import StudentStore from './StudentStore';
import {getDay, withTodos} from '../reducers/DayReducers';

class BCStore extends Flux.Store{
    constructor(){
        super();
        this.state = {
            syllabus: null,
            days: []
        }
        StudentStore.on('todos', this._reduceSyllabus.bind(this));
    }
    
    _setSyllabus(syllabus){ 
        
        let allDays = [];
        let dayNumber = 0;
        syllabus.weeks.forEach(function(week){ 
            week.days.forEach(function(day){ 
                dayNumber++;
                day.dayNumber = dayNumber;
                day = withTodos(getDay(day));
                allDays.push(day); 
            });
        });
        this.setStoreState({ syllabus, days: allDays }).emit('syllabus');
    }
    _reduceSyllabus(){ 
        if(this.state.syllabus) this._setSyllabus(this.state.syllabus);
    }
    getSyllabus(){ return this.state.syllabus; }
    
    getSingleDay(number){
        for(let i=0;i<this.state.days.length;i++){
            if(this.state.days[i].dayNumber === parseInt(number)){
                const day = this.state.days[i];
                return day;
            }
        }
        
        ;
                
        return null;
    }
    
    getSyllabusDays(){ return this.state.days; }
    
}
export default new BCStore();