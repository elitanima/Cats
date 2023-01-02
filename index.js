//Присвоение имени пользователя
let user = 'Testing123'

//Создаем экземпляр класса 
let apiCats = new Api(user);

//Получаем элементы с html разметки
$modalFormEdd = document.querySelector('#modalFormEdd'); //модальное окно добавления
$card_view = document.querySelector('#card_view'); // секция отображения карточек

//Формирование html карточек
let htmlCard = (cat) => 
`<div class ="card" data-cardId=${cat.id}>
    <div class="img_card" style="background-image: url(${cat.image})"></div>
    <h3>${cat.name}</h3>
    <p>Возраст ${cat.age} лет</p>
    <button data-btn="description">Подробнее</button>
    <button class="basket" data-btn="delete">Удалить</button>
</div>`

//Async/await обработка ответов сервера
    //показать карточки
const getCards = async () => {
    try {
            const res = await apiCats.getCards();
            const data = await res.json();
            console.log(data);
            updateCard(data)
        return data;
    } catch (error) {
        alert(`Ошибка: ${error}`) //начать отсюда
    }
};
    //добавить карточку
const addCard = async (body) => {
    try {
            const res = await apiCats.addCard(body);
            const data = await res.json();
        return data;
    } catch (error) {
        alert(`Ошибка: ${error}`)
    }
};

//Слушатель на весь документ
document.addEventListener('click', (event) => {
    let key = event.target.dataset.btn;
    switch (key) {
        case 'show':
            getCards();
            break;
         
        case 'addCardForm':
            $modalFormEdd.classList.remove('hidden')
            break; 

        case 'addFormClose':
            $modalFormEdd.classList.add('hidden')
            break;    

        default:
            break;
    }
})

//Слушатель на форму добавления
document.forms.addFormName.addEventListener('submit', (event) => {
    event.preventDefault();
    let data = Object.fromEntries(new FormData(event.target).entries());
    data.id = Number(data.id);
    data.age = Number(data.age);
    data.rate = Number(data.rate);
    data.favorite = data.favorite === 'true';
    addCard(data);
    document.querySelector('#addFormId').reset();
})

//Функция формирования карточек
function updateCard(data) {
    data.forEach(cat => $card_view.insertAdjacentHTML("beforeend", htmlCard(cat)));
}