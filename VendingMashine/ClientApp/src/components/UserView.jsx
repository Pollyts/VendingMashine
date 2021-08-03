import React, { Component } from 'react';


export class UserView extends Component {   
    constructor(props) {
        super(props);
        this.AddCoin = this.AddCoin.bind(this);
        this.RemoveDrink = this.RemoveDrink.bind(this);
        this.AddDrink = this.AddDrink.bind(this);
        this.Buy = this.Buy.bind(this);
        this.state = { money:0, drinks:null, sum:0};
    }
    async componentDidMount() {
        await fetch('https://localhost:44347/api/drinks')
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                let drinks = data.map((d) => {
                    return {
                        ...d,
                        selected: 0
                    }
                });
                this.setState({ drinks: drinks });
            })
    }

    AddCoin = coin => e => {
        this.setState({ money: this.state.money + coin })
    };

    async ReduceCountDrink(drink) {
        let drink = {
            Id: drink.id,
            Name: drink.name,
            Price: drink.price,
            Count: drink.count - drink.selected
        }
        await fetch('https://localhost:44347/api/drinks', {
            method: "PUT",
            body: JSON.stringify(drink),
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        });
}

    async Buy(e) {
        e.preventDefault();
        this.state.drinks.forEach((drink) => {
            if (drink.selected > 0) {
                await this.ReduceCountDrink(drink);
            }
        });
    };


    RemoveDrink = id => e => {
        this.setState(prevState => {
            const drinks = [...prevState.drinks];
            drinks[id].selected = drinks[id].selected - 1;
            const sum = prevState.sum - drinks[id].price;
            return { drinks: drinks, sum: sum };
        })
    };

    AddDrink = id => e => {
        this.setState(prevState => {
            const drinks = [...prevState.drinks];
            drinks[id].selected = drinks[id].selected + 1;
            const sum = prevState.sum + drinks[id].price;
            return { drinks: drinks,sum:sum };
        })
    };
    render() {
        if (!this.state.drinks) {
            return null;
        }
        return (
            <div className="container">
                <div class="row">
                <div class="col">
            <div className="container">
                <div class="row justify-content-md-center">
                    Money: {this.state.money}
                    </div>
                <div class="row">
                    <div class="col"><button type="button" className="btn btn-dark" onClick={this.AddCoin(1)}>
                        1
        </button></div>
                    <div class="col"><button type="button" className="btn btn-dark" onClick={this.AddCoin(2)}>
                        2
        </button></div>
                </div>
                    <div class="row">
                    <div class="col"><button type="button" className="btn btn-dark" onClick={this.AddCoin(5)}>
                        5
        </button></div>
                    <div class="col"><button type="button" className="btn btn-dark" onClick={this.AddCoin(10)}>
                        10
        </button></div>
                            </div>
                            
                    </div>
                </div>
                    <div className="col">
                        <div className="row">
                            {this.state.drinks.map((drink) => (
                                <div key={drink.id} className="col">
                                <div>{drink.name}</div>
                                    <div>{drink.price}</div>
                                    <div className="row">
                                <button type="button" className="btn btn-dark" onClick={this.RemoveDrink(this.state.drinks.indexOf(drink))}>-</button><div>{drink.selected}<button type="button" className="btn btn-dark" onClick={this.AddDrink(this.state.drinks.indexOf(drink))}>+</button></div>
                                </div>
                                
                            </div>                            
                            
                        ))}
                            </div>
                    </div>
                </div>
                <div className="row justify-content-md-center">
                    Sum: {this.state.sum}
                </div>
                <div className="row justify-content-md-center">
                    {(this.state.sum > this.state.money || this.state.sum===0) ?
                        <button type="button" className="btn btn-dark disabled">Buy</button>
                        : <button type="button" className="btn btn-dark" onClick={this.Buy}>Buy</button>}
                </div>
                
                
            </div>
        );
    }
}