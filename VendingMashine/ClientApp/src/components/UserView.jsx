import React, { Component } from 'react';

export class UserView extends Component {

    constructor(props) {
        super(props);
        this.AddCoin = this.AddCoin.bind(this);
        this.state = { count:0 };
    }
    AddCoin = coin => e => {
        this.setState({ count: this.state.count + coin })
    };
    render() {
        return (            
            <div>
                {this.state.count}
                <button onClick={this.AddCoin(1)}>
                    1
        </button>
                <button onClick={this.AddCoin(2)}>
                    2
        </button>
                <button onClick={this.AddCoin(5)}>
                    5
        </button>
                <button onClick={this.AddCoin(10)}>
                    10
        </button>
            </div>
        );
    }
}