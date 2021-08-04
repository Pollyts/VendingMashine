import { get } from 'jquery';
import React, { Component } from 'react';

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
        this.Ok = this.Ok.bind(this);
        this.state = {
            coins: null, drinks: null, file: null, filepath: null, selecteddrink: { id: null, name: "", price: "", count: "" }, type:false};
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
            Name: this.state.coins[id].name,
            Count: Number(this.state.coins[id].count)
        };
            await fetch('https://localhost:44347/api/coins', {
                method: "PUT",
                body: JSON.stringify(coin),
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            });
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
        let db_drinks;
        await fetch('https://localhost:44347/api/drinks')
            .then((response) => {
                return response.json();
            })
            .then(data => {
                db_drinks = data
            });
        return db_drinks;
    }
    async GetCoins() {
        let db_coins;
        await fetch('https://localhost:44347/api/coins')
            .then((response) => {
                return response.json();
            }).then(data => {
                db_coins = data;
            });
        return db_coins;
    }

    async componentDidMount() {
        if (this.props.match.params.key !== key) {
            alert("Неверный код");
            this.props.history.push("/");
        }
        let db_coins = await this.GetCoins();
        let db_drinks = await this.GetDrinks();
        this.setState({ drinks: db_drinks, coins: db_coins });
    }

    BlockCoin = id => async e => {
        let coins;        
        this.setState(prevState => {
            coins = [...prevState.coins];
            coins[id].isBlocked = !coins[id].isBlocked;
            return { coins: coins};
        })
        await this.BlockToMashine(this.state.coins[id].name)
    };

    async BlockToMashine(name) {
        await fetch('https://localhost:44347/api/coins/block/' + name
        );
    }   

    SelectDrink = id => e => {
        this.setState({ selecteddrink: this.state.drinks[id], type: false }
        )
    };    

    ChangeType = type => async e => {
        if ((type === "Delete") && (this.state.selecteddrink.id!==null)) {
            await this.DeleteDrink(this.state.selecteddrink.id);
            this.setState(prevState => {
                const drinks = [...prevState.drinks];
                drinks.splice(drinks.indexOf(this.state.selecteddrink), 1);
                return { drinks: drinks, selecteddrink: { id: null, name: "", price: "", count: "" }, type: false };
            })
            alert("Напиток удален");
        }
        else if ((type === "Edit") && (this.state.selecteddrink.id !== null)) {
            this.setState({ type: "Edit", file: null, filepath: null })
            
        }
        else if (type === "Add") {
            this.setState({ type: "Add", selecteddrink: { id: null, name: "", price: "", count: "", image: null }, file: null, filepath: null })
        }
    };
    async DeleteDrink(id) {
        await fetch('https://localhost:44347/api/drinks/' + id,
            {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
    }

    ChangeName(e) {
        var val = e.target.value;
        this.setState(prevState => ({ selecteddrink: { id: prevState.selecteddrink.id, name: val, price: prevState.selecteddrink.price, count: prevState.selecteddrink.count, image: prevState.selecteddrink.image} }))
        }
    ChangePrice(e){
        var val = e.target.value;
        this.setState(prevState => ({ selecteddrink: { id: prevState.selecteddrink.id, name: prevState.selecteddrink.name, price: val, count: prevState.selecteddrink.count, image: prevState.selecteddrink.image } }))
    }
    ChangeCount(e){
        var val = e.target.value;
        this.setState(prevState => ({ selecteddrink: { id: prevState.selecteddrink.id, name: prevState.selecteddrink.name, price: prevState.selecteddrink.price, count: val, image: prevState.selecteddrink.image } }))
    }

    async Ok(e) {
        e.preventDefault();
        if (this.state.type === "Add") {
            await this.AddDrink(this.state.selecteddrink)
            alert("Напиток добавлен");
        }
        else {
            await this.PutDrink(this.state.selecteddrink)
            alert("Напиток изменен");
        }
        let db_drinks = await this.GetDrinks();
        this.setState({ drinks: db_drinks, selecteddrink: { id: null, name: "", price: "", count: "" }, type: false, file: null, filepath: null });
    }


    async SendDrink(newdrink) {
        let id;
        await fetch('https://localhost:44347/api/drinks', {
            method: "POST",
            body: JSON.stringify(newdrink),
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        }).then(response => { return response.json() })
            .then(data => {
                id = data
            });
        return id;
    }

    async AddDrink(drink) {
        let newdrink = {
            Name: drink.name,
            Price: Number(drink.price),
            Count: Number(drink.count)
        }
        let id = await this.SendDrink(newdrink); 
        await this.SaveImage(id, this.state.file);
    }
    async SaveImage(id, elwithimg) {
        await fetch('https://localhost:44347/api/drinks' + `/image/${id}`, {
        method: 'POST', // или 'PUT'
        body: elwithimg, // данные могут быть 'строкой' или {объектом}!
        headers: {
            'Accept': 'application/json'
        }
    }).then(function (response) {
        console.log(response.status)
    });
}

    async PutDrink(drink) {
        let newdrink = {
            Id: drink.id,
            Name: drink.name,
            Price: Number(drink.price),
            Count: Number(drink.count)
        }
        await fetch('https://localhost:44347/api/drinks', {
            method: "PUT",
            body: JSON.stringify(newdrink),
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        });
        if (this.state.filepath!==null)
        await this.SaveImage(drink.id, this.state.file);
    }


    render() {
        if (!this.state.drinks) {
            return null;
        }
        return (
            <div className="container">
                <div class="row">
                    <div class="col-4 border-right border-dark">
                        <div className="row justify-content-md-center">
                            <h2> Редактор монет</h2>
                        </div>
                        <div className="container">
                            {this.state.coins.map((coin) => (                                
                                <div key={coin.id} className="container border-top border-gray">
                                    <div className="row justify-content-md-center">
                                        <h4>Номинал     {coin.name}</h4>
                                        </div>
                                            <div className="row">
                                                <div class="input-group mb-3">
                                                    <div class="input-group-prepend">
                                                        <span class="input-group-text">Количество</span>
                                                    </div>
                                                    <input type="number" min="0" value={coin.count} onChange={this.ChangeCoinCount(this.state.coins.indexOf(coin))}  class="form-control" placeholder="Количество"/>
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
                        <div className="flex-row">
                        <div className="container x-scroll">                        
                            {this.state.drinks.map((drink) => (
                                <div key={drink.id} className={this.state.selecteddrink.id === drink.id ? "col-3 m-2 active no-overfolw drinkcursor" : "col-3 m-2 no-overfolw drinkcursor"} onClick={this.SelectDrink(this.state.drinks.indexOf(drink))} >
                                    <div>{drink.name}</div>
                                    <div>Цена: {drink.price}</div>
                                    <div>Кол-во: {drink.count}</div>
                                    <img
                                        className="drinkimage"
                                        src={`data:image/jpeg;base64,${drink.image}`}
                                        alt="No Image"
                                    />

                                </div>

                            ))}
                            </div>
                        </div>
                        <div className="row mb-2 mt-2">
                            <div className="col-4"><button type="button" className="btn btn-dark instruments" onClick={this.ChangeType("Add")}>Добавить напиток</button></div>
                            <div className="col-4"><button type="button" className="btn btn-dark instruments" onClick={this.ChangeType("Delete")}>Удалить напиток</button></div>
                            <div className="col-4"><button type="button" className="btn btn-dark instruments" onClick={this.ChangeType("Edit")}>Изменить напиток</button></div>
                        </div>
                        {this.state.type!==false ?
                            <div className="container">
                                <div className="row justify-content-between mb-1">
                                <div className="col">Название:</div>
                                    <div className="col"><input type="text" value={this.state.selecteddrink.name} onChange={this.ChangeName}/></div>
                            </div>
                                <div className="row justify-content-between mb-1">
                                    <div className="col">Стоимость:</div>
                                    <div className="col"><input type="number" min="0" value={this.state.selecteddrink.price} onChange={this.ChangePrice} /></div>
                            </div>
                                <div className="row justify-content-between mb-1">
                                <div className="col">Количество:</div>
                                    <div className="col"><input type="number" min="0" value={this.state.selecteddrink.count} onChange={this.ChangeCount}/></div>
                                </div>
                                <div className="row justify-content-between mb-1">
                                    <div className="col">Изображение:</div>
                                    <div className="col"><label className="custom-file-upload">Загрузить изображение
                <input type="file" onChange={(e) => this.handleImageChange(e)} />
                                    </label>
                                        {this.state.filepath === null ? (
                                            <div>
                                                <img className="downloadimage" src={`data:image/jpeg;base64,${this.state.selecteddrink.image}`} /></div>
                                        ) : (
                                            <img className="downloadimage" src={this.state.filepath} />
                                        )}
                                </div>                                    
                                </div>
                                <div className="row justify-content-md-center">
                                    <button type="button" disabled={(this.state.selecteddrink.name === "") || (Number(this.state.selecteddrink.price < 0)) || (Number(this.state.selecteddrink.count) < 0) || (this.state.type === "Add" ? this.state.filepath === null : (this.state.selecteddrink.image === null) && (this.state.filepath === null))} onClick={this.Ok} className={((this.state.selecteddrink.name != "") && (Number(this.state.selecteddrink.price) > 0) && (Number(this.state.selecteddrink.count) > 0) && (this.state.type === "Add" ? this.state.filepath !== null : true)) ? "btn btn-dark instruments" : "btn btn-dark disabled instruments"}>OK</button>
                                </div>
                            </div>
                            : null
                                
                        }      
                    </div>
                </div>


            </div>
        );
    }
}