//Wordle script

//word list of random englsish words (must be 5 letters long)
const wordList = ["apple", "beach", "candy", "demon", "eagle", "fairy", "giant", "happy", "igloo", "jelly", "kitty", "lucky", "magic", "noble", "ocean", "piano", "queen", "radio", "sunny", "tiger", "unity", "vivid", "witty", "xenon", "young", "abide", "baker", "cabin", "daisy", "eager", "fable", "gamer", "haste", "ideal", "joker", "karma", "laser", "mango", "oasis", "pilot", "quilt", "rider", "saint", "tango", "yacht", "zebra", "azure", "blink", "clown", "duvet", "elite", "flame", "gusto", "hazel", "infix", "joust", "koala", "lunar", "mirth", "nymph", "otter", "pique", "query", "riser", "sloth", "thyme", "ultra", "vixen", "whale", "xerox", "youth", "zesty"];


//randomly select a word from the word list
let word = wordList[Math.floor(Math.random() * wordList.length)];

//get each box into an array
let box1 = document.getElementById("box1");
let box2 = document.getElementById("box2");
let box3 = document.getElementById("box3");
let box4 = document.getElementById("box4");
let box5 = document.getElementById("box5");
let box6 = document.getElementById("box6");
let box7 = document.getElementById("box7");
let box8 = document.getElementById("box8");
let box9 = document.getElementById("box9");
let box10 = document.getElementById("box10");
let box11 = document.getElementById("box11");
let box12 = document.getElementById("box12");
let box13 = document.getElementById("box13");
let box14 = document.getElementById("box14");
let box15 = document.getElementById("box15");
let box16 = document.getElementById("box16");
let box17 = document.getElementById("box17");
let box18 = document.getElementById("box18");
let box19 = document.getElementById("box19");
let box20 = document.getElementById("box20");
let box21 = document.getElementById("box21");
let box22 = document.getElementById("box22");
let box23 = document.getElementById("box23");
let box24 = document.getElementById("box24");
let box25 = document.getElementById("box25");

//create an array of the boxes

//3d array of the boxes (5x5)
let boxArray = [[box1, box2, box3, box4, box5], [box6, box7, box8, box9, box10], [box11, box12, box13, box14, box15], [box16, box17, box18, box19, box20], [box21, box22, box23, box24, box25]];



//create an array of the word's letters
let wordArray = word.split("");
console.log(wordArray);

let loadingscreen = document.getElementById("loading");
let background = document.getElementById("background");
let game = document.getElementById("game");
let winscreen = document.getElementById("win");

function initialize() {
    //Hide the loading screen
    loadingscreen.style.display = "none";
    
    background.classList.add("bg-slate-900");
    game.classList.remove("hidden");

    //remove all the values from the boxes
    for (let i = 0; i < boxArray.length; i++) {
        for (let j = 0; j < boxArray[i].length; j++) {
            boxArray[i][j].value = "";
        }
    }

    run();
}

//listen for keypresses
document.addEventListener("keydown", function(event) {
    if (allowed_keys.includes(event.key)) {
        let key = event.key;
        console.log(key);
    }
});

let currow = 0;
let curcolumn = 0;
let allowed_keys = "abcdefghijklmnopqrstuvwxyz";


function run() {
    //when a key is pressed, populate the first row with the letter
    document.addEventListener("keydown", function(event) {
        if (allowed_keys.includes(event.key)) {
            let key = event.key;
            boxArray[currow][curcolumn].value = key;
            curcolumn++;
            console.log("if allowed_keys.includes(event.key) is true");

            // Check if the current row is complete
            if (curcolumn === boxArray[currow].length) {
                let row = boxArray[currow].map(x => x.value).join("");
                if (row === word) {
                    console.log("You win!");
                    //highlight the row green
                    for (let i = 0; i < boxArray[currow].length; i++) {
                        boxArray[currow][i].classList.add("bg-green-400");
                    }                 
                } else {
                    // Highlight incorrect letters in the row
                    for (let i = 0; i < boxArray[currow].length; i++) {
                        if (wordArray.includes(boxArray[currow][i].value)) {
                            if (boxArray[currow][i].value === wordArray[i]) {
                                boxArray[currow][i].classList.add("bg-green-400");
                            } else {
                                boxArray[currow][i].classList.add("bg-yellow-400");
                            }
                        } else {
                            boxArray[currow][i].classList.add("bg-red-400");
                        }
                    }
                    // Move to the next row
                    currow++;
                    curcolumn = 0;
                }
            }
        }
        //if the backspace key is pressed, go back a key
        else if (event.key == "Backspace") {
            console.log("backspace");
            if (curcolumn === 0) {
                if (currow > 0) {
                    currow--;
                    curcolumn = boxArray[currow].length - 1;
                    boxArray[currow][curcolumn].value = "";
                }
            } else {
                curcolumn--;
                boxArray[currow][curcolumn].value = "";
            }
        }

        if (curcolumn == 5) {
            console.log("curcolumn == 5");
            let row1 = boxArray[0].map(x => x.value).join("");
            if (row1 == word) {
                console.log("You win!");
                //highlight the row green
                for (let i = 0; i < boxArray[0].length; i++) {
                    boxArray[0][i].classList.add("bg-green-400");
                }
                //Hide everything else and show win screen
                game.classList.add("hidden");
                winscreen.classList.remove("hidden");

            } else {
                for (let i = 0; i < boxArray[0].length; i++) {
                    if (wordArray.includes(boxArray[0][i].value)) {
                        if (boxArray[0][i].value === wordArray[i]) {
                            boxArray[0][i].classList.add("bg-green-400");
                        } else {
                            boxArray[0][i].classList.add("bg-yellow-400");
                        }
                    } else {
                        boxArray[0][i].classList.add("bg-red-400");
                    }
                }
                currow++;
                console.log("you lose, going to the next row")
                curcolumn = 0;  
             
            }
        }
    });
}

initialize();