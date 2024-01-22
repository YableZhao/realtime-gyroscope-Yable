import React, { Component } from 'react';
import { UserContext, UserContextT } from '@root/user';

import "./gyro.scss";

interface GyroButtonState {
    isPermitted?: boolean,
}

interface GyroButtonProps {
    className?: string,
}

export class GyroButton extends Component<GyroButtonProps, GyroButtonState> {
    static contextType = UserContext
    context!: UserContextT;

    static defaultProps = {
        className: ''
    };

    constructor(props: GyroButtonProps, context: typeof UserContext) {
        super(props);
    
        this.state = {
          isPermitted: false,
        };

        this.togglePermission = this.togglePermission.bind(this);
        this.handleDeviceOrientationEvent = this.handleDeviceOrientationEvent.bind(this);
        
      }

    togglePermission = async () => {
        if (this.state.isPermitted) {
            this.setState({ isPermitted: false})
            window.removeEventListener('deviceorientation', this.handleDeviceOrientationEvent);
        } else {
            this.setState({ isPermitted: true})
            window.addEventListener('deviceorientation', this.handleDeviceOrientationEvent);
        }
    }

    handleDeviceOrientationEvent (event: DeviceOrientationEvent) {
        if (this.state.isPermitted){
            const client = this.context.users.get('client');
            if (client) {
                client.update(
                    {
                        alpha: event.alpha || 0,
                        beta: event.beta || 0,
                        gamma: event.gamma || 0,
                    }
                )
            }
        }
    }

    render() {
        return(
            <div className = {`permission-button ${this.state.isPermitted ? "granted" : "default"}  ${this.props.className}`}
            onClick={this.togglePermission.bind(this)}
            >
                <button>Gyro: {this.state.isPermitted ? "Permitted" : "Revoked"}</button>
            </div>
        )
        
    }
}