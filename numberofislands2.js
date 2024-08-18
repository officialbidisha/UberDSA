/**
 * @param {number} m
 * @param {number} n
 * @param {number[][]} positions
 * @return {number[]}
 */
var numIslands2 = function(m, n, positions) {
    if (m === 0 || n === 0) return 0;
    let grid = new Array(m).fill().map(() => new Array(n).fill(0));
    let parent = {};
    const UnionFind = function(m,n){
        let size = {};
        this.count = 0;

        this.add = (i,j) => {
            if (grid[i][j]===0){
                let id = `${i}_${j}`
                parent[id] = id;
                size[id] = 1;
                grid[i][j]=1;
                this.count++;
            }
        }

        this.find = (x) => {
            if (parent[x] === x) return x;
            parent[x] = this.find(parent[x]);
            return parent[x];
        }

        this.union = (x, y) => {
            let rootX = this.find(x);
            let rootY = this.find(y);

            if (rootX === rootY) return;
            if (size[rootX] > size[rootY]){
                size[rootX] += size[rootY];
                parent[rootY] = rootX;
            }else{
                size[rootY] += size[rootX];
                parent[rootX] = rootY;
            }
            this.count--;
        }
    }

    const UF = new UnionFind(m,n);
    const DIRS = [[1,0],[-1,0],[0,1],[0,-1]];
    let result = [];
    for (let position of positions){
        let [x, y] = position;
        let id = `${x}_${y}`;
        UF.add(x,y);
        for (let dir of DIRS){
            let nx = x+dir[0];
            let ny = y+dir[1];
            let nId = `${nx}_${ny}`
            if (nx>=0 && nx<m && ny>=0 && ny<n){
                if (grid[nx][ny] === 1) {
                    UF.union(id, nId);
                }
            }
        }
        result.push(UF.count)    
    
    }
    return result;
};
