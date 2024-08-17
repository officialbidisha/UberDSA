const countSubTrees = (n, edges, labels) => {
    const adjlist = Array.from({ length: n }, () => []);
    const ans = Array(n).fill(0);
    
    // Build adjacency list
    edges.forEach(([u, v]) => {
        adjlist[u].push(v);
        adjlist[v].push(u);
    });

    const dfs = (node, parent) => {
        const count = new Map();
        for (const neighbor of adjlist[node]) {
            if (neighbor !== parent) {
                const childCount = dfs(neighbor, node);
                // Merge child counts into the current count map
                for (const [key, value] of childCount.entries()) {
                    count.set(key, (count.get(key) || 0) + value);
                }
            }
        }
        
        // Update the count for the current node's label
        const label = labels[node];
        count.set(label, (count.get(label) || 0) + 1);
        ans[node] = count.get(label);
        
        return count;
    };

    dfs(0, -1);
    return ans;
};
