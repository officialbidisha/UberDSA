
   var checkWays = function (pairs) {
        const adj = new Map();

        // Build the adjacency list
        for (const [u, v] of pairs) {
            if (!adj.has(u)) adj.set(u, new Set());
            if (!adj.has(v)) adj.set(v, new Set());
            adj.get(u).add(v);
            adj.get(v).add(u);
        }

        // Create a max-heap based on the size of adjacency sets
        const pq = Array.from(adj.entries())
            .map(([node, neighbors]) => ({ degree: neighbors.size, node }))
            .sort((a, b) => b.degree - a.degree);
        
        const totalNodes = pq.length;
        let result = 1;
        const visited = new Set();

        // Process nodes in the order of non-increasing degree
        while (pq.length > 0) {
            const { node: currNode, degree } = pq.shift();
            
            // Find the neighboring node with the smallest degree that is >= currNode's degree and is visited
            let parent = null;
            let parentDegree = Infinity;

            for (const neighbor of adj.get(currNode)) {
                if (visited.has(neighbor) && adj.get(neighbor).size < parentDegree && adj.get(neighbor).size >= degree) {
                    parent = neighbor;
                    parentDegree = adj.get(neighbor).size;
                }
            }

            visited.add(currNode);

            // If no parent is found, check if currNode itself is the root
            if (parent === null) {
                if (degree !== totalNodes - 1) return 0;
                continue;
            }

            // Check if parent's adjacency list contains all nodes in currNode's adjacency list
            for (const neighbor of adj.get(currNode)) {
                if (neighbor === parent) continue;
                if (!adj.get(parent).has(neighbor)) return 0;
            }

            // Check the special case of multiple trees
            if (degree === parentDegree) {
                result = 2;
            }
        }

        return result;
    }

// Example usage
const pairs = [[1, 2], [2, 3]];
console.log(checkWays(pairs));  // Output: 1
