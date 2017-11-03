import React, { Component } from 'react';
import io from "socket.io-client";

import styles from './UserForm.css';
const socket = io('/');

class UserForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            info: ' '
        };
    }

    componentWillMount () {
        socket.emit('getUsers');
    }

    componentDidMount() {
        socket.on('update', ({users}) => this.users = users );
    }

    handleSubmit(e) {
        e.preventDefault();
        const isUserNameExist = this.users.filter( (element) => element.name === this.state.name).length;
        if(!isUserNameExist) {
            this.props.onUserSubmit(this.state.name);
        } else {
            this.setState({info: 'Name already exist'}); 
        }
    }

    handleChange(e) {
        const isUserNameExist = this.users.filter( (element) => element.name === e.target.value).length;
        if (isUserNameExist) {
            this.setState({info: 'Name already exist'});
        } else {
            this.setState({info: ' '});
        }
        this.setState({
            name: e.target.value
        });
    }

    render() {
        return(
            <form className = {styles.UserForm} onSubmit={ e => this.handleSubmit(e)}>
                <input 
                    className = {styles.UserInput}
                    placeholder = {'Write your nickname and press enter'}
                    onChange = { e => this.handleChange(e)}
                    value = {this.state.name}
                />
                <p> {this.state.info} </p>
            </form>
        );
    }
}

export default UserForm;