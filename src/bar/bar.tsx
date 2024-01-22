import { UserContext, UserContextT } from '@root/user';
import React, { Component } from 'react';
import { Point } from './point';

const BAR_DIM = 512.0;
const CIRCLE_DEG = 360.0;

interface BarProps {
    className?: string;
}

export class Bar extends React.Component<BarProps> {
    static contextType = UserContext;
    context!: UserContextT;

    constructor(props: any, context: UserContextT) {
        super(props);
    }

    render() {
        return (
            <div className={`bar `}>
                {
                    Array.from(this.context.users.values()).map((user) => {
                        return (
                            <Point
                                key={user.username}
                                label={
                                    `${user.username} ${user.gamma} ${user.beta} ${user.alpha}  `
                                }
                                position={{
                                    x: (user.gamma + (CIRCLE_DEG / 2)) % CIRCLE_DEG / CIRCLE_DEG * BAR_DIM,
                                    // y: (user.beta + (CIRCLE_DEG / 2)) % CIRCLE_DEG / CIRCLE_DEG * BAR_DIM,
                                    // alpha: user.alpha
                                }}
                            />
                        )
                    })
                }
            </div>
        );
    }
}
