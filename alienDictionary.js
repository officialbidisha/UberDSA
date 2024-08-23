/**
 * @param {string[]} words
 * @return {string}
 */
var alienOrder = function(words) {
    const adj = {};
    for(let word of words){
        for(let char of word){
            if(!adj[char]){
                adj[char] = [];
            }
        }
    }
    for(let i=0;i<words.length-1;i++){
        let word1 = words[i];
        let word2 = words[i+1];
        let minLength = Math.min(word1.length, word2.length);
        if(word1.length> word2.length && word1.startsWith(word2)) return "";
        for(let j=0;j<minLength;j++){
            if(word1[j]!== word2[j]){
                adj[word1[j]].push(word2[j]);
                break;
            }
        }
    }
    let visiting = new Set();
    let visited = new Set();
    function dfs(index){
        if(visiting.has(index)) return false;
        if(visited.has(index)) return true;
        visiting.add(index);
        for(let nei of adj[index]){
            if(!dfs(nei)) return false;
        }
        visiting.delete(index);
        visited.add(index);
        return true;
    }

    for (let char in adj) {
        if (!dfs(char)) return "";
    }
    return [...visited].reverse().join('');
};
