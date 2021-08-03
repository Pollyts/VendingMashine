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

    AddCoin = coin => async e => {
        await this.AddCoinToMashine(coin)
        this.setState({ money: this.state.money + coin })        
    };

    async AddCoinToMashine(name) {
        await fetch('https://localhost:44347/api/coins/' + name
        );
    }

    async ReduceCountDrink(drink) {
        let newdrink = {
            Id: drink.id,
            Name: drink.name,
            Price: drink.price,
            Count: drink.count - drink.selected
        }
        await fetch('https://localhost:44347/api/drinks', {
            method: "PUT",
            body: JSON.stringify(newdrink),
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        });
    }
    async GetOddMoney() {
        let change = this.state.money - this.state.sum;
        let oddmoney=0;
        if (change > 0) {
            await fetch('https://localhost:44347/api/coins/oddmoney/' + change).then(response => { return response.json() })
                .then(data => {
                    oddmoney = data
                });       
        }
        alert("Сдача " + oddmoney);
        window.location.reload();
    }

    async Buy(e) {
        e.preventDefault();
        this.state.drinks.forEach((drink) => {
            if (drink.selected > 0) {
                this.ReduceCountDrink(drink);
            }
        });
        this.GetOddMoney();
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
                                        {drink.selected ===0 ?
                                            <button type="button" className="btn btn-dark disabled">-</button>
                                            : <button type="button" className="btn btn-dark" onClick={this.RemoveDrink(this.state.drinks.indexOf(drink))}>-</button>}
                                        <div>{drink.selected}</div>

                                            {drink.selected === drink.count ?
                                                <button type="button" className="btn btn-dark disabled">+</button>
                                                : <button type="button" className="btn btn-dark" onClick={this.AddDrink(this.state.drinks.indexOf(drink))}>+</button>}
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