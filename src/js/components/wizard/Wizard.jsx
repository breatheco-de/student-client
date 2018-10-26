import React from "react";
import PropTypes from "prop-types";
import Joyride from 'react-joyride';
import { Session } from 'bc-react-session';
import { Notify } from 'bc-react-notifier';
import BC from '../../utils/api.js';
import './_wizard.scss';

const Beacon = (props) => (<div className="beacon" {...props}>
    <span className="beaconOuter" />
    <span className="beaconInner"><i className="fas fa-question"></i></span>
</div>);
const locale = { back: 'Previous', close: 'Close', last: 'Finish Tutorial', next: 'Next', skip: 'Skip' };
export class Wizard extends React.Component{
    constructor(){
        super();
        this.state = {
            currentStepGroup: '/course/web-development'
        };
    }
    static getDerivedStateFromProps(nextProps, prevState) {
      // do things with nextProps.someProp and prevState.cachedSomeProp
      return {
        currentStepGroup: (typeof prevState.nextStepGroup == 'string') ? 
            prevState.nextStepGroup
            :
            window.location.pathname + window.location.hash,
        nextStepGroup: null
      };
    }
    cancelTour(){
        Session.setPayload({
            show_tutorial: false
        });
        BC.student().update('me', { show_tutorial: false })
            .catch(err => {
                throw Error("Unable to disable tutorial on the database");
            });
    }
    render() {
        return  <Joyride 
            key={this.state.currentStepGroup+"Wizard"}
            continuous={true}
            beaconComponent={Beacon}
            run={this.props.run}
            showSkipButton={true}
            locale={locale}
            styles={{
                options: {
                    overlayColor: 'rgba(79, 26, 0, 0.4)'
                }
            }}
            steps={getSteps(this.state.currentStepGroup)}
            callback={({ action, step, type }) => {
                if(type == 'tour:end' && typeof step != 'undefined' && typeof step.nextSteps == 'string')  this.setState({ nextStepGroup: step.nextSteps });
                else if(type == 'tour:end' && typeof step != 'undefined' && step.lastStep == true) this.cancelTour();
                else if(action == 'skip') this.cancelTour();
            }}
        />;
    }
}
Wizard.propTypes = {
    run: PropTypes.bool,
    initialStepGroup: PropTypes.string
};
Wizard.defaultProps = {
    run: true,
    initialStepGroup: null
};

const getSteps = (url) => {
    if(!url) return [];
    
    for(let pattern in tutorialSteps){
        const regex = new RegExp(pattern);
        const match = url.match(regex);
        if(match) return tutorialSteps[pattern];
    }
    return [];
};

export const tutorialSteps = {
    "\/course\/[^#\/]+$": [
        {
            content: <div>
                <h2>Welcome to 4Geeks!</h2>
                <p>If you are here is because you are interested in learning and improving your coding skills.</p>
                <p>The BreatheCode platform is a group of tools that we have been developing during many years to accelerate your coding education.</p>
            </div>,
            placement: "center",
            disableBeacon: true,
            styles: {
                options: {
                zIndex: 10000
                }
            },
            locale: { skip: "Skip tutorial" },
            target: "body"
        },
        {
            target: '.navbar.bc-sidebar',
            content: <div>
                <p>The right side of the screen will always be about navigation, you can look here to open new tutorials, exercises, projects, etc. </p>
                <h4>Click on <code>My Journey</code> to start the course</h4>
            </div>,
            placement: 'right',
            nextSteps: '/course/web-development#second',
            locale: { last: 'Next phase' }
        }
    ],
    "\/course\/(.*)#second$": [
        {
            target: '.main-menu li:first-child',
            content: <div><h3>Click on My Journey to start your course.</h3></div>,
            placement: 'right',
            locale: { last: 'Next phase' }
        }
    ],
    "\/course\/(.*)#menu=syllabus$": [
        {
            target: '.timeline li:first-child',
            content: <div>
                <h5>The course is divided into several days, each day has a list of TODO's you must complete in chronological order.</h5>
                <h4>Click <code>Day 1</code> on this timeline to begin.</h4>
            </div>,
            placement: 'right',
            disableBeacon: true,
            nextSteps: '/course/web-development#menu=syllabus&second' ,
            locale: { last: 'Next phase' }
        }
    ],
    "\/course\/(.*)#menu=syllabus&second$": [
        {
            target: '.timeline li:first-child',
            content: <div><h3>Click <code>Day 1</code> to begin the first day</h3></div>,
            placement: 'right',
            locale: { last: 'Next phase' }
        }
    ],
    "\/course\/(.*)/1$": [
        {
            target: '.dayview .description',
            content: <h5>Each day starts with a small description that gives you a little bit of context.</h5>,
            placement: 'left',
            disableBeacon: true
        },
        {
            target: '.dayview .bcbutton',
            content: <div>
                <h5>Days are blocked by default, clicking on <code>Start Day</code> will add the activities into your TODO's and enable all the day's content.</h5>
                <h3>Click on <code>Start Day</code> to begin the first day</h3>
            </div>,
            placement: 'left',
            disableBeacon: true,
            nextSteps: '/course/web-development/1#second' ,
            locale: { last: 'Next phase' }
        }
    ],
    "\/course\/(.*)\/1#second$": [
        {
            target: '.dayview .bcbutton',
            content: <div><h3>Click on <code>Start Day</code> to begin the first day</h3></div>,
            placement: 'left',
            locale: { last: 'Next phase' }
        }
    ],
    "\/course\/(.*)\/1#started$": [
        {
            target: '.dayview div.text-center',
            content: <div>
                When a day is enabled, it will show a list with all the TODO's that you have to complete separated in 4 different categories:
                <ul className="text-left">
                    <li><code>Read</code>: Small conceptual reads necesary to understand the exercises.</li>
                    <li><code>Practice</code>: Small micro-targeted exercises with the purpose of addressing particular skills.</li>
                    <li><code>Code</code>: Real life projects to practice your skills.</li>
                    <li><code>Answer</code>: Autograded quizzes ideal for self-assesment</li>
                </ul>
            </div>,
            placement: 'top',
            styles:{
                options:{
                    width: 500
                }
            },
            disableBeacon: true
        },
        {
            target: '.dayview .actionable-item',
            content: <div>Click on each TODO, and you will see a drop-down with the actions related to the activity: Mark as read, watch a video, mark as done, etc.</div>,
            placement: 'left',
            disableBeacon: true
        },
        {
            target: '.dayview .bcprogress',
            content: <div>As you complete the TODO's the day's progress will show at the top.</div>,
            placement: 'left',
            disableBeacon: true
        },
        {
            target: 'body',
            content: <div>
                <h1>You are ready to start learning!</h1>
                <p>Start completing your TODO's and write us an email if you have any questions!</p>
            </div>,
            placement: 'center',
            lastStep: true,
            disableBeacon: true
        }
    ]
};