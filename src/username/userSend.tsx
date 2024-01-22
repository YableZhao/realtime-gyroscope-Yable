import React, { Component } from 'react';
import { UserContext, UserContextT } from '@root/user'; 
import { ws } from '@root/ws'; 

interface UserSendProps {
    className?: string;
}

export class UserSend extends Component<UserSendProps> {
    static contextType = UserContext;
    context!: UserContextT;

    constructor(props: any) {
        super(props);
        this.handleSend = this.handleSend.bind(this);
    }

    handleSend() {
        const clientUser = this.context.users.get('client');
        if (clientUser) {
            // Send the user's current data to the server
            // ws.send(JSON.stringify({
            //     username: clientUser.username,
            //     alpha: clientUser.alpha,
            //     beta: clientUser.beta,
            //     gamma: clientUser.gamma,
            // }));
        }
    }

    render() {
        return (
            <button onClick={this.handleSend}>Send</button>
        );
    }
}
