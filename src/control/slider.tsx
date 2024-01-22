import React, { Component } from "react";

import "./style.scss";

interface SliderProps {
    className?: string;
    min?: number;
    max?: number;
    
    update: (val: number) => void;
}

interface SliderState {
    value: number;
}

export class Slider extends Component<SliderProps, SliderState> {
    state = {
        value: 0,
    }

    render() {
        return (
            <div className="slider-container">
                {this.state.value}
                <input
                    type="range"
                    min={this.props.min ?? 0}
                    max={this.props.max ?? 100}
                    value={this.state.value}
                    onChange={
                        (e) => {this.setState({value: parseInt(e.target.value)});
                        this.props.update(parseInt(e.target.value))
                    }}
                    className={`slider ${this.props.className ?? ''}`}
                />
            </div>
        )
    }
}