/**
 * Created by weiguang on 2019/1/14.
 */
import React, {Component} from 'react';
import logo from '../logo.svg';
import '../App.css';
import PropTypes from 'prop-types';

class Home extends Component {

    constructor(props) {
        super(props);
        this.state={
            age : this.props.initAge
        }
    }

    onMakeOlder() {
        this.setState({
           age:this.state.age+3
        })
        console.log(this)
    }

    render() {
        console.log(this.props);
        return (
            <div className="container">
                <div className="raw">
                    <div className="col-xs-1 clo-xs-offset-11">
                        <div>age={this.state.age},your name is {this.props.user.name},your ageis {this.props.user.age} </div>
                        <div>
                            <h4>hobbies</h4>
                            <ul>
                                {this.props.user.hobbies.map((hobby, i) => <li key={i}>{hobby}</li>)}
                            </ul>
                        </div>
                        <button onClick={()=>{this.onMakeOlder()}} className="btn btn-primary"> onMakeOlder </button>
                        <div>
                            {this.props.children}
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}

Home.propTypes = {
    hight: PropTypes.number,
    name: PropTypes.object,
    children: PropTypes.element.isRequired
}

export default Home;
