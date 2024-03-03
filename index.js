const filePathCorrect = 'Data/correct.txt';
const filePathWrong = 'Data/wrong.txt';

document.addEventListener('DOMContentLoaded', function() {
    if(localStorage.getItem('current') === null){
        localStorage.setItem('current', 0);
    }
});
let correct_element = document.getElementById('correct');
let wrong_element = document.getElementById('wrong');
let wrong_data = [];
let correct_data = [];

let checkButton = document.getElementById('check');
let correctMessage = document.querySelector(".checker-container .correct-container");
let wrongMessage = document.querySelector(".checker-container .wrong-container");

document.addEventListener('keydown', function(){
    correctMessage.style.display = 'none';
    wrongMessage.style.display = 'none';
})
document.addEventListener('mousedown', function(){
    correctMessage.style.display = 'none';
    wrongMessage.style.display = 'none';
})
document.addEventListener('touchstart', function(){
    correctMessage.style.display = 'none';
    wrongMessage.style.display = 'none';
})

fetch(filePathCorrect)
    .then(response => response.text())
    .then(data => {
        data = data.split('\n');

        for (entry in data){
            data[entry] = data[entry].replace(/(\r\n|\n|\r)/gm, '');
            correct_data.push(data[entry]);
        }
    })
    .catch(err => {
        console.error('Error reading file:', err);
    });

fetch(filePathWrong)
    .then(response => response.text())
    .then(data => {
        data = data.split('\n');

        for (entry in data){
            data[entry] = data[entry].replace(/(\r\n|\n|\r)/gm, '');
            wrong_data.push(data[entry]);
        }
    })
    .catch(err => {
        console.error('Error reading file:', err);
    });


let startButton = document.getElementById('start');
let gameContainer = document.getElementById('game-container');
let mainConatiner = document.querySelector('main');

startButton.addEventListener('click', function(){
    gameContainer.style.display = 'flex';
    mainConatiner.style.display = 'none';

    wrong_element.innerText = wrong_data[localStorage.getItem('current')];

});

let progressBar = document.getElementById('progress');
progressBar.value = localStorage.getItem('current');

let backButton = document.getElementById('back');
backButton.addEventListener('click', function(){
    gameContainer.style.display = 'none';
    mainConatiner.style.display = 'block';
});

let previousButton = document.getElementById('previous');

previousButton.addEventListener('click', function(){
    let current = localStorage.getItem('current');
    if(current > 0){
        current--;
        progressBar.value = current;
        localStorage.setItem('current', current);
        wrong_element.innerText = wrong_data[current];
        wrong_element.contentEditable = true;
        correctMessage.style.display = 'none';
        wrongMessage.style.display = 'none';

        // let textContainer = document.querySelector('.text-container');
        // textContainer.removeChild(document.getElementById('correct_text'));
        wrong_element.style.display = 'block';
        correct_element.style.display = 'none';
    }
});

let nextButton = document.getElementById('next');
nextButton.addEventListener('click', function(){
    let current = localStorage.getItem('current');
    if(current < wrong_data.length - 1){
        current++;
        progressBar.value = current;
        localStorage.setItem('current', current);
        wrong_element.innerText = wrong_data[current];
        wrong_element.contentEditable = true;
        correctMessage.style.display = 'none';
        wrongMessage.style.display = 'none';

        // let textContainer = document.querySelector('.text-container');
        // textContainer.removeChild(document.getElementById('correct_text'));
        wrong_element.style.display = 'block';
        correct_element.style.display = 'none';
    }
});




checkButton.addEventListener('click', function(){
    if(correct_element.style.display === 'none'){
        let current = localStorage.getItem('current');
        if(correct_data[current] === wrong_element.innerText){
            wrong_element.contentEditable = false;
            correctMessage.style.display = 'flex';
            wrongMessage.style.display = 'none';
        }else{
            wrongMessage.style.display = 'flex';
            correctMessage.style.display = 'none';
        }
    }
})

let answerButton = document.getElementById('answer');
answerButton.addEventListener('click', function(){
    if((wrong_element.style.display !== 'none' && correctMessage.style.display === "none") || (wrong_element.style.display === '' && wrongMessage.style.display === "")){
        let current = localStorage.getItem('current');
        users_input = wrong_element.innerText.split('');
        correct_entry = correct_data[current].split('');

        // let textContainer = document.querySelector('.text-container');
        // let replaceElement = document.createElement('span');
        // replaceElement.id = 'correct_text';
        // replaceElement.spellcheck = false;
        // replaceElement.contentEditable = false;
        // replaceElement.role = 'textbox';

        let correct_element = document.getElementById('correct');
        correct_element.innerText = correct_data[current];
        correct_element.style.display = 'block';

        // let minussUser = 0;
        // let minussCorrect = 0;

        // let max = users_input.length > correct_entry.length ? users_input.length : correct_entry.length;

        // for (let i = 0; i < max; i++){
        //     if(users_input[i - minussUser] === correct_entry[i-minussCorrect]){
        //         let correctSpan = document.createElement('span');
        //         correctSpan.classList.add('correct');

        //         correctSpan.innerText = users_input[i-minussUser];

        //         replaceElement.appendChild(correctSpan);
        //     }else if(users_input[i-minussUser] !== correct_entry[i-minussCorrect] && (users_input[i-minussUser] !== ',')){
        //         let wrongSpan = document.createElement('span');
        //         wrongSpan.classList.add('wrong');

        //         wrongSpan.innerText = correct_entry[i-minussCorrect];

        //         replaceElement.appendChild(wrongSpan);

        //         minussUser++;
        //     }else if(users_input[i-minussUser] !== correct_entry[i-minussCorrect] && correct_entry[i-minussCorrect] === ' '){
        //         let wrongSpan = document.createElement('span');
        //         wrongSpan.classList.add('wrong-input');

        //         wrongSpan.innerText = users_input[i-minussUser];

        //         replaceElement.appendChild(wrongSpan);

        //         minussCorrect++;
        //         max++;
        //     }
        // }

        // wrong_element.style.display = 'none';

        // wrong_element.contentEditable = false;
        correctMessage.style.display = 'none';
        wrongMessage.style.display = 'none';
    }
})

let resetButton = document.getElementById('reset');
resetButton.addEventListener('click', function(){
    let current = localStorage.getItem('current');
    let correct_element = document.getElementById('correct');
    wrong_element.innerText = wrong_data[current];
    wrong_element.contentEditable = true;
    correctMessage.style.display = 'none';
    wrongMessage.style.display = 'none';

    // let textContainer = document.querySelector('.text-container');
    // textContainer.removeChild(document.getElementById('correct_text'));
    wrong_element.style.display = 'block';
    correct_element.style.display = 'none';
})