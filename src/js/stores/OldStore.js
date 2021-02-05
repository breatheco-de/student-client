import Flux from '@4geeksacademy/react-flux-dash';
import dayReducers from '../reducers/DayReducers';

class OldStore extends Flux.Store{
    constructor(){
        super();
        this.state = {
            syllabus: null,
            projects: null,
            todos: null,
            days: []
        };
    }

    __reduce(entity){
        return {
            with: (reducers) => {
                let index = 0;
                for(let key in reducers){
                    entity = reducers[key](entity, index);
                    index++;
                }
                return entity;
            }
        };
    }

    _setSyllabus(syllabus){

        let allDays = [];
        let dayNumber = 0;
        if(syllabus.weeks) syllabus.days = syllabus.weeks.map(w => w.days).flat();
        syllabus.days.forEach((day) => {
            if(day){
                dayNumber++;
                day.dayNumber = dayNumber;
                day = this.__reduce(day).with(dayReducers);
                allDays.push(day);
            }
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
            if(this.state.days[i].dayNumber === parseInt(number,10)){
                const day = this.state.days[i];
                return day;
            }
        }

        return null;
    }

    getSyllabusDays(){ return this.state.days; }
    getDayTodos(day){
        const todos = day.lessons.map((l) => {
            return {
                title: l.title,
                task_status: 'PENDING',
                task_type: 'LESSON',
                associated_slug: l.associated_slug
            };
        })
        .concat(day.quizzes.map((q,i) => {
            return {
                title: q.title,
                task_status: 'PENDING',
                task_type: 'QUIZ',
                associated_slug: q.associated_slug
            };
        }))
        .concat(day.exercises.map((r,i) => {
            return {
                title: r.title,
                task_status: 'PENDING',
                task_type: 'EXERCISE',
                associated_slug: r.associated_slug,
                vtutorial_slug: r.vtutorial_slug
            };
        }))
        .concat(day.assignments.map((a,i) => {
            return {
                title: a.title,
                task_status: 'PENDING',
                task_type: 'PROJECT',
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
        }

        return null;
    }

    _setTodos(todos){
        this.setStoreState({ todos }).emit('todos');

        this._reduceSyllabus();
    }
    getTodos(){
        return this.state.todos;
    }

    _updateSingleTodo(task){
        for(let i = 0; i<this.state.todos.length;i++)
            if(this.state.todos[i].id === task.id){
                this.state.todos[i].task_status = task.task_status;
                this.emit('todos');
                this._reduceSyllabus();
                return this.state.todos[i];
            }

        throw new Error(`Task ${task.id} not found`);

        return false;
    }
    _deleteSingleTodo(task){
        const count = this.state.todos.length;
        this.state.todos = this.state.todos.filter(t => t.id === task.id);
        if(this.state.todos.length < count){
            this.emit('todos');
            this._reduceSyllabus();
            return true;
        }

        throw new Error(`Task ${task.id} not found`);
    }
    _appendTodos(newTodos){
        this.setStoreState({
            todos: this.state.todos.concat(newTodos)
        }).emit('todos');

        this._reduceSyllabus();
    }
    getSingleTodo(actionable){

        if(!this.state.todos) return false;

        let present = this.state.todos.find((item) => {
            return (item.task_type === actionable.task_type && item.associated_slug === actionable.associated_slug);
        });
        if(typeof present === 'undefined') return false;
        else return present;
    }
}
export default new OldStore();