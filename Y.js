/**
 * @param {number[][]} grid
 * @return {number}
 */
var minimumOperationsToWriteY = function(grid) {
    let ans = 0;
    let n = grid.length;
    let m = grid[0].length;
    function tryThis(grid, target, other){
        let count = 0;
        for(let i=0;i<n;i++){
         for(let j=0;j<n;j++){
            if((i===j && i<=Math.floor(n/2) && j<=Math.floor(n/2)) || (i+j===n-1 && i<=n/2 && j>=Math.floor(n/2)) 
            || (j== Math.floor(n/2) && i>= (Math.floor(n/2)+1) && i<=n)){
               if(grid[i][j] !== target) count++;
            }
            else{
                if(grid[i][j] !== other) count++;
            }

        }

        }

        return count;
    }

    return Math.min(tryThis(grid, 0, 1 ), tryThis(grid, 0, 2), tryThis(grid, 1, 0), tryThis(
        grid, 1, 2), tryThis(grid, 2, 0), tryThis(grid, 2, 1));
};
