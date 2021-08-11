export async function GetCoins() {
    let db_coins;
    let ex;
    await fetch('https://localhost:44347/api/coins')
        .then((response) => {
            if (response.status >= 200 && response.status<300)
                return response.json();
            throw "Ошибка при загрузке данных о монетах"
        }).then(data => {
            db_coins = data;
        }).catch((error) => {
            ex = error;
        });
    return { coins: db_coins, exception: ex };
}

export async function GetUserCoins() {
    let db_coins;
    let ex;
    await fetch('https://localhost:44347/api/coins/user')
        .then((response) => {
            if (response.status >= 200 && response.status < 300)
                return response.json();
            throw "Ошибка при загрузке данных о монетах"
        }).then(data => {
            db_coins = data;
        }).catch((error) => {
            ex = error;
        });
    return { coins: db_coins, exception: ex };
}


export async function SaveCoinsCount(coin) {
    let ex;
    await fetch('https://localhost:44347/api/coins', {
        method: "PUT",
        body: JSON.stringify(coin),
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    }).then((response) => {
        if (response.status < 200 || response.status >= 300)
        throw "Ошибка при изменении количества монет"
    }).catch((error) => {
        ex = error;
    });
    return ex;
}

export async function AddCoinToMashine(name) {
    let ex;
    await fetch('https://localhost:44347/api/coins/' + name
    ).then((response) => {
        if (response.status < 200 || response.status >= 300)
        throw "Ошибка при внесении монеты"
    }).catch((error) => {
        ex = error;
    });
    return ex;
}

export async function GetOddMoney(change) {
    let oddmoney;
    let ex;
    await fetch('https://localhost:44347/api/coins/oddmoney/' + change)
        .then((response) => {
            if (response.status >= 200 && response.status < 300)
                return response.json();
            throw "Ошибка при выдаче сдачи"
        }).then(data => {
            oddmoney = data;
        }).catch((error) => {
            ex = error;
        });
    return { oddmoney: oddmoney, exception: ex };            
}

export async function BlockToMashine(name) {
    let ex;
    await fetch('https://localhost:44347/api/coins/block/' + name
    ).then((response) => {
        if (response.status < 200 || response.status >= 300)
        throw "Ошибка при блокировки монеты"
    }).catch((error) => {
        ex = error;
    });
    return ex;
}



