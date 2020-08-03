import React, { Component } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'
import io from 'socket.io-client'
import ListChat from './ListChat';
import FormChat from './FormChat'


var socket = io.connect('http://localhost:3002/')
const request = axios.create({
    baseURL: 'http://localhost:3002/api',
    timeout: 1000,
    headers: {}
});

// const typingTimerLength = 400; //ms


export default class BoxChat extends Component {
    constructor(props) {
        super(props);
        this.state = { data: [] }
    }

    componentDidMount() {
        // console.log('test')
        this.loadChat()

        socket.on('chat', function (data) {
            console.log(data)
            this.setState((state, props) => ({
                data: [...state.data, { ...data, sent: true }]
            }))
        }.bind(this))

        socket.on('delete-chat-frontend', function (id) {
            this.setState((state, props) => ({
                data: state.data.filter(item => {
                    return item.id !== id.id
                })
            }))
        }.bind(this))
    }

    loadChat() {
        request.get('/chat')
            .then(function (response) {
                let messages = response.data.data.map(item => ({ ...item, sent: true }))
                this.setState({ data: messages });
                // console.log(messages)
                // console.log('BOX', this.state)
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

        socket.emit('chats', {
            id: id,
            name: data.name,
            message: data.message
        })

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
                                // console.log(data)
                            }
                            return item
                        })
                    }
                });
            }.bind(this))


    }

    resendChat = (data) => {
        // console.log("resend", data)

        request.post('/chat', {
            id: data.id,
            name: data.name,
            message: data.message
        })
            .then(function (response) {
                this.setState((state, props) => {
                    return {
                        data: state.data.map(item => {
                            if (item.id === data.id) {
                                item.sent = true;
                            }
                            return item
                        })
                    }
                })
            }.bind(this))
            .catch(function (err) {
                console.log(err)
            })
    }

    deleteChat = (id) => {
        // console.log(id)
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this message",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.value) {
                //delete front-end
                this.setState((state, props) => ({
                    data: state.data.filter(item => item.id !== id)
                }))

                socket.emit('delete chat backend', {
                    id
                })

                //delete back-end
                request.delete('/chat/' + id)
                    .then(response => {
                        Swal.fire(
                            'Deleted!',
                            'Your file has been deleted.',
                            'success'
                        )
                    })
                    .catch(error => {
                        Swal.fire({
                            type: 'warning',
                            text: 'connection problem try again later',
                            showConfirmationButton: false,
                            timer: 1200
                        })
                    })
            }
        })
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
                        <ListChat messages={this.state.data} resend={this.resendChat} delete={this.deleteChat} ></ListChat>
                    </div>
                    <FormChat add={this.addChat} />
                </div>
            </div>
        )
    }
}