
let possibleDigits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
possibleDigits.sort(() => Math.random() - 0.5);
let emsp = '\u2003'
let ensp = '\u2002' 

function getAnswer() {
  let answer = possibleDigits.slice(0, 4);
  return answer;
}

let answer = getAnswer();

function addNumber(code, output) {
  let [correctDigit, correctPosition] = code;
  let blankIndices = getBlankIndices(output);
  let position;
  let number;

  if (correctDigit) {
    let valid = answer.filter(x => !output.includes(x));
    number = valid[Math.floor(Math.random() * valid.length)];
    let correctIndex = answer.indexOf(number);

    if (correctPosition) {
      position = correctIndex;
    } else {
      for (let index of blankIndices) {
        if (index !== correctIndex) {
          position = index;
          break;
        }
      }
    }
  } else {
    let valid = possibleDigits.filter(x => !output.includes(x) && !answer.includes(x));
    number = valid[Math.floor(Math.random() * valid.length)];
    position = blankIndices[Math.floor(Math.random() * blankIndices.length)];
  }

  if (position !== undefined && number !== undefined) {
    output[position] = number;
  }

  console.log(output)
  console.log(output.join())


}

function getBlankIndices(x) {
  let indices = [];
  x.forEach((item, i) => {
    if (item === null) {
      indices.push(i);
    }
  });
  indices.sort(() => Math.random() - 0.5);
  return indices;
}

function renderElements(elements, division) {
  elements.forEach(element => {
    division.appendChild(element);
  });
}

function shuffleDivision() {
  const container = document.getElementById('core');
  const division = container.querySelector('.clues');
  const elements = Array.from(division.children);
  elements.sort(() => Math.random() - 0.5);
  renderElements(elements, division);
}

document.addEventListener('DOMContentLoaded', function () {

  let container = document.getElementById('core');
  let division = container.querySelector('.clues');

  {

    let output = [null, null, null, null];
    let codes = [
      [false, false],
      [false, false],
      [false, false],
      [false, false]
    ];
  
    for (let code of codes) {
      addNumber(code, output);
    }

    let sentence = output.join(' ') + emsp + "All digits are wrong";
    let element = document.createElement('p');
    element.textContent = sentence;
    division.appendChild(element);

  }

  {

    let output = [null, null, null, null];
    let codes = [
      [true, true],
      [true, true],
      [false, false],
      [false, false]
    ];
  
    for (let code of codes) {
      addNumber(code, output);
    }

    let sentence = output.join(' ') + emsp + "Exactly two digits are correct and both are in the right place";
    let element = document.createElement('p');
    element.textContent = sentence;
    division.appendChild(element);

  }

  {

    let output = [null, null, null, null];
    let codes = [
      [true, true],
      [true, false],
      [true, false],
      [false, false]
    ];
  
    for (let code of codes) {
      addNumber(code, output);
    }

    let sentence = output.join(' ') + emsp + "Exactly three digits are right and exactly one is in the right place";
    let element = document.createElement('p');
    element.textContent = sentence;
    division.appendChild(element);

  }

  {

    let output = [null, null, null, null];
    let codes = [
      [true, true],
      [false, false],
      [false, false],
      [false, false]
    ];
  
    for (let code of codes) {
      addNumber(code, output);
    }

    let sentence = output.join(' ') + emsp + "Exactly one digit is correct and it is in the right place";
    let element = document.createElement('p');
    element.textContent = sentence;
    division.appendChild(element);

  }

  {

    let output = [null, null, null, null];
    let codes = [
      [true, false],
      [true, false],
      [false, false],
      [false, false]
    ];
  
    for (let code of codes) {
      addNumber(code, output);
    }

    let sentence = output.join(' ') + emsp + "Exactly two digits are right but both are in the wrong place";
    let element = document.createElement('p');
    element.textContent = sentence;
    division.appendChild(element);

  }

  {

    let output = [null, null, null, null];
    let codes = [
      [true, false],
      [false, false],
      [false, false],
      [false, false]
    ];
  
    for (let code of codes) {
      addNumber(code, output);
    }

    let sentence = output.join(' ') + emsp + "Exactly one digit is correct but it is in the wrong place";
    let element = document.createElement('p');
    element.textContent = sentence;
    division.appendChild(element);

  }

  shuffleDivision()

  {

    let element = document.createElement('p');
    element.textContent = 'Answer ' + ensp;

    let spanElement = document.createElement('span');
    spanElement.className = 'spoiler';
    spanElement.textContent = answer.join(' ');

    element.appendChild(spanElement);

    let answerDiv = document.querySelector('.answer');
    answerDiv.appendChild(element);

  }

});
