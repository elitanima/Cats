
class Api {
    constructor (user){
        this.url = `https://cats.petiteweb.dev/api/single/${user}/`;
        this.user = user;
    }
// получить все карточки
    getCards() {
        return fetch(`${this.url}show`);
        }
// получить ID  всех карточек
    getIdCards() {
        return fetch(`${this.url}ids`);
    }
//получить информацию про карточку по ID
    getInfoCardId(id) {
        return fetch(`${this.url}show/${id}`);
    }
//добавить карточку
    addCard(bodyOfCat) {
        return fetch(`${this.url}add`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify(bodyOfCat)
        });
    }
//редактировать информацию о коте по ID
    editCard(body, id) {
        return fetch (`${this.url}update/${id}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify(body)
    });
    }
//Удалить кота по ID
    deleteCardId(id) {
        return fetch (`${this.url}delete/${id}`, {
        method: 'DELETE'
    });
    }
}