import React, { Component } from 'react';

export class AdminView extends Component {

    constructor(props) {
        super(props);
        this.state = { search: "", folders: null, elements: null, breadCrumbs: null };
        this.handleClick = this.handleClick.bind(this);
        this.Search = this.Search.bind(this);
    }
    render() {
        const prodId = this.props.match.params.key;
        return (
            <div>
                <h2>Key {prodId}</h2>
            </div>
        );
    }
}