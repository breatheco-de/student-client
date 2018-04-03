export function DayModel(data){

    data.getReplits = function(){
        if(typeof data.replits === 'undefined') return [];
        return data.replits.map(function(repl){
            return {
                label: repl.title,
                slug: repl.slug,
                type: "replit"
            }
        });
    }

    data.getLessons = function(){
        if(typeof data.lessons === 'undefined') return [];
        return data.lessons.map(function(less){
            return {
                label: less.title,
                slug: less.slug,
                type: "lesson"
            }
        });
    }

    data.getQuizzes = function(){
        if(typeof data.quizzes === 'undefined') return [];
        return data.quizzes.map(function(q){
            return {
                label: q.title,
                slug: q.slug,
                type: "quiz"
            }
        });
    }

    return data;
}