/**
 * @param {number[][]} grid
 * @return {number}
 */
let directions = [[0,1], [1,0], [0,-1], [-1,0]];
var shortestBridge = function(grid) {
    let m = rows = grid.length;
    let n = cols = grid[0].length;
    let found = false;
    let visited = new Set();
    let queue = [];
    for (let i = 0; i < m && !found; i++) {
        for (let j = 0; j < n && !found; j++) {
            if ( grid[i][j] === 1) {
                dfs(i,j);
                found = true;  
            }
        }
    }

    function dfs(i, j){
        visited.add(`${i}_${j}`);
        queue.push([i,j]);
        for(let [dx, dy] of directions){
            let currentRow = dx+i;
            let currentCol = dy+j;
        if (currentRow < 0 || currentRow >= m || currentCol < 0 || currentCol >= n || grid[currentRow][currentCol] !== 1 || visited.has(`${currentRow}_${currentCol}`)) {
            continue;
        }
            dfs(currentRow, currentCol);
        }
    }

    function bfs() {
        let distance = 0;
        while(queue.length>0){
            let size = queue.length;
            for(let i=0;i<size;i++){
                let [r, c] = queue.shift();
                for(let [dr, dc] of directions){ 
                    const newrow = r+dr;
                    const newcol = c+dc;
                    if(newrow>=0 && newrow<rows && newcol>=0 && newcol<cols && !visited.has(`${newrow}_${newcol}`)){
                        if(grid[newrow][newcol] === 1){
                            return distance;
                        }
                        queue.push([newrow, newcol]);
                        visited.add(`${newrow}_${newcol}`);
                    }
                }
            }
            distance++;
        }
     return -1;
    }

    return bfs();
};
