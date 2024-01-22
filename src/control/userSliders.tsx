// import React, { Component } from "react";
// import { UserContext, UserContextT, UserData } from '@root/user';
// import { Slider } from "@root/control";

// import "./style.scss";
// import { ws } from '@root/ws'

// interface UserSliderProps {
//     className?: string;
// }

// export class UserSliders extends Component<UserSliderProps> {
//     static contextType = UserContext
//     context!: UserContextT;

//     componentDidUpdate() {
//         const clientUser = this.context.users.get('client');
//         if (clientUser) {
//             ws.send(JSON.stringify({
//                 username: clientUser.username,
//                 alpha: clientUser.alpha,
//                 beta: clientUser.beta,
//                 gamma: clientUser.gamma,
//             }));
//         }
//     }

//     render() {
//         return (
//             <div className={`user-sliders ${this.props.className ?? ''} ${this.props.className}`}>
//                 <Slider
//                     min={-180}
//                     max={180}

//                     update={
//                         (val) => {
//                             this.context.users.get('client').update({
//                                 gamma: val,
//                             });
//                         }
//                 }/>

//                 {/* <Slider
//                     min={-180}
//                     max={180}

//                     update={
//                         (val) => {
//                             this.context.users.get('client').update({
//                                 beta: val,
//                             });
//                         }
//                 }/> */}

//                 {/* <Slider
//                     min={0}
//                     max={360}

//                     update={
//                         (val) => {
//                             this.context.users.get('client').update({
//                                 alpha: val,
//                             });
//                         }
//                 }/> */}
//             </div>
//         )
//     }
// }


import React, { Component } from "react";
import { UserContext, UserContextT, UserData } from '@root/user';
import { Slider } from "@root/control";

import "./style.scss";
import { ws } from '@root/ws'

interface UserSliderProps {
    className?: string;
}

export class UserSliders extends Component<UserSliderProps> {
    static contextType = UserContext
    context!: UserContextT;

    componentDidUpdate() {
        const clientUUID = Array.from(this.context.users.keys())[0];  // Assuming there's only one user
        const clientUser = this.context.users.get(clientUUID);
        if (clientUser) {
            ws.send(JSON.stringify({
                username: clientUser.username,
                alpha: clientUser.alpha,
                beta: clientUser.beta,
                gamma: clientUser.gamma,
                uuid: clientUUID,
            }));
        }
    }

    render() {
        return (
            <div className={`user-sliders ${this.props.className ?? ''} ${this.props.className}`}>
                <Slider
                    min={-180}
                    max={180}
                    update={
                        (val) => {
                            const clientUUID = Array.from(this.context.users.keys())[0];  // Assuming there's only one user
                            const clientUser = this.context.users.get(clientUUID);
                            if (clientUser) {
                                clientUser.update({
                                    gamma: val,
                                });
                            } else {
                                console.error('Client user not found');
                            }
                        }
                    }
                />
            </div>
        )
    }
}
