﻿import React, { Component } from 'react';

const key = "admin123";

export class AdminView extends Component {
    constructor(props) {
        super(props);
        this.AddCoin = this.AddCoin.bind(this);
        this.RemoveDrink = this.RemoveDrink.bind(this);
        this.AddDrink = this.AddDrink.bind(this);
        this.state = { coins:null, drinks: null };
    }
    async componentDidMount() {
        if (this.props.match.params.key !== key) {
            alert("Неверный код");
            this.props.history.push("/");
        }

        let db_coins;
        let db_drinks;
        
        await fetch('https://localhost:44347/api/drinks')
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                db_drinks = data.map((d) => {
                    return {
                        ...d,
                        selected: 0
                    }
                });
                
            })
        await fetch('https://localhost:44347/api/coins')
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                let db_drinks = data.map((d) => {
                    return {
                        ...d,
                        selected: 0
                    }
                });

            })
        this.setState({ drinks: drinks });
    }

    AddCoin = coin => e => {
        this.setState({ count: this.state.count + coin })
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
            return { drinks: drinks, sum: sum };
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
                            {this.state.coins.map((coin) => (                                
                                <div key={coin.id} className="col">
                                    <div className="row">
                                        {coin.name}
                                        </div>
                                    <div className="row">
                                        <div class="col">
                                            <div className="row">Количество</div>
                                            <div className="row">{coin.count}</div>

                                        </div>
                                        <div class="col">
                                            <button type="button" className="btn btn-dark" onClick={this.AddCoin(2)}>
                                                Блокировать</button>

                                        </div>
                                    </div>
                                    </div>

                            ))}
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
                    <button type="button" className="btn btn-dark" onClick={this.Buy}>Buy</button>
                </div>


            </div>
        );
    }
}