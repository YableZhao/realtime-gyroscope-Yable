import { UserContext, UserContextT } from '@root/user';
import React, { Component } from 'react';
import { Dot } from './dot';

const BOARD_DIM = 512.0;
const CIRCLE_DEG = 360.0;

interface BoardProps {
    className?: string;
}

export class Board extends React.Component<BoardProps> {
    static contextType = UserContext;
    context!: UserContextT;

    constructor(props: any, context: UserContextT) {
        super(props);
    }

    render() {
        return (
            <div className={`board ${this.props.className ?? ''}`}>
                {
                    Array.from(this.context.users.values()).map((user) => {
                        return (
                            <Dot
                                key={user.username}
                                username={
                                    `${user.username} ${user.gamma} ${user.beta} ${user.alpha}  `
                                }
                                position={{
                                    x: (user.gamma + (CIRCLE_DEG / 2)) % CIRCLE_DEG / CIRCLE_DEG * BOARD_DIM,
                                    y: (user.beta + (CIRCLE_DEG / 2)) % CIRCLE_DEG / CIRCLE_DEG * BOARD_DIM,
                                    alpha: user.alpha
                                }}
                            />
                        )
                    })
                }
            </div>
        );
    }
}
