import React, { Component } from 'react';
import { UserContext,UserContextT} from '@root/user'; 
import { ws } from '@root/ws'; 

interface UsernameInputProps {
    className?: string;
}
interface UsernameInputState {
    username: string;
}

export class UsernameInput extends Component<UsernameInputProps, UsernameInputState> {
    static contextType = UserContext
    context!: UserContextT;


    constructor(props: any) {
        super(props);
        this.state = {
            username: '',
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
    
        // Update the username in the context
        const clientUUID = Array.from(this.context.users.keys())[0];  // Assuming there's only one user
        const clientUser = this.context.users.get(clientUUID);
        if (clientUser) {
            clientUser.update({
                username: this.state.username, 
            });
    
            ws.send(JSON.stringify({
                username: this.state.username,
                alpha: clientUser.alpha,
                beta: clientUser.beta,
                gamma: clientUser.gamma,
                uuid: clientUUID,
            }));
        }
    }
    

    handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({
            username: event.target.value,
        });
    }
    
    // componentDidUpdate(prevProps: UsernameInputProps, prevState: UsernameInputState) {
    //     if (prevState.username !== this.state.username) {
    //         const clientUser = this.context.users.get('client');
    //         if (clientUser) {
    //             ws.send(JSON.stringify({
    //                 type: "username",
    //                 username: this.state.username,
    //                 alpha: clientUser.alpha,
    //                 beta: clientUser.beta,
    //                 gamma: clientUser.gamma,
    //             }));
    //         }
    //     }
    // }
    

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input type="text" value={this.state.username} onChange={this.handleChange} placeholder="Enter your username" />
                <button type="submit">Update Username</button>
            </form>
        );
    }
}
