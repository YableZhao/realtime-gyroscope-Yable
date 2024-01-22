import { UserContextProvider, UserData, UserContextT } from "@root/user";
import WebSocket from 'isomorphic-ws';
import { ws } from '@root/ws'
import { v4 as uuidv4 } from 'uuid';

interface OverseerContextProps {
    children: React.ReactNode;
}

export class OverseerContextProvider extends UserContextProvider<OverseerContextProps> {
    ws: WebSocket;

    constructor(props: any) {
        super(props);

        this.state = {
            // users: new Map<string, UserData>([
            //     ["overseer", {
            //         username: "overseer",
            //         alpha: 0,
            //         beta: 0,
            //         gamma: 0,
            //         update: this.update.bind(this),
            //     }]
            // ]),
            users: new Map<string, UserData>(),
            timestamp: 0,
        }

    }

    componentDidMount() {
        // Establish the WebSocket connection and set up the message handler
        ws.onopen = () => {
            ws.send(JSON.stringify({message: 'message from client'}));
        };
        ws.onmessage = this.handleMessage.bind(this);
    }

    handleMessage(event: MessageEvent) {
        const userData = JSON.parse(event.data);
    
        // Check if the necessary properties are defined
        if (userData.username && userData.alpha !== undefined && userData.beta !== undefined && userData.gamma !== undefined) {
            // Update the user data if the user already exists, or add a new user
            const existingUser = this.state.users.get(userData.username);
            if (existingUser) {
                this.setState(prevState => ({
                    users: new Map(prevState.users.set(userData.username, {
                        ...existingUser,
                        ...userData,
                    })),
                    timestamp: Date.now(),
                }));
            } else {
                this.setState(prevState => ({
                    users: new Map(prevState.users.set(userData.username, {
                        username: userData.username,
                        alpha: userData.alpha,
                        beta: userData.beta,
                        gamma: userData.gamma,
                        update: this.update.bind(this),
                    })),
                    timestamp: Date.now(),
                }));
            }
        }
    }

    // update(vals: Partial<UserData>) {
    //     const client = this.state.users.get("client");
    //     if (client) {
    //         const updatedClient = {
    //             ...client,
    //             ...vals,
    //         };
    //         this.state.users.set("client", updatedClient);
    //         ws.send(JSON.stringify(updatedClient));
    //     }
    //     this.setState({
    //         timestamp: Date.now(),
    //     });
    // }

    update(vals: Partial<UserData>) {
        // Make sure a username is provided in vals
        if (vals.username) {
            const user = this.state.users.get(vals.username);
            // Only update the user if it exists
            if (user) {
                const updatedUser = {
                    ...user,
                    ...vals,
                };
                this.state.users.set(vals.username, updatedUser);
                ws.send(JSON.stringify(updatedUser));
            }
        }
        this.setState({
            timestamp: Date.now(),
        });
    }
    
    

// }
// interface OverseerContextProps {
//     children: React.ReactNode;
// }

// export class OverseerContextProvider extends UserContextProvider<OverseerContextProps> {
//     ws: WebSocket;

//     constructor(props: any) {
//         super(props);

//         this.state = {
//             users: new Map<string, UserData>(),
//             timestamp: 0,
//         }

//     }

//     componentDidMount() {
//         ws.onopen = () => {
//             ws.send(JSON.stringify({message: 'message from client'}));
//         };
//         ws.onmessage = this.handleMessage.bind(this);
//     }

//     handleMessage(event: MessageEvent) {
//         const userData = JSON.parse(event.data);
    
//         if (userData.uuid && userData.alpha !== undefined && userData.beta !== undefined && userData.gamma !== undefined) {
//             const existingUser = this.state.users.get(userData.uuid);
//             if (existingUser) {
//                 this.setState(prevState => ({
//                     users: new Map(prevState.users.set(userData.uuid, {
//                         ...existingUser,
//                         ...userData,
//                     })),
//                     timestamp: Date.now(),
//                 }));
//             } else {
//                 this.setState(prevState => ({
//                     users: new Map(prevState.users.set(userData.uuid, {
//                         username: userData.username,
//                         alpha: userData.alpha,
//                         beta: userData.beta,
//                         gamma: userData.gamma,
//                         update: this.update.bind(this),
//                     })),
//                     timestamp: Date.now(),
//                 }));
//             }
//         }
//     }


//     update(vals: Partial<UserData>) {
//         if (vals.uuid) {
//             const user = this.state.users.get(vals.uuid);
//             if (user) {
//                 const updatedUser = {
//                     ...user,
//                     ...vals,
//                 };
//                 this.state.users.set(vals.uuid, updatedUser);
//                 ws.send(JSON.stringify(updatedUser));
//             }
//         }
//         this.setState({
//             timestamp: Date.now(),
//         });
//     }

// }