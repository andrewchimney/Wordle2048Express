let list = require("./wordlist234.json");
const fs = require('fs')
for(let j=0;j<1000;j++){


for(let i=0;i<list.wordlist.length-1;i++){
    if(list.wordlist[i].localeCompare(list.wordlist[i+1], "en")>0){
        let temp = list.wordlist[i]
        list.wordlist[i] = list.wordlist[i+1]
        list.wordlist[i+1]=temp;
    }
}
}
fs.writeFileSync('./wordlist234.json', JSON.stringify(list));
// class WordListChecker{
//     wordList;
//     constructor(){
//           this.wordList = require("./wordlist234.json").wordlist;//fetch("..//wordlist234.json", {
//         //     method: "get"
//         //  }).then(response => response.json());
//     }
//     check(word){
//         let min=0;
//         let max=this.wordList.length-1;
        
//         while(min<=max){
//             let mid = Math.floor(max+min)>>1;
//             let compare = word.localeCompare(this.wordList[mid], "en");
//             if(compare<0){
//                 max=mid-1;
//             } else if(compare>0){
//                 min=mid+1;
//             } else if(compare==0)  return true;
//         }
//         return false;


//     }
// }
// let checker = new WordListChecker()
// console.log(checker.check("GAY"));
// let list = require("./wordlist234.json");
// const fs = require('fs')


// for(let i=0;i<list.wordlist.length;i++){
//     list.wordlist[i]=list.wordlist[i].toUpperCase();
//     }
//     fs.writeFileSync('./wordlist234.json', JSON.stringify(list));