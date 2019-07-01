var inquirer = require("inquirer");
var Word = require("./Word");
var words = require("./words");

// start the game, set guesses left, call random word function
function Game() {
    var self = this;
    this.play = function(){
        this.guessesLeft = 12;
        this.randomWord();
    }
    this.randomWord = function(){
        var randomWord = words[Math.floor(Math.random()*words.length)];
        // console.log("random word: " +randomWord);
        this.currentWord = new Word(randomWord);
        console.log("currentWord: "+this.currentWord);
        this.startGuessing();
    }
    this.startGuessing = function(){
        this.inquirerFunction().then(function(){
            if(self.guessesLeft < 1){
                console.log("No guesses left");
                self.restartGame();
            }
            else if(self.currentWord.guessedCorrectly()){
                console.log("You got it right!");
                // self.guessesLeft = 12;
                self.restartGame();
            }
            else{
                console.log("currentWord: "+ self.currentWord);
                self.startGuessing();
            }
            

        })
    }
    this.inquirerFunction = function(){
        return inquirer
            .prompt([
                {
                    type:"input",
                    name: "choice",
                    message: "Guess a letter"
                }
            ]).then(function(val){
                var didGuessCorrectly = self.currentWord.guessLetter(val.choice);
                // console.log(didGuessCorrectly);

                // console.log(val.choice);
                
                if(didGuessCorrectly){
                    console.log("correct");
                    self.guessesLeft--;
                    console.log("guesses left: " + self.guessesLeft);

                }else{
                    console.log("incorrect");
                    self.guessesLeft--;
                    console.log("guesses left: " + self.guessesLeft);
                }
            })
    }
    this.restartGame = function(){
        inquirer.prompt([
            {
                type: "confirm",
                name:"choice",
                message: "do you want to play again? "
            }
        ]).then(function(val){
            if(val.choice){
                self.play();
            }
            else{
                self.quit();
            }
        })
    }
    this.quit = function(){
        console.log("see you soon");
        process.exit(0);
    }

}
module.exports = Game;