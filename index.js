const filePathCorrect = 'Data/correct.txt';
const filePathWrong = 'Data/wrong.txt';

correct_element = document.getElementById('correct');
wrong_element = document.getElementById('wrong');

fetch(filePathCorrect)
    .then(response => response.text())
    .then(data => {
        data = data.split('\n');

        for (entry in data){
            data[entry] = data[entry].replace(/(\r\n|\n|\r)/gm, '');
        }
        correct_element.innerHTML = data[8712];
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
        }
        wrong_element.innerHTML = data[8712];
    })
    .catch(err => {
        console.error('Error reading file:', err);
    });