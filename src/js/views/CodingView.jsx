import React from 'react';
import brace from 'brace';
import AceEditor from 'react-ace';
import SplitPane from 'react-split-pane';

import 'brace/mode/javascript';
import 'brace/theme/monokai';
import 'brace/keybinding/emacs';

//create your first component
export default class CodingView extends React.Component{
    
    constructor(props) {
        super(props);
        this.state = {
            size: undefined,
            dragging: false,
            duration: 0
        };
        this.handleDragStart = this.handleDragStart.bind(this);
        this.handleDragEnd = this.handleDragEnd.bind(this);
        this.handleDrag = this.handleDrag.bind(this);
    }

    handleDragStart() {
        this.setState({
            dragging: true,
        });
    }

    handleDragEnd() {
        this.setState({
            dragging: false,
        });
        setTimeout(() => {
            this.setState({ size: undefined });
        }, 0);
    }

    handleDrag(width) {
        if (width > 600) this.setState({ size: 600 });
        else if (width < 200) this.setState({ size: 200 });
        else this.setState({ size: undefined });
    }
    
    componentDidMount(){
        setInterval(() => {
            this.setState({
                duration: this.state.duration+1
            })
        },1000);
    }
    
    toCivic(sec_num) {
        var sec_num = parseInt(sec_num); // don't forget the second param
        var hours   = Math.floor(sec_num / 3600);
        var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
        var seconds = sec_num - (hours * 3600) - (minutes * 60);
    
        if (hours   < 10) {hours   = "0"+hours;}
        if (minutes < 10) {minutes = "0"+minutes;}
        if (seconds < 10) {seconds = "0"+seconds;}
        
        if(hours === "00" && minutes ==="00") return seconds + ' sec';
        else if(hours ==="00") return minutes+':'+seconds + ' sec';
        else return hours+':'+minutes+':'+seconds+ ' sec';
    }

    render() {
        return (
            <div className="codeview">
                <SplitPane split="vertical"
                    minSize={400}
                    size={this.state.dragging ? undefined : this.state.size}
                    onChange={this.handleDrag}
                    onDragStarted={this.handleDragStart}
                    onDragFinished={this.handleDragEnd}>
                    <div style={{ height: "100%", padding: '10px' }}>
                        <h2>The FizzBuzz</h2>
                        <p>The "Fizz-Buzz test" is an interview question designed to help filter out the 99.5% of programming job candidates who can't seem to program their way out of a wet paper bag. The text of the programming assignment is as follows:</p>
                        <p>"Write a program that prints the numbers from 1 to 100. But for multiples of three print “Fizz” instead of the number and for the multiples of five print “Buzz”. For numbers which are multiples of both three and five print “FizzBuzz”."</p>
                    </div>
                    <div style={{ height: "100%" }}>
                        <AceEditor
                          mode="javascript"
                          theme="monokai"
                          name="whatever"
                          onChange={(newValue) => this.editorValue = newValue}
                          fontSize={14}
                          height="100vh"
                          width="100%"
                          showPrintMargin={true}
                          showGutter={true}
                          highlightActiveLine={true}
                          value={this.editorValue}
                          setOptions={{
                          enableBasicAutocompletion: true,
                          enableLiveAutocompletion: true,
                          enableSnippets: true,
                          showLineNumbers: true,
                          tabSize: 4,
                          }}/>
                    </div>
                </SplitPane>
                <div className="bottom_toolbar">
                    <span className="timer">{this.toCivic(this.state.duration)}</span>
                    <button className="send btn btn-primary">Send My Answer</button>
                </div>
            </div>
        );
    }
    
}