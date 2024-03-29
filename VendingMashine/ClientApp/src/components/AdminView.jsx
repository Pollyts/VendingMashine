﻿import React, { Component } from 'react';
import { DeleteButton } from './/ModalWindows/DeleteDrink';
import { Message } from './/ModalWindows/Message';
import { SaveCoinsCount, GetCoins, BlockToMashine } from './/Functions/FetchCoin';
import { GetDrinks, SendDrink, SaveImage, PutImage, PutDrink } from './/Functions/FetchDrinks';

const key = "admin123";

export class AdminView extends Component {
    constructor(props) {
        super(props);
        this.BlockCoin = this.BlockCoin.bind(this);
        this.AddDrink = this.AddDrink.bind(this);
        this.SelectDrink = this.SelectDrink.bind(this);
        this.ChangeType = this.ChangeType.bind(this);
        this.ChangeName = this.ChangeName.bind(this);
        this.ChangePrice = this.ChangePrice.bind(this);
        this.ChangeCount = this.ChangeCount.bind(this);
        this.SaveCoinsCount = this.SaveCoinsCount.bind(this);
        this.handleImageChange = this.handleImageChange.bind(this);
        this.handleToUpdate = this.handleToUpdate.bind(this);
        this.HideMessage = this.HideMessage.bind(this)
        this.Ok = this.Ok.bind(this);
        this.state = {
            coins: null, drinks: null, file: null, message: {header:null, body:null, show:false}, filepath: null, selecteddrink: { id: null, name: "", price: "", count: "" }, type: false
        };
    }
    async componentDidMount() {
        if (this.props.match.params.key !== key) {
            alert("Неверный код");
            this.props.history.push("/");
        }
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

    async handleToUpdate() {
        let db_drinks = await this.GetDrinks();
        if (db_drinks.exception) {
            this.setState({ message: { header: db_drinks.exception, body: "Попробуйте обновить страницу", show: true } });
        }
        this.setState({ drinks: db_drinks.db_drinks });
    }
    async HideMessage() {        
        this.setState({ message: { header: null, body: null, show: false }});
    }

    handleImageChange(e) {
        e.preventDefault();
        if (e.target.files.length > 0) {
            let form = new FormData();
            for (var index = 0; index < e.target.files.length; index++) {
                var element = e.target.files[index];
                form.append('image', element);
            }
            this.setState({ file: form, filepath: URL.createObjectURL(e.target.files[0]) });
        }
        else if (this.state.file != null) {
            this.setState({ file: null, filepath: null })
        }
    };

    SaveCoinsCount = id => async e => {
        let coin = {
            Id: Number(this.state.coins[id].id),
            Count: Number(this.state.coins[id].count)
        };
        let ex = await SaveCoinsCount(coin);
        if (ex) {
            this.setState({ message: { header: ex, body: "Попробуйте обновить страницу и ввести заново", show: true } })
        }
        else {
            this.setState({ message: { header: "Успешно", body: `Количество монет для номинала ${this.state.coins[id].name} изменено`, show: true } })
        }
    }

    ChangeCoinCount = id => e => {
        var val = e.target.value;
        this.setState(prevState => {
            const coins = [...prevState.coins];
            coins[id].count = val;
            return { coins: coins };
        })
    }

    async GetDrinks() {
        let db_drinks = await GetDrinks();
        return db_drinks;
    }

    async GetCoins() {
        let db_coins = await GetCoins();
        return db_coins;
    }
       
    BlockCoin = id => async e => {
        let coins;
        let ex = await BlockToMashine(this.state.coins[id].name)
        if (ex) {
            this.setState({ message: { header: ex, body: "Попробуйте обновить страницу и ввести заново", show: true } })
        }
        else {
            this.setState(prevState => {
                coins = [...prevState.coins];
                coins[id].isBlocked = !coins[id].isBlocked;
                return { coins: coins };
            })
        }        
        
    };

    SelectDrink = id => e => {
        this.setState({ selecteddrink: this.state.drinks[id], type: false }
        )
    };

    ChangeType = type => async e => {
        if (this.state.type !== false) {
            this.setState({ type: false, selecteddrink: { id: null, name: "", price: "", count: "", image: null }, file: null, filepath: null })
        }
        else {
            if ((type === "Edit") && (this.state.selecteddrink.id !== null)) {
                this.setState({ type: "Edit", file: null, filepath: null })

            }
            else if (type === "Add") {
                this.setState({ type: "Add", selecteddrink: { id: null, name: "", price: "", count: "", image: null }, file: null, filepath: null })
            }
        }
    };

    ChangeName(e) {
        var val = e.target.value;
        this.setState(prevState => ({ selecteddrink: { id: prevState.selecteddrink.id, name: val, price: prevState.selecteddrink.price, count: prevState.selecteddrink.count, image: prevState.selecteddrink.image } }))
    }

    ChangePrice(e) {
        var val = e.target.value;
        this.setState(prevState => ({ selecteddrink: { id: prevState.selecteddrink.id, name: prevState.selecteddrink.name, price: val, count: prevState.selecteddrink.count, image: prevState.selecteddrink.image } }))
    }

    ChangeCount(e) {
        var val = e.target.value;
        this.setState(prevState => ({ selecteddrink: { id: prevState.selecteddrink.id, name: prevState.selecteddrink.name, price: prevState.selecteddrink.price, count: val, image: prevState.selecteddrink.image } }))
    }

    async Ok(e) {
        e.preventDefault();
        if (this.state.type === "Add") {
            await this.AddDrink(this.state.selecteddrink)
        }
        else {
            await this.PutDrink(this.state.selecteddrink)
        }        
    }

    async SendDrink(newdrink) {
        let id = await SendDrink(newdrink);
        return id;
    }

    async AddDrink(drink) {
        let newdrink = {
            Name: drink.name,
            Price: Number(drink.price),
            Count: Number(drink.count)
        }
        let data = await this.SendDrink(newdrink);
        if (data.exception) {
            this.setState({ message: { header: data.exception, body: "Попробуйте обновить страницу и ввести заново", show: true } })
        }
        else {
            let ex = await SaveImage(data.id, this.state.file);
            if (ex) {
                this.setState({ message: { header: ex, body: "Попробуйте обновить страницу и ввести заново", show: true } })
            }
            else {
                this.setState({ message: { header: "Успешно", body: "Напиток добавлен", show: true } ,drinks: null, selecteddrink: { id: null, name: "", price: "", count: "" }, type: false, file: null, filepath: null });
                let db_drinks = await this.GetDrinks();
                if (db_drinks.exception) {
                    this.setState({ message: { header: db_drinks.exception, body: "Попробуйте обновить страницу", show: true } });
                }
                this.setState({ drinks: db_drinks.db_drinks });
            }            
        }        
    }

    async PutDrink(drink) {
        let newdrink = {
            Id: drink.id,
            Name: drink.name,
            Price: Number(drink.price),
            Count: Number(drink.count)
        }
        let exception = await PutDrink(newdrink);
        if (exception) {
            this.setState({ message: { header: exception, body: "Попробуйте обновить страницу и ввести заново", show: true } })
        }
        else {
            let ex;
            if (this.state.filepath !== null) {
                ex = await PutImage(drink.id, this.state.file);
            }            
            if (ex) {
                this.setState({ message: { header: ex, body: "Попробуйте обновить страницу и ввести заново", show: true } })
            }
            else {
                this.setState({ message: { header: "Успешно", body: "Напиток изменен", show: true }, drinks: null, selecteddrink: { id: null, name: "", price: "", count: "" }, type: false, file: null, filepath: null });
                let db_drinks = await this.GetDrinks();
                if (db_drinks.exception) {
                    this.setState({ message: { header: db_drinks.exception, body: "Попробуйте обновить страницу", show: true } });
                }
                this.setState({ drinks: db_drinks.db_drinks });
            }
        }
    }

    render() {
        if ((!this.state.drinks) || (!this.state.coins)) {
            return (<div>
                { this.state.message.show ? <Message HideMessage={this.HideMessage.bind(this)} body={this.state.message.body} header={this.state.message.header} /> : null})
            </div>)
        }
        return (
            <div className="container">
                {this.state.message.show ? <Message HideMessage={this.HideMessage.bind(this)} body={this.state.message.body} header={this.state.message.header} /> : null}
                <div class="row">
                    <div class="col-4 border-right border-dark">
                        <div className="row justify-content-md-center">
                            <h2> Редактор монет</h2>
                        </div>
                        <div className="container">
                            {this.state.coins.map((coin) => (
                                <div key={coin.id} className="container border-top border-gray">
                                    <div className="row justify-content-md-center">
                                        <h5>Номинал {coin.name} {coin.isBlocked ? "(заблокирован)" : null}</h5>
                                    </div>
                                    <div className="row">
                                        <div class="input-group mb-3">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text">Количество</span>
                                            </div>
                                            <input type="number" min="0" value={coin.count} onChange={this.ChangeCoinCount(this.state.coins.indexOf(coin))} class="form-control" placeholder="Количество" />
                                            <div class="input-group-append">
                                                <button type="button" onClick={this.SaveCoinsCount(this.state.coins.indexOf(coin))} disabled={coin.count < 0} className={coin.count >= 0 ? "btn btn-dark" : "btn btn-dark disabled"}>OK</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row mb-2 justify-content-md-center">
                                        {coin.isBlocked ?
                                            <button type="button" className="btn btn-dark" onClick={this.BlockCoin(this.state.coins.indexOf(coin))}>Разблокировать</button>
                                            : <button type="button" className="btn btn-dark" onClick={this.BlockCoin(this.state.coins.indexOf(coin))}>Заблокировать</button>}

                                    </div>
                                </div>

                            ))}
                        </div>
                    </div>
                    <div className="col-8">
                        <div className="row justify-content-md-center">
                            <h2> Редактор напитков</h2>
                        </div>
                        <div className="container sticky-top bg-white border-bottom border-dark">
                            <div className="row mb-2 mt-2">
                                <div className="col-4"><button type="button" className="btn btn-dark instruments" onClick={this.ChangeType("Add")}>Добавить напиток</button></div>
                                <div className="col-4"><DeleteButton handleToUpdate={this.handleToUpdate.bind(this)} drink={this.state.selecteddrink} /></div>
                                
                                <div className="col-4"><button type="button" className="btn btn-dark instruments" onClick={this.ChangeType("Edit")}>Изменить напиток</button></div>
                            </div>
                            {this.state.type !== false ?
                                <div className="container-fluid">
                                    <div className="row">
                                        <div className="col-6">
                                            <div className="row justify-content-between mb-1">
                                                <div className="col">Название:</div>
                                                <div className="col"><input type="text" value={this.state.selecteddrink.name} onChange={this.ChangeName} /></div>
                                            </div>
                                            <div className="row justify-content-between mb-1">
                                                <div className="col">Стоимость:</div>
                                                <div className="col"><input type="number" min="0" value={this.state.selecteddrink.price} onChange={this.ChangePrice} /></div>
                                            </div>
                                            <div className="row justify-content-between mb-1">
                                                <div className="col">Количество:</div>
                                                <div className="col"><input type="number" min="0" value={this.state.selecteddrink.count} onChange={this.ChangeCount} /></div>
                                            </div>
                                        </div>
                                        <div className="col-3">
                                            <div className="row justify-content-between mb-1">
                                                <div className="col">Изображение:</div>
                                                <div className="col"><label className="custom-file-upload">Загрузить изображение
                <input type="file" onChange={(e) => this.handleImageChange(e)} />
                                                </label>
                                                </div>

                                            </div>


                                        </div>
                                        <div className="col-3">
                                            {this.state.filepath === null ? (
                                                <img className="downloadimage" src={`https://localhost:44347/api/drinks/images/${this.state.selecteddrink.id}`} />
                                            ) : (
                                                <img className="downloadimage" src={this.state.filepath} />
                                            )}
                                        </div>

                                    </div>
                                    <div className="row justify-content-md-center">
                                        <button type="button" disabled={(this.state.selecteddrink.name === "") || (Number(this.state.selecteddrink.price < 0)) || (Number(this.state.selecteddrink.count) < 0) || (this.state.type === "Add" ? this.state.filepath === null : false)} onClick={this.Ok} className={((this.state.selecteddrink.name != "") && (Number(this.state.selecteddrink.price) > 0) && (Number(this.state.selecteddrink.count) > 0) && (this.state.type === "Add" ? this.state.filepath !== null : true)) ? "btn btn-dark mb-3 instruments" : "btn btn-dark disabled mb-3 instruments"}>OK</button>
                                    </div>
                                </div>

                                : null

                            }
                        </div>
                        <div className="row">
                            {this.state.drinks.map((drink) => (
                                <div key={drink.id} className={this.state.selecteddrink.id === drink.id ? "col-3 m-2 active no-overfolw drinkcursor border border-light" : "col-3 m-2 no-overfolw border border-light drinkcursor"} onClick={this.SelectDrink(this.state.drinks.indexOf(drink))} >
                                    <div>{drink.name}</div>
                                    <div>Цена: {drink.price}</div>
                                    <div className={drink.count === 0 ? "text-danger font-weight-bold" : null}>Кол-во: {drink.count}</div>
                                    <img
                                        className="drinkimage"
                                        src={`https://localhost:44347/api/drinks/images/${drink.id}`}
                                        alt="No Image"
                                    />

                                </div>

                            ))}
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}