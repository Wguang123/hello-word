import React, { Component } from 'react';
import logo from '../logo.svg';
import '../App.css';

class Header extends Component {
    render() {
        let content="";
        if(true){
            content="hello word !"
        }

        return (
            <div className="container">
                <div className="raw">
                    <div className="col-xs-1 clo-xs-offset-11">
                        <h1>
                            {content}
                        </h1>
                    </div>
                </div>
            </div>
        );
    }
}


export default Header;
