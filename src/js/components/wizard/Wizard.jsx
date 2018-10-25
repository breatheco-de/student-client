import React from "react";
import PropTypes from "prop-types";
import Joyride from 'react-joyride';
import './_wizard.scss';

const Beacon = (props) => (<div className="beacon" {...props}>
    <span className="beaconOuter" />
    <span className="beaconInner"><i className="fas fa-question"></i></span>
</div>);
const locale = { back: 'Previous', close: 'Close', last: 'Finish', next: 'Next', skip: 'Skip' };
export class Wizard extends React.Component{
    constructor(){
        super();
        this.state = {
            currentStepGroup: 'first',
            runTutorial: false
        };
    }
    componentDidMount(){
        this.setState({ currentStepGroup: this.props.initialStepGroup });
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
            steps={tutorialSteps[this.state.currentStepGroup]}
            run={this.state.runTutorial}
            callback={({ step, type }) => {
                if(type == 'tour:end' && typeof step != 'undefined' && typeof step.nextSteps == 'string') 
                  this.setState({ currentTutorialStep: step.nextSteps });
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
    initialStepGroup: 'first'
};

export const tutorialSteps = {
    first: [
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
                <p>The right side of the screen will always be about navegation, you can look here to open new tutorials, exercises, projects, etc. </p>
                <h3>Click on My Journey to start your course</h3>
            </div>,
            placement: 'right',
            nextSteps: 'second' 
        }
    ],
    second: [
        {
            target: '.main-menu li:first-child',
            content: <div><h3>Click on My Journey to start your course</h3></div>,
            placement: 'right'
        }
    ]
};