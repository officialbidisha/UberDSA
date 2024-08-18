/**
 * @param {number[][]} heights
 * @return {number[][]}
 */
var pacificAtlantic = function(heights) {
    let atlanticSet = new Set();
    let pacificSet = new Set();
    let m = heights.length;
    let n = heights[0].length;
    let directions = [[1,0], [-1,0], [0,1], [0,-1]];
    for(let i=0;i<m;i++){
       dfs(i, 0, pacificSet, heights[i][0]);
       dfs(i, n-1, atlanticSet, heights[i][n-1]); 
    }
    for(let i=0;i<n;i++){
        dfs(0, i, pacificSet, heights[0][i]);
        dfs(m-1,i, atlanticSet, heights[m-1][i]);
    }

    function dfs(i, j, visitedSet, value){
        if(i<0 || i>=m || j<0 || j>=n || visitedSet.has(`${i}_${j}`) 
        || heights[i][j]<value){
            return;
        }
        visitedSet.add(`${i}_${j}`);
        
        for(let [dr, dc] of directions){
            let currentRow = i+dr;
            let currentCol = j+dc;
            dfs(currentRow, currentCol, visitedSet, heights[i][j]);
        }
    }
    
      let result = [];
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (atlanticSet.has(`${i}_${j}`) && pacificSet.has(`${i}_${j}`)) {
                result.push([i, j]);
            }
        }
    }

    return result;
};
