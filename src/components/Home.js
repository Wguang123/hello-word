/**
 * Created by weiguang on 2019/1/14.
 */
import React, {Component} from 'react';
import logo from '../logo.svg';
import '../App.css';

class Home extends Component {
    render() {
        console.log(this.props);
        return (
            <div className="container">
                <div className="raw">
                    <div className="col-xs-1 clo-xs-offset-11">
                        <div>hight is {this.props.hight},your name is {this.props.user.name},your age
                            is {this.props.user.age} </div>

                        <div>
                            <h4>hobbies</h4>
                            <ul>

                                {this.props.user.hobbies.map((hobby, i) => <li key={i}>{hobby}</li>)}
                            </ul>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}

Home.propTypes = {
    hight: PropTypes.number,
    user: PropTypes.object
}

export default Home;
