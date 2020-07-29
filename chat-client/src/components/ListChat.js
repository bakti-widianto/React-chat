import React from 'react';
import ChatItem from './ChatItem';

function ListChat(props) {
    console.log('props list', props.messages)
    const listChat = props.messages.map((message, index) => <ChatItem key={index} index={index} message={message} resend={props.resend} />)
    return (
        <div id="list-chat">
            {listChat}
        </div>
    )
}

export default ListChat;