/**
 * @param {number[][]} grid
 * @return {number}
 */
var maximumMinutes = function(grid) {
    directions = [
        [0, -1], // Left
        [0, 1],  // Right
        [-1, 0], // Up
        [1, 0]   // Down
    ];

    // Function to check if we can wait t time and still reach destination safely
    function isPossible(t, fireTime) {
        const m = fireTime.length;
        const n = fireTime[0].length;
        const visited = Array.from({ length: m }, () => Array(n).fill(false));
        const queue = [[0, 0]];
        let currTime = t;

        if (fireTime[0][0] <= currTime) return false;

        visited[0][0] = true;
        while (queue.length) {
            currTime++;
            const size = queue.length;
            for (let i = 0; i < size; i++) {
                const [x, y] = queue.shift();
                for (const [dx, dy] of this.directions) {
                    const nx = x + dx;
                    const ny = y + dy;
                    if (nx < 0 || ny < 0 || nx >= m || ny >= n || fireTime[nx][ny] === -1 || visited[nx][ny]) continue;
                    if (nx === m - 1 && ny === n - 1 && currTime <= fireTime[m - 1][n - 1]) return true;
                    if (currTime < fireTime[nx][ny]) {
                        visited[nx][ny] = true;
                        queue.push([nx, ny]);
                    }
                }
            }
        }
        return false;
    }

    // Function to update time when fire reaches each cell
    function updateFireTime(grid, fireTime) {
        const m = fireTime.length;
        const n = fireTime[0].length;
        const visited = Array.from({ length: m }, () => Array(n).fill(false));
        const queue = [];
        let currTime = 0;

        for (let i = 0; i < m; i++) {
            for (let j = 0; j < n; j++) {
                if (grid[i][j] === 1) {
                    visited[i][j] = true;
                    fireTime[i][j] = currTime;
                    queue.push([i, j]);
                } else if (grid[i][j] === 2) {
                    fireTime[i][j] = -1;
                }
            }
        }

        while (queue.length) {
            currTime++;
            const size = queue.length;
            for (let i = 0; i < size; i++) {
                const [x, y] = queue.shift();
                for (const [dx, dy] of this.directions) {
                    const nx = x + dx;
                    const ny = y + dy;
                    if (nx < 0 || ny < 0 || nx >= m || ny >= n || fireTime[nx][ny] === -1 || visited[nx][ny]) continue;
                    fireTime[nx][ny] = currTime;
                    visited[nx][ny] = true;
                    queue.push([nx, ny]);
                }
            }
        }
    }

    function maximumMinutes(grid) {
        const m = grid.length;
        const n = grid[0].length;
        const fireTime = Array.from({ length: m }, () => Array(n).fill(Number.MAX_SAFE_INTEGER));

        updateFireTime(grid, fireTime);

        let ans = -1;
        let left = 0;
        let right = m * n + 1;
        while (left <= right) {
            const mid = Math.floor(left + (right - left) / 2);
            if (isPossible(mid, fireTime)) {
                left = mid + 1;
                ans = mid;
            } else {
                right = mid - 1;
            }
        }
        return ans === m * n + 1 ? 1e9 : ans;
    }
    return maximumMinutes(grid);
};
