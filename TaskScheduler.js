/**
 * @param {character[]} tasks
 * @param {number} n
 * @return {number}
 */
var leastInterval = function(tasks, n) {
    if(n === 0) return tasks.length;
    let map = new Map();
    for(let i=0;i<tasks.length;i++){
        if(map.get(tasks[i])){
            map.set(tasks[i], map.get(tasks[i])+1);
        }
        else{
            map.set(tasks[i],1);
        }
    }
    let result = [];
    for(let entries of map.values()){
        result.push(entries);
    }
    let max = Math.max(...result);
    let lastRowLength = result.filter((x)=> x === max).length;
    return  Math.max((max-1)*(n+1)+lastRowLength, tasks.length);
};
