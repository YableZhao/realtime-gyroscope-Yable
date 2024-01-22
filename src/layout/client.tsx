import React, { Component } from "react";
import { Board } from "@root/board";

import { ClientContextProvider, UserContextProvider } from "@root/user";
import { UserSliders } from "@root/control";
import { GyroButton } from "@root/gyro";
import { UsernameInput } from "@root/username/usernameInput";
import { Quiz } from "@root/quiz"
import { Bar } from "@root/bar"
import "./client.scss";
import { UserSend } from "@root/username";

type LayoutProps = Record<string, never>;
type LayoutState = Record<string, never>;

export class Layout extends Component<LayoutProps, LayoutState> {
    render() {
        return (
                <div className="content-container">
                    <div className="content">
                        <ClientContextProvider>
                            <Quiz/>
                            <Bar/>
                            {/* <Board className="content-item"/> */}
                            <UserSliders/>
                            <GyroButton/>
                            <UsernameInput/>
                            {/* <UserSend/> */}
                        </ClientContextProvider>
                    </div>
                </div>
        );
    }
}