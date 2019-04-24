import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import './App.css';
import Panel from './left/Panel';
import Main from './Main';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activeDocument: {
                img: '',
                title: ''
            }
        }
    }

    updateState(obj) {
        this.setState({
            activeDocument: {
                img: obj.img,
                title: obj.title
            }
        });
        //console.log(obj);
    }

    render() {
        return (
            <BrowserRouter>
                <div className="main-panel">
                    <div className="App">
                        <Panel document={this.state.activeDocument} updateState={this.updateState.bind(this)}/>

                        <Main document={this.state.activeDocument}/>
                    </div>
                </div>
            </BrowserRouter>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'))