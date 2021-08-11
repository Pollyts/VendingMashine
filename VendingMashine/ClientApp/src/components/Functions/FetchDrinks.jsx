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
        throw "Ошибка при выдаче напитка"
    }).catch((error) => {
        ex = error;
    });
    return ex;
}

export async function DeleteDrink(id) {
    let ex;
    await fetch('https://localhost:44347/api/drinks/' + id,
        {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            if (response.status < 200 && response.status >= 300)
                throw "Ошибка при удалении напитка"
        }).catch((error) => {
            ex = error;
        });
    return ex;
}

export async function SendDrink(newdrink) {
    let id;
    let ex;
    await fetch('https://localhost:44347/api/drinks', {
        method: "POST",
        body: JSON.stringify(newdrink),
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    }).then((response) => {
        if (response.status >= 200 && response.status < 300)
            return response.json();
        throw "Ошибка при создании напитка"
    }).then(data => {
        id = data;
    }).catch((error) => {
        ex = error;
    });
    return { id: id, exception: ex };
}

export async function SaveImage(id, elwithimg) {
    let ex;
    await fetch('https://localhost:44347/api/drinks' + `/image/${id}`, {
        method: 'POST', 
        body: elwithimg, 
        headers: {
            'Accept': 'application/json'
        }
    }).then((response) => {
        if (response.status < 200 && response.status >= 300)
            throw "Ошибка при сохранении изображения"
    }).catch((error) => {
        ex = error;
    });
    return ex;
}


export async function PutImage(id, elwithimg) {
    let ex;
    await fetch('https://localhost:44347/api/drinks' + `/image/${id}`, {
        method: 'PUT',
        body: elwithimg,
        headers: {
            'Accept': 'application/json'
        }
    }).then((response) => {
        if (response.status < 200 && response.status >= 300)
            throw "Ошибка при сохранении изображения"
    }).catch((error) => {
        ex = error;
    });
    return ex;
}

export async function PutDrink(newdrink) {
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
            throw "Ошибка при изменении данных о напитке"
    }).catch((error) => {
        ex = error;
    });
    return ex;
}