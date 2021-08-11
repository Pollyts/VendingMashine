import React, { Component } from 'react';
import { GetCoins, AddCoinToMashine, GetOddMoney } from './/Functions/FetchCoin';
import { GetDrinks, ReduceCountDrink } from './/Functions/FetchDrinks';
import { Message } from './/ModalWindows/Message';


export class UserView extends Component {   
    constructor(props) {
        super(props);
        this.AddCoin = this.AddCoin.bind(this);
        this.RemoveDrink = this.RemoveDrink.bind(this);
        this.AddDrink = this.AddDrink.bind(this);
        this.HideMessage = this.HideMessage.bind(this)
        this.Buy = this.Buy.bind(this);
        this.state = { money: 0, message: { header: null, body: null, show: false }, coins:null, drinks:null, sum:0};
    }

    async GetDrinks() {
        let drinks = await GetDrinks();
        if (drinks.exception) {
            return { db_drinks: null, exception: drinks.exception }
        }
        let db_drinks = drinks.db_drinks.map((d) => {
                    return {
                        ...d,
                        selected: 0
                    }
        });
        return { db_drinks: db_drinks, exception: undefined };
    }
    async GetCoins() {
        let db_coins = await GetCoins();
        return db_coins;
    }


    async componentDidMount() {
        let db_coins = await this.GetCoins();
        let db_drinks = await this.GetDrinks();
        if (db_coins.exception) {
            this.setState({ message: { header: db_coins.exception, body: "Попробуйте обновить страницу", show: true } });
        }
        else
            if (db_drinks.exception) {
                this.setState({ message: { header: db_drinks.exception, body: "Попробуйте обновить страницу", show: true } });
            }                
            else {
                this.setState({ drinks: db_drinks.db_drinks, coins: db_coins.coins });
        }
    }

    async HideMessage() {
        this.setState({ message: { header: null, body: null, show: false } });
    }

    AddCoin = coin => async e => {
        let ex = await AddCoinToMashine(coin);
        if (ex) {
            this.setState({ message: { header: ex, body: "Обновите страницу и попробуйте еще раз", show: true } })
        }
        else {
            this.setState({ money: this.state.money + Number(coin) })
        }               
    };

    async ReduceCountDrink(drink) {
        let newdrink = {
            Id: drink.id,
            Name: drink.name,
            Price: drink.price,
            Count: drink.count - drink.selected
        }
        let ex = await ReduceCountDrink(newdrink);
        if (ex) {
            this.setState({ message: { header: ex, body: "Обновите страницу и попробуйте еще раз", show: true } })
        }
    }
    async GetOddMoney() {
        let change = this.state.money - this.state.sum;
        let oddmoney=0;
        if (change > 0) {
            oddmoney = await GetOddMoney(change);      
        }
        if (oddmoney.exception) {
            this.setState({ message: { header: oddmoney.exception, body: "Попробуйте обновить страницу и повторить действия", show: true } })
        }
        else {
            let db_coins = await this.GetCoins();
            let db_drinks = await this.GetDrinks();
            if (db_coins.exception) {
                this.setState({ message: { header: db_coins.exception, body: "Попробуйте обновить страницу", show: true } });
            }
            else
                if (db_drinks.exception) {
                    this.setState({ message: { header: db_drinks.exception, body: "Попробуйте обновить страницу", show: true } });
                }
                else {
                    this.setState({ money: 0, drinks: db_drinks.db_drinks, coins: db_coins.coins, message: { header: "Спасибо за покупку", body: `Сдача ${oddmoney.oddmoney} монет`, show: true }, sum: 0 });
                }
            
        }
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
        if ((!this.state.drinks) || (!this.state.coins)) {
            return (<div>
                { this.state.message.show ? <Message HideMessage={this.HideMessage.bind(this)} body={this.state.message.body} header={this.state.message.header} /> : null}
            </div>)
        }
        return (
            <div className="container-fluid">
                {this.state.message.show ? <Message HideMessage={this.HideMessage.bind(this)} body={this.state.message.body} header={this.state.message.header} /> : null}
                <div className="row">
                    <div className="col-4 border-right border-dark">
                        <div className="row justify-content-md-center mb-2">
                    <h3>Добавить монеты</h3>
                        </div>
                        <div className="row">
                            {this.state.coins.map((coin) => (
                                <div key={coin.id} className="col">
                                    <div class="col"><button type="button" disabled={coin.isBlocked} className={coin.isBlocked ? "btn btn-dark disabled" : "btn btn-dark"} onClick={this.AddCoin(coin.name)}>
                                        {coin.name}
        </button></div>

                                </div>))}
                        </div>

                        <div className="row justify-content-md-left ml-2 mb-2">
                            Внесена сумма: {this.state.money}
                        </div>
                        <div className="row justify-content-md-left ml-2 mb-2">
                            Выбрано напитков на сумму: {this.state.sum}
                        </div>
                        <div className="row justify-content-md-center mt-3">
                            {(this.state.sum > this.state.money) ? <div className="text-danger">Недостаточно монет для покупки</div>:null}
                                </div>
                        <div className="row justify-content-md-center mt-1">
                            {(this.state.sum > this.state.money || this.state.sum === 0) ?
                                <button type="button" className="btn btn-success disabled btn-lg">Купить</button>
                                : <button type="button" className="btn btn-success btn-lg" onClick={this.Buy}>Купить</button>}
                        </div>
                    </div>
                    <div className="col">
                        <div className="row justify-content-md-center">
                            <h3>Выбрать напиток</h3>
                        </div>

                        <div className="row">
                            {this.state.drinks.map((drink) => (
                                <div key={drink.id} className="col-3 m-2 border border border-light">
                                    <div className="row no-overfolw justify-content-center">{drink.name}</div>
                                    <div className="row no-overfolw justify-content-center">
                                    <img
                                            className="drinkimage d-flex justify-content-center"                                            
                                            src={`https://localhost:44347/api/drinks/images/${drink.id}`}
                                        alt="No Image"
                                        />
                                    </div>
                                    <div className="row no-overfolw justify-content-center">Цена: {drink.price}</div>
                                    {drink.count === 0 ? <div className="row justify-content-center">Нет в наличии</div>: <div className="row justify-content-center">
                                        {drink.selected === 0 ?
                                            <button type="button" className="btn btn-dark disabled mr-1">-</button>
                                            : <button type="button" className="btn btn-dark mr-1" onClick={this.RemoveDrink(this.state.drinks.indexOf(drink))}>-</button>}
                                        <div>{drink.selected}</div>

                                        {drink.selected === drink.count ?
                                            <button type="button" className="btn btn-dark disabled ml-1">+</button>
                                            : <button type="button" className="btn btn-dark ml-1" onClick={this.AddDrink(this.state.drinks.indexOf(drink))}>+</button>}
                                    </div>}
                                    
                            </div>                            
                            
                        ))}
                            </div>
                    </div>
                </div>                
                
                
                
                </div>
        );
    }
}