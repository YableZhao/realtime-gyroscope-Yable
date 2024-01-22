import React, { Component } from 'react';
import './Quiz.scss';

interface QuizProps{
    className?: string;
}

interface QuizState{
    question: string;
    options: { [key: string]: string };
}

export class Quiz extends Component<QuizProps, QuizState> {
    constructor(props: QuizProps) {
        super(props);
        this.state = {
            question: 'This is an initial quiz!!! Which season is your favorite?',
            options: {
                option1: "winter",
                option2: "Gravity Falls Season 1 (what?)"
            },
        }
    }

    render() {
        const { options } = this.state;
        const optionElements = Object.keys(options).map(key => (
            <div key={key} className="option">
                <h2>{options[key]}</h2>
            </div>
        ));

        return (
            <div className="quiz-container">
                <h1>{this.state.question}</h1>
                <div className="options-container">
                    {optionElements}
                </div>
            </div>
        )
    }
}
