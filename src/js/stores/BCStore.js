import Flux from '@4geeksacademy/react-flux-dash';
import {DayModel} from '../models';
import StudentStore from './StudentStore';
class BCStore extends Flux.Store{
    constructor(){
        super();
        this.state = {
            syllabus: null,
            days: [],
            olddays: [
                { 
                    number: 1, 
                    description: "Understanding how the internet works and building your first website", 
                    technologies: ['js','php','git'] 
                },
                { 
                    number: 2, 
                    description: "Understanding how the internet works and building your first website", 
                    technologies: ['js','php','git'] 
                },
                { 
                    number: 3, 
                    description: "Understanding how the internet works and building your first website", 
                    technologies: ['js','php','git'] 
                },
                { 
                    number: 4, 
                    description: "Understanding how the internet works and building your first website", 
                    technologies: ['js','php','git'] 
                },
                { 
                    number: 5, 
                    description: "Understanding how the internet works and building your first website", 
                    technologies: ['js','php','git'] 
                },
                { 
                    number: 6, 
                    description: "Understanding how the internet works and building your first website", 
                    technologies: ['js','php','git'] 
                },
                { 
                    number: 7, 
                    description: "Understanding how the internet works and building your first website", 
                    technologies: ['js','php','git'] 
                },
                { 
                    number: 8, 
                    description: "Understanding how the internet works and building your first website", 
                    technologies: ['js','php','git'] 
                },
                { 
                    number: 9, 
                    description: "Understanding how the internet works and building your first website", 
                    technologies: ['js','php','git'] 
                },
                { 
                    number: 10, 
                    description: "Understanding how the internet works and building your first website", 
                    technologies: ['js','php','git'] 
                },
                { 
                    number:11, 
                    description: "Understanding how the internet works and building your first website", 
                    technologies: ['js','php','git'] 
                },
                { 
                    number: 12, 
                    description: "Understanding how the internet works and building your first website", 
                    technologies: ['js','php','git'] 
                },
                { 
                    number: 13, 
                    description: "Understanding how the internet works and building your first website", 
                    technologies: ['js','php','git'] 
                },
            ]
        }
    }
    
    _setSyllabus(syllabus){ 
        
        let allDays = [];
        let dayNumber = 0;
        syllabus.weeks.forEach(function(week){ 
            week.days.forEach(function(day){ 
                dayNumber++;
                day.dayNumber = dayNumber;
                day.lessons = day.lessons || [];
                day.replits = day.replits || [];
                day.quizzes = day.quizzes || [];
                allDays.push(DayModel(day)); 
            });
        });
        this.setStoreState({ syllabus, days: allDays }).emit('syllabus');
    }
    getSyllabus(){ return this.state.syllabus; }
    
    getSingleDay(number){
        for(let i=0;i<this.state.days.length;i++){
            if(this.state.days[i].dayNumber === parseInt(number)){
                const day = StudentStore.dayWithTodosReducer(this.state.days[i]);
                return day;
            }
        }
        
        ;
                
        return null;
    }
    
    getSyllabusDays(){ return this.state.days; }
    
    getDayTodos(day){
        const todos = day.lessons.map((l) => {
            return {
                title: l.title,
                status: 'pending',
                type: 'lesson',
                associated_slug: l.slug
            };
        })
        .concat(day.quizzes.map((q,i) => {
            return {
                title: q.label,
                status: 'pending',
                type: 'quiz',
                associated_slug: q.slug
            };
        }))
        .concat(day.replits.map((r,i) => {
            return {
                title: r.title,
                status: 'pending',
                type: 'replit',
                associated_slug: r.slug
            };
        }));
        
        return todos;
    }
    
}
export default new BCStore();