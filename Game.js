var inquirer = require("inquirer");
var Word = require("./Word");
var words = require("./words");


function Game() {
    var self = this;
    this.play = function(){
        this.guessesLeft = 12;
        this.randomWord();
    }
    this.randomWord = function(){
        var randomWord = words[Math.floor(Math.random()*words.length)];
        console.log("random word: " +randomWord);
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
                console.log("you got it right. Move to next word");
                self.guessesLeft = 12;
                self.randomWord();
            }
            else{
                self.inquirerFunction();
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
                if(didGuessCorrectly){
                    console.log("correct");
                    self.guessesLeft--;
                    console.log("guess left: " +self.guessesLeft);
                }else{
                    console.log("IN correct");
                    self.guessesLeft--;
                    console.log("guess left: " +self.guessesLeft);
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