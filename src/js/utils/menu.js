import React from 'react';
import TimeLineMenu from '../components/menus/TimeLineMenu';
import TodoMenu from '../components/menus/TodoMenu';
import SearchMenu from '../components/menus/SearchMenu';
import IFrameView from '../views/panel/IFrameView';

export const getCurrentPath = (pathname=null, hash=null) => {
    if(!pathname) pathname = window.location.pathname;
    if(!hash) hash = window.location.hash;
    let fullRegex = /course\/(.+)\/(\d+)\/([l|r|a|q])\/(.+)$/;
    const fullMatch = pathname.match(fullRegex);
    let dayRegex = /course\/(.+)\/(\d+)(.*)$/;
    const dayMatch = pathname.match(dayRegex);
    let menuRegex = /menu=(.+)$/;
    const menuMatch = hash.match(menuRegex);

    const menu = (!menuMatch) ? null:menuMatch[1];
    const course = (!dayMatch) ? null:dayMatch[1];
    const day = (!dayMatch) ? null:dayMatch[2];
    const type = (!fullMatch) ? null:fullMatch[3];//l|r|a|q
    const view = (!fullMatch) ? null:fullMatch[4];//l|r|a|q

    return { day, type, course, view, pathname, hash, menu };
};
export const menuModes = {
    home: [
        {slug:"home", label:"BreatheCode" }
    ],
    course: [
        {
            slug:"course", label:"Course", items:
            [
                {
                    slug: "syllabus",
                    label: "My Journey",
                    icon: "fas fa-graduation-cap",
                    component: TimeLineMenu,
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
                },
                {
                    slug: "start-project",
                    label: "Start new project",
                    icon: "fas fa-code",
                    url: () => (getCurrentPath()).pathname.replace("/new-project","").replace("/appointments","")+"/new-project",
                    size: 370
                },
                {
                    slug: "make-appointment",
                    label: "Appointments",
                    icon: "fas fa-calendar-alt",
                    component: () => <IFrameView src={`https://4geeks.setmore.com`} style={{ width: "100%", marginLeft: "-1px" }} />,
                    size: 370
                }
            ]
        },
        {
            slug:"search", label:"Search" }
    ],
    todos: null,
    syllabus: null
};