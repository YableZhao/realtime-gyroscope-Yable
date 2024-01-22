import React, { Component } from 'react';

import "./bar.scss";

  
interface PointProps {
    className?: string;
    label: string;
    position: {
        x: number;
        // y: number;
        // alpha: number;
    };
}
export class Point extends Component<PointProps> {
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
      const label = this.props.label
      const x = this.props.position.x;
    //   const y = this.props.position.y;
    //   const alpha = this.props.position.alpha;

      return (
          <div
            className={`point-container ${this.props.className}`}
              style={{
                  left: `${x - 4}`,
                //   top: `${y - 3}`,
              }}
            >
            {/* <div className='dot' style={{transform: `rotate(${alpha + 225}deg)`}}/> */}
            <div className="point-label">
                {label}
            </div>
          </div>
      );
  }
}
