import React, { Component } from "react";
import { Board } from "@root/board";
import { OverseerContextProvider } from "@root/user";
import { Quiz } from "@root/quiz"
import { Bar } from "@root/bar"
import "./overview.scss";

type LayoutProps = Record<string, never>;
type LayoutState = Record<string, never>;

export class LayoutOverview extends Component<LayoutProps, LayoutState> {
    render() {
        return (
            <div className="content-container">
                <div className="content">
                    <OverseerContextProvider>
                        <Quiz/>
                        <Bar/>
                        {/* <Board className="content-item"/> */}
                    </OverseerContextProvider>
                </div>
            </div>
        );
    }
}
