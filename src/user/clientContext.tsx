import { UserContextProvider, UserData } from "./userContext";
import { v4 as uuidv4 } from 'uuid';

// interface ClientContextProps {
//     children: React.ReactNode;
// }

// /**
//  * This is a local user which is controlled by the client.
//  * It should be controlled by local input, not the network.
//  */
// export class ClientContextProvider extends UserContextProvider<ClientContextProps> {
//     constructor(props: any) {
//         super(props);

//         this.state = {
//             users: new Map<string, UserData>([
//                 ["client", {
//                     username: "defaultClient",
//                     alpha: 0,
//                     beta: 0,
//                     gamma: 0,
//                     update: this.update.bind(this),
//                 }]
//             ]),
//             timestamp: 0,
//         }
//     }

//     update(vals: Partial<UserData>) {
//         const client = this.state.users.get("client");
//         if (client) {
//             this.state.users.set("client", {
//                 ...client,
//                 ...vals,
//             });
//         }
//         // TODO: there's should only be one user on a user page. For example, if a user input a new username "aaa", the default username "client" will no longer exist.
//         this.setState({
//             timestamp: Date.now(),
//         });
//     }


    
// }
interface ClientContextProps {
    children: React.ReactNode;
}

export class ClientContextProvider extends UserContextProvider<ClientContextProps> {
    constructor(props: any) {
        super(props);

        this.state = {
            users: new Map<string, UserData>([
                [uuidv4(), {
                    username: "defaultClient",
                    alpha: 0,
                    beta: 0,
                    gamma: 0,
                    update: this.update.bind(this),
                }]
            ]),
            timestamp: 0,
        }
    }

    //An older version of the update function:
    // update(vals: Partial<UserData>) {
    //     const clientUUID = Array.from(this.state.users.keys())[0];  
    //     const client = this.state.users.get(clientUUID);
    //     if (client) {
    //         this.state.users.set(clientUUID, {
    //             ...client,
    //             ...vals,
    //         });
    //     }
    //     this.setState({
    //         timestamp: Date.now(),
    //     });
    // }

    //A new version of update function using setState:
    update(vals: Partial<UserData>) {
        const clientUUID = Array.from(this.state.users.keys())[0];
        const client = this.state.users.get(clientUUID);
        if (client) {
            this.setState(prevState => ({
                ...prevState,
                users: new Map(prevState.users.set(clientUUID, {
                    ...client,
                    ...vals,
                })),
                timestamp: Date.now(),
            }));
        }
    }
    


}