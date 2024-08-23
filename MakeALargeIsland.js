
/**
 * @param {number[][]} grid
 * @return {number}
 */
var largestIsland = function(grid) {
    let m = grid.length;
    let n = grid[0].length;
    let maxArea = -Infinity;
    let areaMap = {};
    let startIndex = 2;
    let directions =[[0,1], [0,-1], [1,0], [-1,0]];
    function dfs(i, j, label){
        let area = 1;
        grid[i][j] = label;
        for(let [dx, dy] of directions){
            let nx = i+dx;
            let ny = j+dy;
            if(nx>=0 && ny>=0 && nx<m && nx<n && grid[nx][ny]=== 1){
                area+=dfs(nx, ny, label);
            }
        }
        return area;
    }

    for(let i=0;i<m;i++){
        for(let j=0;j<n;j++){
            if(grid[i][j] === 1){
                let area = dfs(i,j,startIndex);
                areaMap[startIndex] = area; 
                maxArea = Math.max(area, maxArea);
                startIndex++;
            }
        }
    }

    for(let i=0;i<m;i++){
        for(let j=0;j<n;j++){
            if(grid[i][j] === 0){
                let seen = new Set();
                let potentialArea = 1;
                for(let [dx,dy] of directions){
                    let nx = i+dx;
                    let ny = j+dy;
                    if(nx>=0 && nx<m && ny>=0 && ny<n && grid[nx][ny]>1){
                        let isLandId = grid[nx][ny];
                        if(!seen.has(isLandId)){
                            potentialArea+=areaMap[isLandId];
                            seen.add(isLandId);
                        }
                    }
                }
                maxArea = Math.max(maxArea, potentialArea);
            }
        }
    }

    // If the grid was all water, the largest island we can create is of size 1
    return maxArea === 0 ? 1 : maxArea;
};
