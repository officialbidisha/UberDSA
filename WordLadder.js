/**
 * @param {string} beginWord
 * @param {string} endWord
 * @param {string[]} wordList
 * @return {number}
 */
var ladderLength = function(beginWord, endWord, wordList) {
    // containing neighbor as adjacency list
    let graph = new Map();
    let count = 1;
    if(!wordList.includes(endWord)) return 0;
    if(beginWord === endWord) return 0;
    for(let i=0;i<wordList.length;i++){
        let word = wordList[i];
        for(let j=0;j<word.length;j++){
            let pattern = word.slice(0,j)+"*"+word.slice(j+1);
            if(!graph[pattern]) graph[pattern] = [];
            graph[pattern].push(word);
        }
    }
    return bfs(beginWord);

    function bfs(root){
        let queue = [root];
        let visited = new Set();
        visited.add(root);
        while(queue.length>0){
            let size = queue.length;
            for(let i=0;i<size;i++){
                let element = queue.shift();
                if(element === endWord) return count;
                for(let j=0;j<element.length;j++){
                    let pattern = element.slice(0,j)+"*"+ element.slice(j+1);
                    
                    if(graph[pattern]){
                        for(let word of graph[pattern]){
                            if(!visited.has(word)){
                                queue.push(word);
                                visited.add(word);
                            }
                        }
                    }
                    
                }
            }
            count++;

        }
        return 0;
    }

};
