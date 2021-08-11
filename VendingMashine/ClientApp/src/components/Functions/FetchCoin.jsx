export async function GetCoins() {
    let db_coins;
    await fetch('https://localhost:44347/api/coins')
        .then((response) => {
            return response.json();
        }).then(data => {
            db_coins = data;
        });
    return db_coins;
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



