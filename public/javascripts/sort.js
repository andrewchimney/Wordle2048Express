let list = require("../wordlist234.json");
const fs = require('fs')
for(let j=0;j<100;j++){


for(let i=0;i<list.wordlist.length-1;i++){
    if(list.wordlist[i].localeCompare(list.wordlist[i+1], "en")>0){
        let temp = list.wordlist[i]
        list.wordlist[i] = list.wordlist[i+1]
        list.wordlist[i+1]=temp;
    }
}
}
fs.writeFileSync('./wordlist234.json', JSON.stringify(list));