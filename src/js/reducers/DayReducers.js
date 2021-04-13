import OldStore from '../stores/OldStore';
import {Session} from 'bc-react-session';
export default {
    getDay(day, index){

        const { payload } = Session.get();

        if(Array.isArray(day.replits) && !Array.isArray(day.exercises)) day.exercises = day.replits;
        day.exercises = (function(){
            if(typeof day.exercises === 'undefined') return [];
            return day.exercises.map(function(repl){

                let menu = [
                    {
                        label: 'Open exercises on new window',
                        slug: 'new_window', 
                        url: repl.url ? repl.url+'?' : process.env.API_URL + `/v1/registry/asset/gitpod/${repl.associated_slug || repl.slug}?`,
                        icon: "fas fa-external-link-alt"
                    },
                ];
                menu.push({ label: 'Mark as done', slug: 'mark-done', icon: "fas fa-check"});

                return {
                    menu,
                    title: repl.title,
                    url: repl.url,
                    associated_slug: repl.associated_slug || repl.slug,
                    vtutorial_slug: repl.vtutorial_slug,
                    task_status: "PENDING",
                    day: {
                        label: day.label,
                        number: day.dayNumber
                    },
                    task_type: 'EXERCISE'
                };
            });
        })();
        day.lessons = (function(){
            if(typeof day.lessons === 'undefined') return [];
            return day.lessons.map(function(less){

                let menu = [];
                if(typeof(less.url)==="string" && less.url!="") menu.push({ 
                        label: 'Go to lesson', 
                        slug: 'new_window', url: less.url,
                        icon: "fas fa-arrow-right"
                    })
                else menu.push({ label: 'Go to lesson', slug: 'goto', icon: "fas fa-arrow-right"});
                menu.push({ label: 'Mark as read', slug: 'mark-done', icon: "fas fa-check"});

                return {
                    title: less.title,
                    associated_slug: less.associated_slug || less.slug,
                    task_status: "PENDING",
                    menu,
                    day: {
                        label: day.label,
                        number: day.dayNumber
                    },
                    task_type: "LESSON"
                };
            });
        })();
        day.quizzes = (function(){
            if(typeof day.quizzes === 'undefined') return [];
            return day.quizzes.map(function(q){

                let menu = [];
                if(typeof(q.url)==="string" && q.url!="") menu.push({ 
                        label: 'Take quiz', 
                        slug: 'new_window', url: q.url,
                        icon: "fas fa-arrow-right"
                    })
                else menu.push({ label: 'Take quiz', slug: 'goto', icon: "fas fa-arrow-right"});
                menu.push({ label: 'Mark as done', slug: 'mark-done', icon: "fas fa-check"});

                return {
                    title: q.title,
                    associated_slug: q.associated_slug || q.slug,
                    menu,
                    task_status: "PENDING",
                    day: {
                        label: day.label,
                        number: day.dayNumber
                    },
                    task_type: "QUIZ"
                };
            });
        })();
        day.assignments = (function(){
            if(typeof day.assignments === 'undefined') return [];
            return day.assignments.map(function(a){

                let menu = [];
                if(typeof(a.url)==="string" && a.url!="") menu.push({ 
                        label: 'Read instructions', 
                        slug: 'new_window', url: a.url,
                        icon: "fas fa-arrow-right"
                    })
                else menu.push({ label: 'Read instructions', slug: 'goto', icon: "fas fa-arrow-right"});
                menu.push({ label: 'Deliver assignment', slug: 'mark-done', icon: "fas fa-check"});
                
                return {
                    title: a.title,
                    associated_slug: a.associated_slug || a.slug || a,
                    menu,
                    task_status: "PENDING",
                    day: {
                        label: day.label,
                        number: day.dayNumber
                    },
                    task_type: 'PROJECT'
                };
            });
        })();

        day.actionables = day.exercises.concat(day.lessons,day.assignments,day.quizzes);

        if(day.actionables.length > 0) day.opened = true;

        return day;
    },
    withTodos(day){

        day.opened = false;
        day.totalDone = 0;

        const todos = OldStore.getTodos();
        if(!todos) return day;

        if(Array.isArray(day.replits) && !Array.isArray(day.exercises)) day.exercises = day.replits;
        day.exercises = (function(){
            return day.exercises.map(function(repl){
                const todo = OldStore.getSingleTodo(repl);
                if(todo){
                    day.opened = true;
                    repl.task_status = todo.task_status;
                    if(todo.task_status==='DONE') day.totalDone++;
                }
                if(!todo) repl.task_status = "unsynced";

                return repl;
            });
        })();

        day.lessons = (function(){
            return day.lessons.map(function(less){
                const todo = OldStore.getSingleTodo(less);
                if(todo){
                    day.opened = true;
                    less.task_status = todo.task_status;
                    less.menu = less.menu.map(menuItem => {
                        if(menuItem.slug == 'mark-done'){
                            if(todo.task_status == 'DONE') return ({ label: 'Mark as NOT read', slug: 'mark-done', icon: "fas fa-times"});
                            else return ({ label: 'Mark as read', slug: 'mark-done', icon: "fas fa-check"});
                        }
                        return menuItem;
                    });
                    if(todo.task_status==='DONE') day.totalDone++;
                }

                if(!todo) less.task_status = "unsynced";
                return less;
            });
        })();

        day.quizzes = (function(){
            return day.quizzes.map(function(quiz){
                const todo = OldStore.getSingleTodo(quiz);
                if(todo){
                    day.opened = true;
                    quiz.task_status = todo.task_status;
                    if(todo.task_status==='DONE') day.totalDone++;
                }
                if(!todo) quiz.task_status = "unsynced";
                return quiz;
            });
        })();

        day.assignments = (function(){
            return day.assignments.map(function(ass){
                const todo = OldStore.getSingleTodo(ass);
                if(todo){
                    day.opened = true;
                    ass.task_status = todo.task_status;
                    ass.revision_status = todo.revision_status;
                    ass.description = todo.description;
                    if(todo.task_status==='DONE') day.totalDone++;
                }
                if(!todo) ass.task_status = "unsynced";
                return ass;
            });
        })();

        day.actionables = day.lessons.concat(day.exercises,day.assignments,day.quizzes);

        if(day.actionables.length===0){
            day.completition = 100;
            day.opened = true;
        }
        else day.completition = Math.round((day.totalDone/day.actionables.length)*100);

        return day;
    },
    withProjects(day){

        const projects = OldStore.getProjects();
        if(!projects) return day;

        day.actionables.map((actionable)=>{
            if(actionable.task_type !== 'PROJECT') return actionable;
            else{
                let project = OldStore.getSingleProject(actionable.associated_slug);
                if(project){
                    actionable.title = project.title;
                    actionable.project = project;
                }
                actionable.menu = actionable.menu.map(mItem => {
                    if(mItem.slug !== 'mark-done') return mItem;
                    return actionable.task_status === 'PENDING' ?
                        ({ label: 'Deliver assignment', slug: 'mark-done', icon: "fas fa-check"})
                        :
                        ({ label: 'Undo assignment delivery', slug: 'mark-done', icon: "fas fa-times"});
                });

                return actionable;
            }
        });

        return day;
    }
};