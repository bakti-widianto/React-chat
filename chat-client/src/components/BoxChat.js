import React, { Component } from 'react';
import axios from 'axios';
import ListChat from './ListChat';
import FormChat from './FormChat'


const request = axios.create({
    baseURL: 'http://localhost:3002/api',
    timeout: 1000,
    headers: {}
});

export default class BoxChat extends Component {
    constructor(props) {
        super(props);
        this.state = { data: [] }


    }

    componentDidMount() {
        // console.log('test')
        this.loadChat()
    }

    loadChat() {
        request.get('/chat')
            .then(function (response) {
                let messages = response.data.data.map(item => ({ ...item, sent: true }))
                this.setState({ data: messages });
                // console.log(messages)
                console.log('BOX', this.state)
            }.bind(this))
            .catch(function (error) {
                alert(error)
            })
    }

    addChat = (data) => {
        const id = Date.now();
        // add chat in Front-end
        this.setState((state, props) => ({
            data: [...state.data, { id: id, name: data.name, message: data.message, sent: true }]

        }))

        //add chat to server
        request.post('/chat', {
            id: id,
            name: data.name,
            message: data.message
        })
            .then(function (response) {

            })
            .catch(function (err) {
                this.setState((state, props) => {
                    return {
                        data: state.data.map(item => {
                            if (item.id === id) {
                                item.sent = false
                                console.log(data)
                            }
                            return item
                        })
                    }
                });
            }.bind(this))


    }

    resendChat = (data) => {

    }

    render() {

        return (
            <div className="container d-flex mx-auto mt-5 col-md-8 col-xl-6 chat">
                <div className="card">
                    <div className="card-header text-center">
                        <div>
                            <h4> React Chat </h4>
                        </div>
                    </div>

                    <div className="card-body msg_card_body">
                        <ListChat messages={this.state.data}></ListChat>
                    </div>
                    <FormChat add={this.addChat} />
                </div>
            </div>
        )
    }
}