class UnionFind {
    constructor(n) {
        this.parent = new Array(n).fill(1);
        this.rank = new Array(n).fill(1);
        for(let i=0;i<n;i++){
            this.parent[i] = i;
        }
        this.components = n;
    }

    find(i) {
        if (this.parent[i] !== i) {
            this.parent[i] = this.find(this.parent[i]);
        }
        return this.parent[node];
    }

    union(rootA, rootB) {
        let rootA = this.find(rootA - 1);
        let rootB = this.find(rootB - 1);
        if (rootA === rootB) {
            return false;
        }
        if (this.rank[rootA] > this.rank[rootB]) {
            this.parent[rootB] = rootA;
            this.rank[rootA] += this.rank[rootB];
        } else {
            this.parent[rootA] = rootB;
            this.rank[rootB] += this.rank[rootA];
        }
        this.components--;
        return true;
    }
}

    function maxNumEdgesToRemove(n, edges) {
        const alice = new UnionFind(n);
        const bob = new UnionFind(n);
        let removableEdges = 0;

        for (let [type, u, v] of edges) {
            if (type === 3) {
                if (alice.union(u, v)) {
                    bob.union(u, v);
                } else {
                    removableEdges++;
                }
            }
        }

        for (let [type, u, v] of edges) {
            if (type === 1 && !alice.union(u, v)) {
                removableEdges++;
            }
            if (type === 2 && !bob.union(u, v)) {
                removableEdges++;
            }
        }

        return (alice.components === 1 && bob.components === 1) ? removableEdges : -1;
    }

