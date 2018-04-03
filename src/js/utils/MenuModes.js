import MainMenu from '../components/menus/MainMenu';
import CourseMenu from '../components/menus/CourseMenu';
import TimeMenu from '../components/menus/TimeLineMenu';
import TodoMenu from '../components/menus/TodoMenu';

export default {
    default: [
        {slug:"home", label:"BreatheCode", component: MainMenu, size: 200 }
    ],
    course: [
        {slug:"course", label:"Course", component: CourseMenu, size: 200 },
        {slug:"syllabus", label:"Journey", component: TimeMenu, size: 370 },
        {slug:"todo", label:"Todo's", component: TodoMenu, size: 370 },
        {slug:"search", label:"Search", component: MainMenu, size: 250 }
    ]
}