/**
 * @param {number[][]} grid
 * @return {number}
 */
var orangesRotting = function(grid) {
    // multi-source bfs
    // why not dfs, as simultaneously rotting can happen from 2 source
    // so multi source bfs
    let queue = [];
    let time = 0;
    let freshOranges = 0;

    for(let i=0;i<grid.length;i++){
        for(let j=0;j<grid[0].length;j++){
            if(grid[i][j] === 1){
                freshOranges++;
            }
            if(grid[i][j] === 2){
                queue.push([i,j]);
            }
        }
    }
    if (freshOranges === 0) {
        return 0;
    }
    let directions = [[0,1], [0, -1], [1,0], [-1,0]];
    while(queue.length>0 && freshOranges ){
        let queueSize = queue.length;
        for(let i=0;i<queueSize;i++){
            let [r,c] = queue.shift();
            for(let [dr,dc] of directions){
                let row = r+dr;
                let col = c+dc;
                     if (row < 0 || row >= grid.length || col < 0 || col >= grid[0].length || grid[row][col] !== 1) {
                    continue;
                }
                grid[row][col] = 2;
                freshOranges--;
                queue.push([row,col]);

            }
        }
        time++;
    }

    return freshOranges===0? time: -1;

};
