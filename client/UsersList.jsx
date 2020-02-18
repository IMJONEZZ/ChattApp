import React from 'react';

import styles from './UsersList.css';

const UsersList = props => (
    <div className={styles.Users}>
        <div className={styles.UsersOnline}>
            {props.users.length } people online
        </div>
        <ul className={styles.UsersList}>
            {
                props.users.sort(compareUserName).map((user) => {
                    return (
                        <li key={user.id} className={styles.UserItem}>
                            {user.name} {user.name === props.name ? <small>You</small> : ''}
                        </li>
                    );
                })
            }
        </ul>
    </div>
);

export default UsersList;

function compareUserName(a, b) {
    return a.name.localeCompare(b.name);
}