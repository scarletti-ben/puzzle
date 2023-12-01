//--------------------------------------------------
// Constants
//--------------------------------------------------

// Unicode space characters
const emsp = "\u2003";
const ensp = "\u2002";

// Nested dictionary to generate clues
const dictionaryArray = [
  {
    codes: [
      [false, false],
      [false, false],
      [false, false],
      [false, false]
    ],
    sentence: "All digits are wrong",
    output: [null, null, null, null]
  },
  {
    codes: [
      [true, true],
      [true, true],
      [false, false],
      [false, false]
    ],
    sentence: "Exactly two digits are correct and both are in the right place",
    output: [null, null, null, null]
  },
  {
    codes: [
      [true, true],
      [true, false],
      [true, false],
      [false, false]
    ],
    sentence:
      "Exactly three digits are right and exactly one is in the right place",
    output: [null, null, null, null]
  },
  {
    codes: [
      [true, true],
      [false, false],
      [false, false],
      [false, false]
    ],
    sentence: "Exactly one digit is correct and it is in the right place",
    output: [null, null, null, null]
  },
  {
    codes: [
      [true, false],
      [true, false],
      [false, false],
      [false, false]
    ],
    sentence: "Exactly two digits are right but both are in the wrong place",
    output: [null, null, null, null]
  },
  {
    codes: [
      [true, false],
      [false, false],
      [false, false],
      [false, false]
    ],
    sentence: "Exactly one digit is correct but it is in the wrong place",
    output: [null, null, null, null]
  }
];

//--------------------------------------------------
// Section to for Globals
//--------------------------------------------------

// Declare and Shuffle Possible Digits
let possibleDigits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
possibleDigits.sort(() => Math.random() - 0.5);

// Declare Answer
let answer = getAnswer(possibleDigits);

// Declare Outer Container
let outerContainer = document.createElement("div");
outerContainer.classList.add("outer-container");

//--------------------------------------------------
// Section to Handle Button Clicking and Visuals
//--------------------------------------------------

// Function to handle button click event and run changeColor function
function handleButtonClick(event) {
  const buttonClicked = event.target;
  const buttonValue = buttonClicked.textContent;
  console.log(`Button ${buttonValue} clicked`);
  changeColor(buttonClicked);
}

// Function to change button color when handleButtonClick function called
function changeColor(button) {
  const colors = ["transparent", "cyan", "orange", "pink"];
  const currentBgColor = button.style.backgroundColor || "transparent";
  let currentState = colors.indexOf(currentBgColor);
  button.style.backgroundColor = colors[(currentState + 1) % colors.length];
}

//--------------------------------------------------
// Section to Handle Answer and Clue Generation
//--------------------------------------------------

// Function to generate the answer
function getAnswer() {
  return possibleDigits.slice(0, 4);
}

// Function to get the indices of all items in an array that are null
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

// Function to populate an output array based on the answer and the nature of the digits
function addNumber(code, output) {
  let [correctDigit, correctPosition] = code;
  let blankIndices = getBlankIndices(output);
  let position;
  let number;

  if (correctDigit) {
    let valid = answer.filter((x) => !output.includes(x));
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
    let valid = possibleDigits.filter(
      (x) => !output.includes(x) && !answer.includes(x)
    );
    number = valid[Math.floor(Math.random() * valid.length)];
    position = blankIndices[Math.floor(Math.random() * blankIndices.length)];
  }

  if (position !== undefined && number !== undefined) {
    output[position] = number;
  }
}

// Function to update the output array in each dictionary in the dictionaryArray
function updateDictionaryArray(dictionaryArray) {
  dictionaryArray.forEach(({ codes, sentence, output }) => {
    codes.forEach((code) => {
      addNumber(code, output, answer, possibleDigits);
    });
  });
}

//----------------------------------------------------------------
// Section to Handle Displaying the Answer
//----------------------------------------------------------------

// Variable to store whether the spacebar was pressed
let spacebarPressed = false;

// Function to handle keydown events
function handleKeyPress(event) {
  if (event.code === "Space" && !spacebarPressed) {
    spacebarPressed = true;
    showAnswerContent();
  }
}

// Function to display the answer content
function showAnswerContent() {
  const innerContainer = document.createElement("div");
  innerContainer.classList.add("inner-container");
  outerContainer.appendChild(innerContainer);

  const buttonContainer = document.createElement("div");
  buttonContainer.classList.add("button-container");
  innerContainer.appendChild(buttonContainer);

  const answerString = answer.join('');
  for (let i = 0; i < answerString.length; i++) {
    const square = document.createElement("button");
    square.classList.add("blankSquare");
    square.textContent = answerString[i];
    buttonContainer.appendChild(square);
  }

  const paragraph = document.createElement("p");
  paragraph.textContent = "The answer";
  innerContainer.appendChild(paragraph);
}

//----------------------------------------------------------------
// Section to Run When HTML DOM (Document Object Model) Loads
//----------------------------------------------------------------

document.addEventListener("DOMContentLoaded", function () {
  
  //----------------------------------------------------------------
  // Section to Generate Answer and All Clues
  //----------------------------------------------------------------

  updateDictionaryArray(dictionaryArray);

  //----------------------------------------------------------------
  // Section for HTML Rendering
  //----------------------------------------------------------------

  dictionaryArray.forEach(({ codes, sentence, output }) => {
    const innerContainer = document.createElement("div");
    innerContainer.classList.add("inner-container");
    outerContainer.appendChild(innerContainer);

    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("button-container");
    innerContainer.appendChild(buttonContainer);

    const paragraph = document.createElement("p");
    paragraph.textContent = sentence;
    innerContainer.appendChild(paragraph);

    output.forEach((digit) => {
      const button = document.createElement("button");
      button.classList.add("colorButton", "white");
      button.textContent = digit;
      buttonContainer.appendChild(button);
      button.addEventListener("click", handleButtonClick);
    });
  });
  
  document.body.appendChild(outerContainer);
  
});

//----------------------------------------------------------------
// Section to Run after User Key Input
//----------------------------------------------------------------

// Event listener to check for keydown events
document.addEventListener("keydown", handleKeyPress);
