export default class WordListChecker{
    wordList;
    constructor(){
         this.wordList = fetch("..//wordlist.json", {
            method: "get"
         }).then(response => response.json());
    }
    check(word){
        let min=0;
        let max=this.wordList.length-1;
        
        while(min<=max){
            let mid = Math.floor(max+min)>>1;
            let compare = word.localeCompare(this.wordList[mid], "en");
            if(compare<0){
                max=mid-1;
            } else if(compare>0){
                min=mid+1;
            } else if(compare==0) return true;
        }
        return false;


    }
}