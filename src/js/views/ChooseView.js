import React from "react";
import Flux from "@4geeksacademy/react-flux-dash";
import { List, Panel } from "../components/react-components/src/index";
import { Session } from "bc-react-session";
import { logout } from "../actions/auth";
import { getStreaming } from "../actions/actions";
import BC from "../utils/api";
export default class ChooseView extends Flux.View {
    constructor() {
        super();
        this.state = {
            student: {
                cohorts: [],
                showDoneCohrots: false,
            },
        };
    }

    componentDidMount() {
        let session = Session.get();
        this.setState({ student: session.payload });
        const unsubscribe = Session.onChange((session) => {
            if (typeof unsubscribe == "function") unsubscribe();

            const currentCohort = session.payload
                ? session.payload.currentCohort
                : null;
            if (
                currentCohort &&
                typeof currentCohort !== "undefined" &&
                !Array.isArray(currentCohort)
            ) {
                const slug =
                    currentCohort.cohort.syllabus_version.slug +
                    ".v" +
                    currentCohort.cohort.syllabus_version.version;
                this.props.history.push("/course/" + slug);
            }
        });
        console.log("Cohorts STATE: ", this.state);
    }

    render() {
        let activeCohorts = this.state.student.cohorts.filter((cu) => {
            const showCohort = [
                "PREWORK",
                "STARTED",
                "ACTIVE",
                "FINAL_PROJECT",
            ].includes(cu.cohort.stage);
            const showStudent = ["ACTIVE"].includes(cu.educational_status);
            return showCohort && showStudent;
        });
        let doneCohorts = this.state.student.cohorts.filter((cu) => {
            const showCohort = ["ENDED"].includes(cu.cohort.stage);
            const showStudent = ["GRADUATED"].includes(cu.educational_status);
            return (
                cu.educational_status !== "STUDENT" ||
                (showCohort && showStudent)
            );
        });

        activeCohorts = activeCohorts.map((cu, i) => (
            <li key={i} className="border border-grey">
                <button
                    className="btn btn-light ml-3"
                    onClick={() => {
                        Session.setPayload({ currentCohort: cu });
                        BC.setAcademy(cu.cohort.academy.id);
                    }}
                >
                    <i className="fas fa-external-link-alt"></i> launch this
                    course
                </button>
                <span className="cohort-name">
                    {cu.cohort.syllabus_version.name}
                </span>
                <p className="cohort-description m-0">
                    Cohort: {cu.cohort.name}
                </p>
            </li>
        ));
        doneCohorts = doneCohorts.map((cu, i) => (
            <li key={i}>
                <button
                    className="btn btn-light ml-3"
                    onClick={() => {
                        Session.setPayload({ currentCohort: cu });
                        BC.setAcademy(cu.cohort.academy.id);
                    }}
                >
                    <i className="fas fa-external-link-alt"></i> launch this
                    course
                </button>
                <span className="cohort-name">
                    {cu.cohort.syllabus_version.name}
                </span>
                <p className="cohort-description m-0">
                    Cohort: {cu.cohort.name}
                </p>
            </li>
        ));

        // This console log is used to check the cohorts array for the student.
        // console.log("Cohorts Array:", this.state.student.cohorts)

        return (
            <Panel
                className="choose-view"
                style={{ padding: "10px" }}
                zDepth={1}
            >
                <div className="col-10 col-sm-6 mx-auto pt-5">
                    <h4>
                        You are currently taking part on the following cohorts:
                    </h4>
                    <p>Please choose the course you want to take today:</p>
                    <List className="courses">{activeCohorts}</List>
                    {doneCohorts.length == 0 ? null : !this.state
                          .showDoneCohorts ? (
                        <small className="a">
                            There are {doneCohorts.length} additional cohorts
                            you have already finished,{" "}
                            <a
                                className="text-secondary"
                                href="#"
                                onClick={() =>
                                    this.setState({
                                        ...this.state,
                                        showDoneCohorts: true,
                                    })
                                }
                            >
                                click here to display them
                            </a>
                        </small>
                    ) : (
                        <List className="courses">{doneCohorts}</List>
                    )}
                    <div className="text-center mt-3">
                        <a
                            className="btn btn-secondary"
                            href="#"
                            onClick={() => logout()}
                        >
                            or go ahead and logout
                        </a>
                    </div>
                </div>
            </Panel>
        );
    }
}
