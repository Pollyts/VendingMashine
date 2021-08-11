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


export async function SaveCoinsCount(coin) {
    await fetch('https://localhost:44347/api/coins', {
        method: "PUT",
        body: JSON.stringify(coin),
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    });
}

export async function AddCoinToMashine(name) {
    await fetch('https://localhost:44347/api/coins/' + name
    );
}

export async function GetOddMoney(change) {
        await fetch('https://localhost:44347/api/coins/oddmoney/' + change).then(response => { return response.json() })
            .then(data => {
                let oddmoney = data
            });
}

export async function BlockToMashine(name) {
    await fetch('https://localhost:44347/api/coins/block/' + name
    );
}



