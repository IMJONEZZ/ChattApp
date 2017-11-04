import React, { Component } from 'react';
import io from "socket.io-client";

import styles from './App.css';

import MessageForm from './MessageForm.jsx';
import MessageList from './MessageList.jsx';
import UsersList from "./UsersList.jsx";
import UserForm from './UserForm.jsx'

const socket = io('/');

class App extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            users: [],
            messages: [],
            text: '',
            name: ''
        };
        this.onDisconnectStatus = '';
    }

    componentDidMount() {
        socket.on('message', message => this.messageReceive(message));
        socket.on('update', ({users}) => this.chatUpdate(users));
        socket.on('disconnect', () => { 
            this.onDisconnectStatus = 'Lost connection. Please log in again!';
            this.setState({
                users: [],
                messages: [],
                text: '',
                name: ''
            });
        })
    }

    messageReceive(message) {
        const messages = [...this.state.messages, message];
        this.setState({messages})
    }

    chatUpdate(users) {
        this.setState({users});
    }

    handleUserSubmit(name) {
        if(name) {
            this.setState({name});
            socket.emit('join', name);
        }
    }

    handleMessageSubmit(message) {
        if (message.text) {
            const messages = [...this.state.messages, message];
            this.setState({messages});
            socket.emit('message', message);
        }
    }

    render() {
        return this.state.name !== '' ? this.renderLayout() : this.renderUserForm();
    }

    renderLayout() {
        return (
            <div className={styles.App}>
                <div className={styles.AppHeader}>
                    <div className={styles.AppTitle}>
                        ChatApp
                    </div>
                    <div className={styles.AppRoom}>
                        App room
                    </div>
                </div>
                <div className={styles.AppBody}>
                    <UsersList
                        users={this.state.users}
                        name = {this.state.name}
                    />
                    <div className={styles.MessageWrapper}>
                        <MessageList
                            messages={this.state.messages}
                            name = {this.state.name}
                            last = {this.state.messages[this.state.messages.length-2]}
                        />
                        <MessageForm
                            onMessageSubmit={message => this.handleMessageSubmit(message)}
                            name={this.state.name}
                        />
                    </div>
                </div>
            </div>
        );
    }

    renderUserForm() {
        return (
            <UserForm 
                onUserSubmit = { name => this.handleUserSubmit(name)} 
                onDisconnect = { this.onDisconnectStatus}  
            />
        );
    }
};

export default App;