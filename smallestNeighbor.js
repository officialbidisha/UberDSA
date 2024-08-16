// Find the City With the Smallest Number of Neighbors at a Threshold Distance
/**
 * @param {number} n
 * @param {number[][]} edges
 * @param {number} distanceThreshold
 * @return {number}
 */
var findTheCity = function(n, edges, distanceThreshold) {
    // Initialize the distance matrix with infinity
    const dist = [];
    for(let i=0;i<n;i++){
        dist[i] = [];
        for(let j=0;j<n;j++){
            dist[i][j] = Infinity;
        }
    }
    
    // Distance to itself is 0
    for (let i = 0; i < n; i++) {
        dist[i][i] = 0;
    }
    
    // Populate the distance matrix with the given edges
    for (const [u, v, w] of edges) {
        dist[u][v] = w;
        dist[v][u] = w;
    }
    
    // Floyd-Warshall algorithm
    for (let k = 0; k < n; k++) {
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                if (dist[i][j] > dist[i][k] + dist[k][j]) {
                    dist[i][j] = dist[i][k] + dist[k][j];
                }
            }
        }
    }
    
    // Find the city with the smallest number of reachable cities
    // and if there is a tie, choose the city with the greatest number.
    let minReachableCities = Infinity;
    let bestCity = -1;
    
    for(let i=0;i<n;i++){
        let reachableCities = 0;
        for(let j=0;j<n;j++){
            if(dist[i][j]<= distanceThreshold){
                reachableCities++;
            }
        }

        if(reachableCities<= minReachableCities){
            bestCity = i;
            minReachableCities = reachableCities;
        }

    }
    
    return bestCity;
};
