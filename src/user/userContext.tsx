import React from 'react';

export interface UserData {
    username: string;
    uuid?: string; 
    alpha: number;
    beta: number;
    gamma: number;

    update(vals: Partial<UserData>): void;
}

export interface UserContextT {
    users: Map<string, UserData>;

    timestamp: number;
}

export const UserContext = React.createContext<UserContextT>(
    {
        users: new Map(),
        timestamp: 0,
    }
);

export abstract class UserContextProvider<
    P extends {children: React.ReactNode} = {children: React.ReactNode},
    S extends UserContextT = UserContextT
> extends React.Component
    <
        P,
        UserContextT
    >
{
    state: UserContextT;

    render() {
        return (
            <UserContext.Provider value={this.state}>
                {this.props.children}
            </UserContext.Provider>
        );
    }
}
