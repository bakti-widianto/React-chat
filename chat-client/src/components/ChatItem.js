import React from 'react';
import logo from '../logo.svg';
import moment from 'moment';
// import ReactMarkdown from 'react-markdown';

function dateConvert(date) {
    if (date === moment().format('YYYY-MM-DD')) {
        return date = 'Today'
    } else if (date === moment().subtract(1, 'days').format('YYYY-MM-DD')) {
        return date = 'Yesterday'
    } else {
        return date = moment(date).format("MMMM Do, YYYY")
    }
}

function ChatItem(props) {
    // console.log(props)
    return (
        <div className={`d-flex mb-4 ${props.index % 2 === 0 ? "justify-content-end" : "justify-content-start"}`}>
            <div className="img_cont_msg">
                <img src={logo} alt="user" className="rounded-circle user_img_msg" />
            </div>
            <div >
                <h6 className="name_cotainer nama">{props.message.name.toUpperCase()}</h6>
                <div className="msg_cotainer">
                    {props.message.message}
                    <span className="msg_time">{dateConvert(props.message.date)} {props.message.time}</span>
                </div>

            </div>
        </div>
    )
}

export default ChatItem;