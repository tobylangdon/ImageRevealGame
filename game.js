const keyCont = document.getElementById("keyboard");
const wordCont = document.getElementById("wordContainer");
const boxes = document.getElementsByClassName("box");

const wordList = [
    "apple",
    "table",
    "knife",
    "wrist",
    "peace",
    "lunch",
    "tried",
    "storm",
    "quiet",
    "dough",
    "merry",
    "music",
    "juice",
    "tiger",
    "early",
    "motel",
    "pound",
    "smile",
    "train",
    "ocean",
    "sunny",
    "flame",
    "chest",
    "scale",
    "plant",
    "stone",
    "lunar",
    "swift",
    "thorn",
    "hotel",
    "globe",
    "daisy",
    "piano",
    "crane",
    "lemon",
    "sugar",
    "dance",
    "wagon",
    "frost",
    "charm",
    "crown",
    "proud",
    "saint",
    "queen",
    "baker",
    "grace",
    "pasta",
    "spear",
    "dream",
    "wheat",
    "flock",
    "bloom",
    "spoon",
    "vivid",
    "hazel",
    "power",
    "quiet",
    "oasis",
    "treat",
    "bliss",
    "beach",
    "brush",
    "peach",
    "badge",
    "curve",
    "flour",
    "glide",
    "horse",
    "knot",
    "lunar",
    "mound",
    "opera",
    "paint",
    "quilt",
    "sugar",
    "trick",
    "umbra",
    "vivid",
    "watch",
    "xerox",
    "yield",
    "zebra",
    // Add more words here...
];

let secretWord = wordList[Math.floor(Math.random() * wordList.length - 1) + 1];

grid = {};
currentRow = 0;
currentLetter = 0;

const keys = [
    "Q",
    "W",
    "E",
    "R",
    "T",
    "Y",
    "U",
    "I",
    "O",
    "P",
    "EMPTY",
    "A",
    "S",
    "D",
    "F",
    "G",
    "H",
    "J",
    "K",
    "L",
    "EMPTY",
    "ENTER",
    "Z",
    "X",
    "C",
    "V",
    "B",
    "N",
    "M",
    "<<",
];

function valueToColour(value) {
    const changeableVal = ((119 / 100) * value).toString();
    return `hsl(${changeableVal}, 69%, 50%)`;
}

function Enter() {
    if (currentLetter < 4) {
        console.log("Not enough letters");
        return;
    }
    let letters = {};
    for (const lett of secretWord) {
        letters[lett] ? (letters[lett] += 1) : (letters[lett] = 1);
    }

    let rowScore = 0;
    for (i = 0; i < grid[currentRow].length; i++) {
        let square = document.getElementById(`${currentRow}${i}`);
        let letter = grid[currentRow][i].toLowerCase();
        console.log(square);
        square.classList.add("enteredRow");
        if (letter == secretWord[i]) {
            rowScore += (100 - 100 / secretWord.length) / secretWord.length;
        } else if (secretWord.includes(letter) && letters[letter] > 0) {
            rowScore += 100 / (secretWord.length * 2);
            letters[letter]--;
        } else {
            if (rowScore > 5) {
                rowScore -= 5;
            }
        }
    }
    if (grid[currentRow].length == secretWord.length) {
        rowScore += 100 / secretWord.length;
    }
    // Adding a number to end of row to specify accuracy of word
    let row = document.getElementById(`row${currentRow}`);
    const score = document.createElement("div");

    score.setAttribute(`class`, `score`);
    score.textContent = Math.floor(rowScore).toString();
    score.style.color = valueToColour(rowScore);
    row.append(score);

    currentLetter = 0;
    currentRow++;
    // startRow();
}

function backSpace() {
    if (currentLetter > 0) {
        console.log(currentRow, currentLetter);
        let removeLet = document.getElementById(
            `${currentRow}${currentLetter - 1}`
        );
        grid[currentRow].pop();
        removeLet.textContent = "";
        currentLetter--;
    }
}

function keyDown() {
    if (this.id == "backspace") {
        backSpace();
        console.log("backy");
        return;
    } else if (this.id == "ENTER") {
        Enter();

        return;
    }
    let row = document.getElementById(`row${currentRow}`);
    if (row == null) {
        row = document.createElement("div");
        row.setAttribute("id", `row${currentRow}`);
        row.setAttribute("class", "row");
        wordCont.append(row);
    }
    row = document.getElementById(`row${currentRow}`);
    // const square = document.getElementById(`${currentRow}${currentLetter}`);
    // square.textContent = this.id;

    const newLetter = document.createElement("div");

    newLetter.setAttribute(`id`, `${currentRow}${currentLetter}`);
    if (!grid[currentRow]) {
        grid[currentRow] = [];
    }
    grid[currentRow].push(this.id);
    newLetter.textContent = this.id;
    row.append(newLetter);
    currentLetter++;
}

keys.forEach((key) => {
    const butEl = document.createElement("button");
    butEl.setAttribute("class", "key");
    if (key != "<<") {
        butEl.setAttribute("id", key);
    } else {
        butEl.setAttribute("id", "backspace");
    }
    if (key != "EMPTY") {
        butEl.textContent = key;
        butEl.addEventListener("click", keyDown);
    }

    keyCont.append(butEl);
});

// for (row in grid) {
//     let i = 0;
//     for (box of grid[row]) {
//         const boxEl = document.createElement("div");
//         boxEl.textContent = box;

//         boxEl.setAttribute("class", `box`);
//         boxEl.setAttribute("id", `${row}${i}`);
//         wordCont.append(boxEl);
//         i++;
//     }
// }
