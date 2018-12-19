import OldStore from '../stores/OldStore';

export default {
    getDay(day, index){

    day.replits = (function(){
        if(typeof day.replits === 'undefined') return [];
        return day.replits.map(function(repl){
            
            let menu = [
                { label: 'View it in Repl.it', slug: 'goto'}
            ];
            if(typeof repl.vtutorial_slug !== 'undefined' && repl.vtutorial_slug != '') 
                menu.push({ label: 'Watch video tutorial', slug: 'vtutorial', vtutorial_slug: repl.vtutorial_slug });
            menu.push({ label: 'Mark as done', slug: 'mark-done'});
            
            return {
                menu,
                title: repl.title,
                associated_slug: repl.associated_slug || repl.slug,
                vtutorial_slug: repl.vtutorial_slug,
                status: "pending",
                day: {
                    label: day.label,
                    number: index
                },
                type: "replit"
            };
        });
    })();
    day.lessons = (function(){
        if(typeof day.lessons === 'undefined') return [];
        return day.lessons.map(function(less){
            return {
                title: less.title,
                associated_slug: less.associated_slug || less.slug,
                status: "pending",
                menu: [
                    { label: 'Go to lesson', slug: 'goto'},
                    { label: 'Mark as read', slug: 'mark-done'}
                ],
                day: {
                    label: day.label,
                    number: index
                },
                type: "lesson"
            };
        });
    })();
    day.quizzes = (function(){
        if(typeof day.quizzes === 'undefined') return [];
        return day.quizzes.map(function(q){
            return {
                title: q.title,
                associated_slug: q.associated_slug || q.slug,
                menu: [
                    { label: 'Take quiz', slug: 'goto'},
                    { label: 'Mark as done', slug: 'mark-done'}
                ],
                status: "pending",
                day: {
                    label: day.label,
                    number: index
                },
                type: "quiz"
            };
        });
    })();
    day.assignments = (function(){
        if(typeof day.assignments === 'undefined') return [];
        return day.assignments.map(function(a){
            return {
                title: a.title,
                associated_slug: a.associated_slug || a.slug || a,
                menu: [
                    { label: 'Read instructions', slug: 'goto'},
                    { label: 'Deliver assignment', slug: 'mark-done'}
                ],
                status: "pending",
                day: {
                    label: day.label,
                    number: index
                },
                type: "assignment"
            };
        });
    })();
    
    day.actionables = day.replits.concat(day.lessons,day.assignments,day.quizzes);
    
    if(day.actionables.length > 0) day.opened = true;
    
    return day;
},
    withTodos(day){

    day.opened = false;
    day.totalDone = 0;
    
    const todos = OldStore.getTodos();
    if(!todos) return day;

    day.replits = (function(){
        return day.replits.map(function(repl){
            const todo = OldStore.getSingleTodo(repl);
            if(todo){
                day.opened = true;
                repl.status = todo.status;
                if(todo.status==='done') day.totalDone++;
            } 
            if(day.opened && !todo) repl.status = "unsynced";
            
            return repl;
        });
    })();

    day.lessons = (function(){
        return day.lessons.map(function(less){
            const todo = OldStore.getSingleTodo(less);
            if(todo){
                day.opened = true;
                less.status = todo.status;
                if(todo.status==='done') day.totalDone++;
            } 
            
            if(day.opened && !todo) less.status = "unsynced";
            return less;
        });
    })();

    day.quizzes = (function(){
        return day.quizzes.map(function(quiz){
            const todo = OldStore.getSingleTodo(quiz);
            if(todo){
                day.opened = true;
                quiz.status = todo.status;
                if(todo.status==='done') day.totalDone++;
            } 
            if(day.opened && !todo) quiz.status = "unsynced";
            return quiz;
        });
    })();
    
    day.assignments = (function(){
        return day.assignments.map(function(ass){
            const todo = OldStore.getSingleTodo(ass);
            if(todo){
                day.opened = true;
                ass.status = todo.status;
                if(todo.status==='done') day.totalDone++;
            } 
            if(day.opened && !todo) ass.status = "unsynced";
            return ass;
        });
    })();
    
    day.actionables = day.lessons.concat(day.replits,day.assignments,day.quizzes);
    
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
            if(actionable.type !== 'assignment') return actionable;
            else{
                let project = OldStore.getSingleProject(actionable.associated_slug);
                if(project){
                    actionable.title = project.title;
                    actionable.project = project;
                } 
                
                return actionable;
            }
        });
    
        return day;
    }
};