
let name = 'Neo';
let loc = 'Msk';

//создаем класс
class Testing {
    constructor(name, loc){
        this.nam = name;
        this.loc = loc;
    }

    fSumm() {
        return console.log(this.nam);
    }
}

let exClass = new Testing(name, loc);
let exClass_01 = new Testing('Max', 'Spb');

// console.log(exClass);
// console.log(exClass_01);

// exClass.fSumm();
// exClass_01.fSumm();

// console.log(exClass);

class NewTesting extends Testing {
    constructor(name, loc, rate){
        super(name, loc)
        this.rate = rate;
    }

    fnewSumm(){
        // console.log('Новая функция');
    }
}

let newClass = new NewTesting('Piter', loc, 7)

// console.log(newClass);

// newClass.fSumm();
newClass.fnewSumm();

