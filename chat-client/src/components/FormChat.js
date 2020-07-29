import React, { Component } from 'react';
import logo from '../logo.svg';

export default class FormChat extends Component {
    // constructor(props) {
    //     super(props);

    // }




    render() {
        return (
            <div className="card-footer">
                <form>
                    <div className="input-group">

                        <div className="container">
                            <div className="form-group row">
                                <div className="img_cont_msg">
                                    <img src={logo} alt="user" className="rounded-circle user_img_msg" />
                                </div>
                                <div className="col form">
                                    <input className="form-control type_msg" name="name" type="text" placeholder="Type your Name..." />
                                    <input className="form-control type_msg" type="text" name="message" placeholder="Type your message..." />
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