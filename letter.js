function Letter(char){
    //if a char is not a num or a letter
    this.visible = !/[a-z1-9]/i.test(char);

    this.char = char;

}
//  displays underscores
Letter.prototype.toString = function(){
    if(this.visible === true){
        return this.char;
    }
    return "_";
}

Letter.prototype.guess = function(charGuess){
    if(charGuess.toUpperCase() === this.char.toUpperCase()){
        this.visible = true;
        return true;
    }
    return false;
}

Letter.prototype.getSolution = function(){
    return this.char;
}

module.exports = Letter;