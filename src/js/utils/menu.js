import TimeMenu from '../components/menus/TimeLineMenu';
import TodoMenu from '../components/menus/TodoMenu';
import SearchMenu from '../components/menus/SearchMenu';

export const menuModes = {
    home: [
        {slug:"home", label:"BreatheCode" }
    ],
    course: [
        {slug:"course", label:"Course", items: [
            { 
                slug: "syllabus", 
                label: "My Journey", 
                icon: "fas fa-graduation-cap", 
                component: TimeMenu, 
                size: 370 
            },
            { 
                slug: "todos",
                label: "Todo's", 
                icon: "fas fa-check", 
                component: TodoMenu, 
                size: 370 
            },
            { 
                slug: "search",
                label: "Search", 
                icon: "fas fa-search", 
                component: SearchMenu, 
                size: 370 
            }
        ]},
        {slug:"search", label:"Search" }
    ],
    todos: null,
    syllabus: null
};

export const getCurrentPath = () => {
    const pathname = window.location.pathname;
    let fullRegex = /course\/(.+)\/(\d+)\/([l|r|a|q])\/(.+)$/;
    const fullMatch = pathname.match(fullRegex);
    let dayRegex = /course\/(.+)\/(\d+)(.*)$/;
    const dayMatch = pathname.match(dayRegex);
    
    const course = (!dayMatch) ? null:dayMatch[1];
    const day = (!dayMatch) ? null:dayMatch[2];
    const type = (!fullMatch) ? null:fullMatch[3];//l|r|a|q
    const view = (!fullMatch) ? null:fullMatch[4];//l|r|a|q
    
    return { day, type, course, view };
};