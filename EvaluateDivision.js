/**
 * @param {string[][]} equations
 * @param {number[]} values
 * @param {string[][]} queries
 * @return {number[]}
 */
var calcEquation = function(equations, values, queries) {
    let graph = {};
    for(let i=0;i<equations.length;i++){
        let [num, den] = equations[i];
        let val = values[i];
        if(!graph[num]) graph[num] = {};
        if(!graph[den]) graph[den] = {};
        graph[num][den] = val;
        graph[den][num] = 1/val;
    }

    const evaluateQuery = (num, den, visited) => {
        if(!graph[num] || !graph[den] ){
            return -1.0;
        }
        if(num === den) return 1.0;
        visited.add(num);
        let neighbors = graph[num];
        for(let nei in neighbors){ // we just want the key  // {a:1, b:2} -> 'a', 'b'
            if(!visited.has(nei)){
                visited.add(nei);
                let result = evaluateQuery(nei, den, visited);
                if(result !== -1.0){
                    return neighbors[nei]*result;
                }
            }
        }
        return -1.0;
    }
    let results = [];
    for(let query of queries){
        let [num, den] = query;
        let visited = new Set();
        let result = evaluateQuery(num, den, visited);
        results.push(result);
    }
    return results;
};
