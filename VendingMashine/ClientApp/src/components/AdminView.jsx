import React, { Component } from 'react';

export class AdminView extends Component {
    render() {
        const prodId = this.props.match.params.key;
        return (
            <div>
                <h2>Key {prodId}</h2>
            </div>
        );
    }
}