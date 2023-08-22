const keyCont = document.getElementById("keyboard");
const wordCont = document.getElementById("wordContainer");
const boxes = document.getElementsByClassName("box");

grid = {
    0: [],
    1: [],
    2: [],
    3: [],
    4: [],
    5: [],
};
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

function Enter(){
    currentRow++;
}


function backSpace(){
    console.log(currentRow, currentLetter)
    let removeLet = document.getElementById(`${currentRow}${currentLetter-1}`)
    removeLet?.remove()
    currentLetter--;
}

function keyDown(){
    console.log(this.id)
    if(this.id == "backspace"){
        backSpace()
        console.log("backy")
        return;
    }
    else if(this.id == "ENTER"){
        Enter()
        
        return;
    }
    console.log(this.id)
    let row = document.getElementById(`row${currentRow}`)
    if(row == null){
        row = document.createElement("div")
        row.setAttribute('id', `row${currentRow}`)
        row.setAttribute('class', 'row')
        wordCont.append(row);
    }
    // row = document.getElementById(`row${currentRow}`)
    console.log(row)
    const newLetter = document.createElement("div");
    console.log("Letter", currentLetter)
    newLetter.setAttribute(`id`, `${currentRow}${currentLetter}`)
    grid[currentRow].push(this.id)
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

