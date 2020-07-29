import React, { Component } from 'react';
import logo from '../logo.svg';

export default class FormChat extends Component {
    constructor(props) {
        super(props);

        this.state = { id: null, name: '', message: '' }


    }

    hendleChange = (event) => {
        // console.log(event.target)
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({ message: '', name: '' })
        this.props.add(this.state);

    }



    render() {
        return (
            <div className="card-footer">
                <form onSubmit={this.handleSubmit}>
                    <div className="input-group">

                        <div className="container">
                            <div className="form-group row">
                                <div className="img_cont_msg">
                                    <img src={logo} alt="user" className="rounded-circle user_img_msg" />
                                </div>
                                <div className="col form">
                                    <input className="form-control type_msg" name="name" value={this.state.name} type="text" placeholder="Type your Name..." onChange={this.hendleChange} required />
                                    <input className="form-control type_msg" type="text" value={this.state.message} name="message" placeholder="Type your message..." onChange={this.hendleChange} required />
                                </div>

                                <div className="input-group-append right-form">
                                    <button type="submit" value="Submit" id="submit-button" className="input-group-text send_btn"><i className="fas fa-location-arrow"></i></button>
                                </div>

                            </div>
                        </div>

                    </div>
                </form>
            </div>
        )

    }

}