export default class WordListChecker {
    wordList;
    constructor() {
        this.getWordlist();
        this.comparer = new Intl.Collator('en');
    }
    check(word) {
        let min = 0;
        let max = this.wordList.length - 1;

        while (min <= max) {
            let mid = Math.floor(max + min) >> 1;
            let compare = this.comparer.compare(word, this.wordList[mid]);
            if (compare < 0) {
                max = mid - 1;
            } else if (compare > 0) {
                min = mid + 1;
            } else if (compare == 0) return true;
        }
        return false;


    }
    async getWordlist() {
        this.wordList = await fetch("../wordlists/wordlist234.json", {
            method: "get"
        }).then(response => response.json());
        this.wordList = this.wordList.wordlist;
    }
}