/**
 * // Definition for a QuadTree node.
 * function Node(val,isLeaf,topLeft,topRight,bottomLeft,bottomRight) {
 *    this.val = val;
 *    this.isLeaf = isLeaf;
 *    this.topLeft = topLeft;
 *    this.topRight = topRight;
 *    this.bottomLeft = bottomLeft;
 *    this.bottomRight = bottomRight;
 * };
 */

/**
 * @param {number[][]} grid
 * @return {Node}
 */
var construct = function(grid) {
    const isValid = (grid,x,y,n) => {
        let val = grid[x][y];
        for(let i=x;i<x+n;i++){
            for(let j=y;j<y+n;j++){
                if(grid[i][j]!== val){
                    return false;
                }
            }
        }
        return true;
    }
    const solve = (grid,x,y,n) => {
        if(isValid(grid,x,y,n)){
            return new Node(grid[x][y], true);
        }
        else{
            let node = new Node(false, false);
             node.topLeft = solve(grid, x, y, n/2);
             node.topRight = solve(grid, x, y+(n/2),n/2);
             node.bottomLeft = solve(grid, x+(n/2), y, n/2);
             node.bottomRight = solve(grid, x+(n/2), y+(n/2), n/2);
             return node;
        }
    }

    return solve(grid,0,0,grid.length);
};
