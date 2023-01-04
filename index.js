//Присвоение имени пользователя
let user = 'Testing123'

//Создаем экземпляр класса 
let apiCats = new Api(user);

// apiCats.urlName()
//Получаем элементы с html разметки
$modalFormEdd = document.querySelector('#modalFormEdd'); //модальное окно добавления
$card_view = document.querySelector('#card_view'); // секция отображения карточек
// console.log($card_view);

//Формирование html карточек
let htmlCard = (cat) => 
`<div class ="card" data-cardid=${cat.id}>
    <div class="img_card" style="background-image: url(${cat.image})"></div>
    <h3>${cat.name}</h3>
    <p>Возраст ${cat.age} лет</p>
    <button data-btn="description">Подробнее</button>
    <button class="basket" data-btn="delete">Удалить</button>
</div>`

// let testHtml = (cat) => `<h1>Привет ${cat.name} Мир!</h1>`

//Async/await обработка ответов сервера
    //показать карточки
const getCards = async () => {
    try {
            const res = await apiCats.getCards();
            // console.log(res);
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
            console.log(data);
        return data;
    } catch (error) {
        alert(`Ошибка: ${error}`) // alert("Ошибка:" error)
    }
};
    //удаление карточки
const deleteCard = async (id) => {
    const res = await apiCats.deleteCardId(id);
    const data = await res.json();
    console.log(data);
}

// getCards();

//addCard();

// deleteCard(1);


//Слушатель на весь документ
document.addEventListener('click', (event) => {
    let key = event.target.dataset.btn;
    // let sec = event.target.dataset.section;
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

        case 'delete':
            let elem = event.target.closest('div');
            let id = Number(elem.dataset.cardid);
            deleteCard(id);
            elem.remove();
            break;
            
        case 'section_show':
            console.log('Привет МИР!');
            break;   

        case 'modalend':
            $modalFormEdd.classList.add('hidden')
            break;  
        default:
            break;
    }
})

//Слушатель на форму добавления
document.forms.addFormName.addEventListener('submit', (event) => {
    // console.log(event.target);
    event.preventDefault();
    let data = Object.fromEntries(new FormData(event.target).entries());
    console.log(data);
    data.id = Number(data.id);
    data.age = Number(data.age);
    data.rate = Number(data.rate);
    data.favorite = data.favorite === 'true';
    addCard(data);
    // console.log(data)
    document.querySelector('#addFormId').reset();
    $modalFormEdd.classList.add('hidden')
})

//Функция формирования карточек
function updateCard(data) {
    console.log(data);
    data.forEach(cat => $card_view.insertAdjacentHTML("beforeend", htmlCard(cat)));
    // data.forEach(card => console.log(card))
    // data.forEach(cat => $card_view.insertAdjacentHTML("beforeend", testHtml(cat)));
}

