import React from 'react';
import {withRouter} from 'react-router-dom';
import {BNavLink} from '../libraries/react-bootstrap-dash/index.js';

class _MainMenu extends React.Component{
    
    componentWillMount(){
        if(typeof this.props.onClick == 'function') this.props.history.listen((evt) => this.props.onClick(evt));
    }
    
    render(){
        return(
            <div className="mainmenu text-white">
                <h2 className="text-center">Alejandro Sanchez</h2>
                <div className="row">
                    <div className="col-sm-12 col-md-9 col-lg-6 mx-auto">
                        <p className="text-center">You are here to become a Full-Stack Web Developer, you have accumulated 0 points during 203 days at the academy!</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-4 col-md-3 col-lg-2 ml-auto">
                        <h5> <span className="text-success">Learn()</span> <span className="text-warning">{'{'}</span> </h5>
                        <div className="nav flex-column nav-pills text-white" aria-orientation="vertical">
                            <BNavLink to='/lessons'>
                                Lessons
                            </BNavLink>
                            <BNavLink to='/assets'>
                                Assets
                            </BNavLink>
                        </div>
                        <h5><span className="text-warning">{'}'}</span></h5>
                    </div>
                    <div className="col-sm-4 col-md-3 col-lg-2">
                        <h5> <span className="text-primary">Code()</span> <span className="text-warning">{'{'}</span> </h5>
                        <div className="nav flex-column nav-pills text-white" aria-orientation="vertical">
                            <BNavLink to='/projects'>
                                Projects
                            </BNavLink>
                            <BNavLink to='/exercises'>
                                Excercises
                            </BNavLink>
                        </div>
                        <h5><span className="text-warning">{'}'}</span></h5>
                    </div>
                    <div className="col-sm-4 col-md-3 col-lg-2 mr-auto">
                        <h5> <span className="text-danger">Achieve()</span> <span className="text-warning">{'{'}</span> </h5>
                        <div className="nav flex-column nav-pills text-white" aria-orientation="vertical">
                            <BNavLink to='/assignments'>
                                Assignments
                            </BNavLink>
                            <BNavLink to='/quizzes'>
                                Quizzes
                            </BNavLink>
                        </div>
                        <h5><span className="text-warning">{'}'}</span></h5>
                    </div>
                </div>
            </div>
        )
    }
}
var MainMenu = withRouter(_MainMenu);
export default MainMenu;