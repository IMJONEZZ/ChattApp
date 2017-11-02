import React from 'react';

import styles from './MessageList.css';

const Message = props => (
    <div className={styles.Message}>
        <strong>{props.from}  :</strong>
        <span>{props.text}</span>
    </div>
);

const MessageList = props => (
    <div className={styles.MessageList}>
        {
            props.messages.map( (messages, i) => {
                return (
                    <Message 
                        key = {i}
                        from = {messages.from}        
                        text = {messages.text}
                    />    
                );
            })
        }
    </div>
)

export default MessageList;