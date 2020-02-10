import React, { Component } from 'react';

class UserDetails extends Component {
    render() {
        const { user } = this.props
        return (
            <div id={'user-details'} className={"p-3"} style={{ border: '1px solid lightgrey' }}>
                <h1>My Details</h1><hr />
                <span>Full Name : {user.first_name} {user.last_name}</span>
                <div className={'d-flex justify-content-between'}>
                    <span>Email: {user.email}</span>
                    <span>Phone: {user.phone}</span>
                    <span>Your Status: {user.status}</span>
                </div>
            </div>
        );
    }
}

export default UserDetails;