var Word = require("./word.js");
var inquirer = require("inquirer");

var letterArray = "abcdefghijklmnopqrstuvwxyz";

var WordsToGuess = [
    "triumph", "kawasaki", "honda", "suzuki", "yamaha"
];

var randomIndex = Math.floor(Math.random()*WordsToGuess.length);
var randomWord = WordsToGuess[randomIndex];

var computerWord = new Word(randomWord);

var requireNewWord = false;
var incorrectLetters = [];
var correctLetters = [];

var guessesLeft = 6;

function theLogic(){
    if(requireNewWord){
        var randomIndex = Math.floor(Math.random()*WordsToGuess.length);
        var randomWord = WordsToGuess[randomIndex];
        
        computerWord = new Word(randomWord);

        requireNewWord = false;
    }
    var wordComplete = [];

    if(wordComplete.includes(false)){
        inquirer.prompt([
            {
                type: "input",
                message: "Select a letter from A - Z",
                name: "userinput"
            }
        ]).then(function(input){
if (!letterArray.includes(input.userinput) || input.userinput.length > 1){
    console.log("\nTry Again");
    theLogic();
}
else {
    if (incorrectLetters.includes(input.userinput) || correctLetters.includes(input.userinput) || input.userinput === ""){
        console.log("\nAlready guessed\n");
        theLogic();
    }
    else {
        var wordCheckArray = [];

        computerWord.userGuess(input.userinput);

        computerWord.objArray.forEach(wordCheck);
        if (wordCheckArray.join("") === wordComplete.join("")){
            console.log("\nIncorrect\n");

            incorrectLetters.push(input.userinput);
            guessesLeft --;
        }
        else {
            console.log("\nCorrect\n");
            
            correctLetters.push(input.userinput);
        }
        computerWord();

        console.log("Guesses Left: " + guessesLeft + "\n");

        console.log("Letters Guessed: " + incorrectLetters.join(" ") + "\n");

        if(guessesLeft > 0 ){
            theLogic();
        }
        else {
            console.log("You Lost\n");
        }
        function wordCheck(key) {
            wordCheckArray.push(key.guessed);
        }
    }
}
        })
    }
    else{
        console.log("You Win\n");
    }
    }
    function restartGame(){
        inquirer.prompt([
            {
                type: "list",
                message: "Play again?",
                choices: ["Yes", "No"],
                name: "restart"
            }
        ]).then(function(input){
            if (input.restart === "Yes"){
                requireNewWord = true;
                incorrectLetters = [];
                correctLetters = [];
                guessesLeft = 6;
                theLogic();
            }
        });
    }
    theLogic();
