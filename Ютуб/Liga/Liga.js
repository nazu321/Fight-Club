
// random info

let userName =document.querySelector('.user-perc')
let opponentName = document.querySelector('.opponent-perc')
let userFoto =document.querySelector('.user-img')
let opponentFoto = document.querySelector('.opponent-img')

let user = []
let opponent = []

function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min) + min)
}

function nameChoice(input) {
    armor = getRandomArbitrary(10, 51)
    endurance = getRandomArbitrary(0, 9)
    trick = getRandomArbitrary(0, 9)
    dexterity = getRandomArbitrary(0, 9)
    health = getRandomArbitrary(80, 101) + (5*endurance)
    damage = getRandomArbitrary(10, 31) + (3*dexterity)
    let percName
    if(input == 'Дима' || input == 'Стас' || input == 'Сударь' || input == 'Лёха' || input == 'Даник'){
        switch (input){
            case 'Дима':
                userFoto.src = './images/Дима.jpg'
                percName = 'Дима слева'
            break;
            case 'Стас':
                userFoto.src = './images/стас.jpg'
                percName = 'Стас слева'
            break;
            case 'Сударь':
                userFoto.src = './images/сударь.png'
                percName = 'Сударь слева'
            break;
            case 'Лёха':
                userFoto.src = './images/Лёха.jpeg'
                percName = 'Лёха слева'
            break;
            case 'Даник':
                userFoto.src = './images/Даник.jpg'
                percName = 'Даник слева'
            break;
            default:
            break;
        }
        document.querySelector('.user-damage').textContent = 'Урон:' + String(damage)
        document.querySelector('.user-armor').textContent = 'Броня:' + String(armor)
        document.querySelector('.user-endurance').textContent = 'Выносливость:' + String(endurance)
        document.querySelector('.user-trick').textContent = 'Хитрость:' + String(trick)
        document.querySelector('.user-dexterity').textContent = 'Ловкость:' + String(dexterity)
        document.querySelector('.user-health').style.width = String(health*3) + 'px'
        document.querySelector('.user-health').textContent = health
    }else if(input == 'Димa' || input == 'Стaс' || input == 'Судaрь' || input == 'Лёхa' || input == 'Дaник'){
        switch (input){
            case 'Димa':
                opponentFoto.src = './images/Дима.jpg'
                percName = 'Димa справа'
            break;
            case 'Стaс':
                opponentFoto.src = './images/стас.jpg'
                percName = 'Стaс справа'
            break;
            case 'Судaрь':
                opponentFoto.src = './images/сударь.png'
                percName = 'Сударь справа'
            break;
            case 'Лёхa':
                opponentFoto.src = './images/Лёха.jpeg'
                percName = 'Лёхa справа'
            break;
            case 'Дaник':
                opponentFoto.src = './images/Даник.jpg'
                percName = 'Дaник справа'
            break;
            default:
            break;
        }
        document.querySelector('.opponent-damage').textContent = 'Урон:' + String(damage)
        document.querySelector('.opponent-armor').textContent = 'Броня:' + String(armor)
        document.querySelector('.opponent-endurance').textContent = 'Выносливость:' + String(endurance)
        document.querySelector('.opponent-trick').textContent = 'Хитрость:' + String(trick)
        document.querySelector('.opponent-dexterity').textContent = 'Ловкость:' + String(dexterity)
        document.querySelector('.opponent-health').style.width = String(health*3) + 'px'
        document.querySelector('.opponent-health').textContent = health
    }else {
        alert('Выберите персонажа')
    }
    return [health, armor, damage, trick, percName]
}

userName.addEventListener('change', () => {
    user = nameChoice(userName.value)
    console.log(user);
})
opponentName.addEventListener('change', () => {
    opponent = nameChoice(opponentName.value)
    console.log(opponent);
})


// battle
// play


let playBtn = document.querySelector('.play')
let hitBtn = document.querySelector('.hit')
let infoBtn = document.querySelector('.info-perc')
let infoResult = document.querySelector('.info-result')

function playClick(){
    playBtn.classList.add('hide')
    hitBtn.classList.remove('hide')
    hitBtn.classList.add('show')

}

playBtn.addEventListener('click', () => {
    if(user[0] == undefined || opponent[0] == undefined){
        alert('Выберите персонажа')
    }else {
        playClick()
    }
})

// hit

