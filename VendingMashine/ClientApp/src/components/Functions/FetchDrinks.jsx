export async function GetDrinks() {
    let db_drinks;
    let ex;
    await fetch('https://localhost:44347/api/drinks')
        .then((response) => {
            if (response.status >= 200 && response.status < 300)
                return response.json();
            throw "Ошибка при загрузке данных о напитках"
        }).then(data => {
            db_drinks = data;
        }).catch((error) => {
            ex = error;
        });
    return { db_drinks: db_drinks, exception: ex };
}

export async function ReduceCountDrink(newdrink) {
    let ex;
    await fetch('https://localhost:44347/api/drinks', {
        method: "PUT",
        body: JSON.stringify(newdrink),
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    }).then((response) => {
        if (response.status < 200 && response.status >= 300)
        throw "Ошибка при добавлении напитка монеты"
    }).catch((error) => {
        ex = error;
    });
    return ex;
}

export async function DeleteDrink(id) {
    await fetch('https://localhost:44347/api/drinks/' + id,
        {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
}

export async function SendDrink(newdrink) {
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

export async function SaveImage(id, elwithimg) {
    await fetch('https://localhost:44347/api/drinks' + `/image/${id}`, {
        method: 'POST', 
        body: elwithimg, 
        headers: {
            'Accept': 'application/json'
        }
    }).then(function (response) {
        console.log(response.status)
    });
}


export async function PutImage(id, elwithimg) {
    await fetch('https://localhost:44347/api/drinks' + `/image/${id}`, {
        method: 'PUT',
        body: elwithimg,
        headers: {
            'Accept': 'application/json'
        }
    }).then(function (response) {
        console.log(response.status)
    });
}

export async function PutDrink(newdrink) {
    await fetch('https://localhost:44347/api/drinks', {
        method: "PUT",
        body: JSON.stringify(newdrink),
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    });
}