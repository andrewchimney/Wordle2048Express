export default class WordListChecker {
    wordList2;
    wordList3;
    wordList4;
    GRID_SIZE;
    constructor(GRID_SIZE) {
        this.getWordlist();
        this.comparer = new Intl.Collator('en');
        this.movesAvailable=false;
    }
    check2Exists(word) {
        let min = 0;
        let max = this.wordList2.length - 1;

        while (min <= max) {
            let mid = Math.floor(max + min) >> 1;
            let compare = this.comparer.compare(word, this.wordList2[mid]);
            if (compare < 0) {
                max = mid - 1;
            } else if (compare > 0) {
                min = mid + 1;
            } else if (compare == 0) return true;
        }
        return false;


    }
    check3Exists(word) {
        let min = 0;
        let max = this.wordList3.length - 1;

        while (min <= max) {
            let mid = Math.floor(max + min) >> 1;
            let compare = this.comparer.compare(word, this.wordList3[mid]);
            if (compare < 0) {
                max = mid - 1;
            } else if (compare > 0) {
                min = mid + 1;
            } else if (compare == 0) return true;
        }
        return false;


    }
    check4Exists(word) {
        let min = 0;
        let max = this.wordList4.length - 1;

        while (min <= max) {
            let mid = Math.floor(max + min) >> 1;
            let compare = this.comparer.compare(word, this.wordList4[mid]);
            if (compare < 0) {
                max = mid - 1;
            } else if (compare > 0) {
                min = mid + 1;
            } else if (compare == 0) return true;
        }
        return false;


    }
    check2LengthCV(array, word){
        if(this.check2Exists(word)){
            array[0].setCvTrue();
            array[1].setCvTrue();
            this.movesAvailable=true;
        }
    }
    check3LengthCV(array, word){
        this.check2LengthCV(array.slice(0,2), word.substring(0,2));
        this.check2LengthCV(array.slice(1,3), word.substring(1,3));
        if(this.check3Exists(word)){
            array[0].setCvTrue();
            array[1].setCvTrue();
            array[2].setCvTrue();
            this.movesAvailable=true;
        }
    }
    check4LengthCV(array, word){
        this.check3LengthCV(array.slice(0,3),word.substring(0,3));
        this.check3LengthCV(array.slice(1,4),word.substring(1,4));
        if(this.check4Exists(word)){
            array[0].setCvTrue();
            array[1].setCvTrue();
            array[2].setCvTrue();
            array[3].setCvTrue();
            this.movesAvailable=true;
        }

    }
    check2LengthCH(array, word){
        if(this.check2Exists(word)){
            array[0].setChTrue();
            array[1].setChTrue();
            this.movesAvailable=true;
        }
    }
    check3LengthCH(array, word){
        this.check2LengthCH(array.slice(0,2), word.substring(0,2));
        this.check2LengthCH(array.slice(1,3), word.substring(1,3));
        if(this.check3Exists(word)){
            array[0].setChTrue();
            array[1].setChTrue();
            array[2].setChTrue();
            this.movesAvailable=true;
        }
    }
    check4LengthCH(array, word){
        this.check3LengthCH(array.slice(0,3),word.substring(0,3));
        this.check3LengthCH(array.slice(1,4),word.substring(1,4));
        if(this.check4Exists(word)){
            array[0].setChTrue();
            array[1].setChTrue();
            array[2].setChTrue();
            array[3].setChTrue();
            this.movesAvailable=true;
        }

    }
    
    async getWordlist() {
        this.wordList2 = await fetch("../wordlists/wordlist2.json", {
            method: "get"
        }).then(response => response.json());
        this.wordList2 = this.wordList2.wordlist;
        this.wordList3 = await fetch("../wordlists/wordlist3.json", {
            method: "get"
        }).then(response => response.json());
        this.wordList3 = this.wordList3.wordlist;
        this.wordList4 = await fetch("../wordlists/wordlist4.json", {
            method: "get"
        }).then(response => response.json());
        this.wordList4 = this.wordList4.wordlist;
    }
}