function hitClick(user, opponent) {
    if (user[0] > 0 && user[1] > ((user[1] * 0.03) - (0.25 * opponent[3]))) {
        if (user[0] < opponent[2]) {
            user[0] = 0;
            document.querySelector('.user-health').style.width = String(user[0] * 3) + 'px';
            document.querySelector('.user-health').textContent = 0
            opponent[2] = 0;
        } else {
            user[1] -= (user[1] * 0.03) - (0.25 * opponent[3]);
            user[1] = Math.floor(user[1])
            document.querySelector('.user-armor').textContent = 'Броня:' + String(user[1]);
            user[0] -= Math.floor(opponent[2] - (0.015 * user[1]))
            user[0] = Math.floor(user[0])
            document.querySelector('.user-health').style.width = String(user[0] * 3) + 'px';
            document.querySelector('.user-health').textContent = user[0]

            let opponentInfo = document.createElement('p');
            opponentValueInfo.append(opponentInfo);
            opponentInfo.classList = 'value-opponent';
            opponentInfo.textContent = Math.floor(opponent[2] - (0.015 * opponent[1])) + ' снято здоровья';
        }
    } else if (user[0] > 0 && user[1] < ((user[1] * 0.03) - (0.25 * opponent[3]))) {
        user[1] = 0;
        document.querySelector('.user-armor').textContent = 'Броня:' + String(user[1]);
        if (user[0] < opponent[2]) {
            user[0] = 0;
            document.querySelector('.user-health').style.width = String(user[0] * 3) + 'px';
            document.querySelector('.user-health').textContent = user[0]
            opponent[2] = 0;
        } else {
            user[0] -= opponent[2];
            user[0] = Math.floor(user[0])
            document.querySelector('.user-health').style.width = String(user[0] * 3) + 'px';
            document.querySelector('.user-health').textContent = user[0]

            let opponentInfo = document.createElement('p');
            opponentValueInfo.append(opponentInfo);
            opponentInfo.classList = 'value-opponent';
            opponentInfo.textContent = opponent[2] + ' снято здоровья';
        }
    }
    
    if (opponent[0] > 0 && opponent[1] > ((opponent[1] * 0.03) - (0.25 * user[3]))) {
        if (opponent[0] < user[2]) {
            opponent[0] = 0;
            document.querySelector('.opponent-health').style.width = String(opponent[0] * 3) + 'px';
            document.querySelector('.opponent-health').textContent = 0
            user[2] = 0;
        } else {
            opponent[1] = opponent [1] - (opponent[1] * 0.03) - (0.25 * user[3]);
            opponent[1] = Math.floor(opponent[1])
            document.querySelector('.opponent-armor').textContent = 'Броня:' + String(opponent[1]);
            opponent[0] -= Math.floor(user[2] - (0.015 * opponent[1]))
            opponent[0] = Math.floor(opponent[0])
            document.querySelector('.opponent-health').style.width = String(opponent[0] * 3) + 'px';
            document.querySelector('.opponent-health').textContent = opponent[0]

            let userInfo = document.createElement('p');
            userValueInfo.append(userInfo);
            userInfo.classList = 'value-user';
            userInfo.textContent = Math.floor(user[2] - (0.015 * user[1])) + ' снято здоровья';
        }
    } else if (opponent[0] > 0 && opponent[1] < ((opponent[1] * 0.03) - (0.25 * user[3]))) {
        opponent[1] = 0;
        document.querySelector('.opponent-armor').textContent = 'Броня:' + String(opponent[1]);
        if (opponent[0] < user[2]) {
            opponent[0] = 0;
            document.querySelector('.opponent-health').style.width = String(opponent[0] * 3) + 'px';
            document.querySelector('.opponent-health').textContent = opponent[0]
            user[2] = 0;
        } else {
            opponent[0] -= user[2];
            opponent[0] = Math.floor(opponent[0])
            document.querySelector('.opponent-health').style.width = String(opponent[0] * 3) + 'px';
            document.querySelector('.opponent-health').textContent = opponent[0]

            let userInfo = document.createElement('p');
            userValueInfo.append(userInfo);
            userInfo.classList = 'value-user';
            userInfo.textContent = user[2] + ' снято здоровья';
        }
    }

    let userHealth = document.createElement('p');
    userValueInfo.append(userHealth);
    userHealth.classList = 'value-user';
    userHealth.textContent = user[0] + ' здоровья';

    let userArmor = document.createElement('p');
    userValueInfo.append(userArmor);
    userArmor.classList = 'value-user';
    userArmor.textContent = user[1] + ' брони';

    let opponentHealth = document.createElement('p');
    opponentValueInfo.append(opponentHealth);
    opponentHealth.classList = 'value-opponent';
    opponentHealth.textContent = opponent[0] + ' здоровья';

    let opponentArmor = document.createElement('p');
    opponentValueInfo.append(opponentArmor);
    opponentArmor.classList = 'value-opponent';
    opponentArmor.textContent = opponent[1] + ' брони';

    if(user[0] <= 0 && opponent[0] <= 0){
        alert('draw')
        infoResult.textContent = 'Ничья'
        infoBtn.classList.remove('hide')
        infoBtn.classList.add('show')
        hitBtn.classList.remove('show')
        hitBtn.classList.add('hide')
    }else if(user[0] <= 0){
        alert('lose')
        infoResult.textContent = 'Победил ' + opponent[4]
        infoBtn.classList.remove('hide')
        infoBtn.classList.add('show')
        hitBtn.classList.remove('show')
        hitBtn.classList.add('hide')
    }else if(opponent[0] <= 0){
        alert('win')
        infoResult.textContent = 'Победил ' + user[4]
        infoBtn.classList.remove('hide')
        infoBtn.classList.add('show')
        hitBtn.classList.remove('show')
        hitBtn.classList.add('hide')
    }
    console.log('ssds');
}

let imgBattle = document.querySelector('.img-battle')

function zero(){
    imgBattle.src = ''
}
function punch(){
    imgBattle.src = './images/удар.gif'
}
hitBtn.addEventListener('click', () => {
    setTimeout(punch, 0)
    setTimeout(zero, 3000)
    setTimeout(hitClick(user, opponent), 3000)
})

// INFO

let userValueInfo = document.querySelector('.user-info-container')
let opponentValueInfo = document.querySelector('.opponent-info-container')
let infoPerc = document.querySelector('.info')
let popup = document.querySelector('.popup')

function infoClick() {
    popup.classList.remove('show')
    popup.classList.add('hide')
    infoPerc.classList.remove('hide')
    infoPerc.classList.add('show')
}

infoBtn.addEventListener('click', infoClick)

let infoBattleBtn = document.querySelector('.info-btn')
let restart = document.querySelector('.restart')

infoBattleBtn.addEventListener('click', () => {
    popup.classList.remove('hide')
    popup.classList.add('show')
    infoPerc.classList.remove('show')
    infoPerc.classList.add('hide')
    infoBtn.classList.remove('show')
    infoBtn.classList.add('hide')
    restart.classList.remove('hide')
    restart.classList.add('show ')
})