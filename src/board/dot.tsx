import React, { Component } from 'react';

import "./board.scss";

const CIRCLE_DEG = 360;
  
interface DotProps {
    className?: string;
    username: string;
    position: {
        x: number;
        y: number;
        alpha: number;
    };
}
export class Dot extends Component<DotProps> {
    static defaultProps = {
        className: '',
        // username: 'unknown',
        // position: {
        //     x: 0,
        //     y: 0,
        //     alpha: 0,
        // },
    };

  render() {
      const username = this.props.username
      const x = this.props.position.x;
      const y = this.props.position.y;
      const alpha = this.props.position.alpha;

      return (
          <div
            className={`dot-container ${this.props.className}`}
              style={{
                  left: `${x - 4}`,
                  top: `${y - 3}`,
              }}
            >
            <div className='dot' style={{transform: `rotate(${alpha + 225}deg)`}}/>
            <div className="dot-label">
                {username}
            </div>
          </div>
      );
  }
}


