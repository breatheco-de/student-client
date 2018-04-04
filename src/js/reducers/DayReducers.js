import StudentStore from '../stores/StudentStore';

export function getDay(day){

    day.replits = (function(){
        if(typeof day.replits === 'undefined') return [];
        return day.replits.map(function(repl){
            return {
                title: repl.title,
                associated_slug: repl.associated_slug || repl.slug,
                status: "pending",
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
                status: "pending",
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
                status: "pending",
                type: "assignment"
            }
        });
    })();
    
    day.actionables = day.replits.concat(day.lessons,day.assignments,day.quizzes);
    
    return day;
}

export function withTodos(day){

    day.opened = false;
    day.totalDone = 0;
    
    const todos = StudentStore.getTodos();
    if(!todos) return day;

    day.replits = (function(){
        return day.replits.map(function(repl){
            const todo = StudentStore.getSingleTodo(repl);
            if(todo){
                day.opened = true;
                repl.status = todo.status;
                if(todo.status==='done') day.totalDone++;
            } 
            return repl;
        });
    })();

    day.lessons = (function(){
        return day.lessons.map(function(less){
            const todo = StudentStore.getSingleTodo(less);
            if(todo){
                day.opened = true;
                less.status = todo.status;
                if(todo.status==='done') day.totalDone++;
            } 
            return less;
        });
    })();

    day.quizzes = (function(){
        return day.quizzes.map(function(quiz){
            const todo = StudentStore.getSingleTodo(quiz);
            if(todo){
                day.opened = true;
                quiz.status = todo.status;
                if(todo.status==='done') day.totalDone++;
            } 
            return quiz;
        });
    })();
    
    day.assignments = (function(){
        return day.assignments.map(function(ass){
            const todo = StudentStore.getSingleTodo(ass);
            if(todo){
                day.opened = true;
                ass.status = todo.status;
                if(todo.status==='done') day.totalDone++;
            } 
            return ass;
        });
    })();
    
    day.actionables = day.replits.concat(day.lessons,day.assignments,day.quizzes);
    
    if(day.actionables.length===0) day.completition = 100;
    else day.completition = Math.round((day.totalDone/day.actionables.length)*100);
    
    return day;
}