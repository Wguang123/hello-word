import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/Header'
import Home from './components/Home'

class App extends Component {
    render() {

        const user={
            name:"weiguang",
            age:12,
            hobbies:["sports","reading"]
        };
        return (
            <div className="container">
                <div className="raw">
                    <div className="col-xs-1 clo-xs-offset-11">
                        <Header> Header</Header>
                    </div>
                </div>

                <div className="raw">
                    <div className="col-xs-1 clo-xs-offset-11">
                    </div>
                </div>

                <div className="raw">
                    <div className="col-xs-1 clo-xs-offset-11">
                        <Home initAge={28} cm  user={user}>
                            <p> I am child </p>
                        </Home>
                    </div>
                </div>
            </div>
        );
    }
}


export default App;
