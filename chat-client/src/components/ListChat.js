import React from 'react';
import ChatItem from './ChatItem';

function ListChat(props) {
    console.log('props list', props)
    //    const listChat = props.messages.map((message, index) => <ChatItem key={index} message={message} index={index}  />)
    const listChat = props.messages.map((message, index) => <ChatItem key={index} index={index} message={message} />)
    return (
        <div id="list-chat">
            {listChat}
        </div>
    )
}

export default ListChat;