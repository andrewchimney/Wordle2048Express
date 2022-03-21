export default class WordListChecker {
    wordList2;
    wordList3;
    wordList4;
    constructor() {
        this.getWordlist();
        this.comparer = new Intl.Collator('en');
    }
    check2(word) {
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
    check3(word) {
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
    check4(word) {
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