import Flux from 'react-flux-dash';

class BreatheCodeStore extends Flux.Store{
    constructor(){
        super();
        this.state = {
            syllabus: [],
            days: [
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
        
        let days = [];
        syllabus.weeks.forEach(function(week){ days = days.concat(days,week.days); });
        this.setStoreState({ syllabus, days }).emit('syllabus');
    }
    getSyllabus(){ return this.state.syllabus; }
    
    getSingleDay(number){
        for(let i=0;i<this.state.days.length;i++) if(this.state.days[i].number == number) return this.state.days[i];
        return null;
    }
    
    getSyllabusDays(){ return this.state.days; }
    
}
export default new BreatheCodeStore();