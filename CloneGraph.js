/**
 * // Definition for a _Node.
 * function _Node(val, neighbors) {
 *    this.val = val === undefined ? 0 : val;
 *    this.neighbors = neighbors === undefined ? [] : neighbors;
 * };
 */

/**
 * @param {_Node} node
 * @return {_Node}
 */
var cloneGraph = function(node) {
    let visited = new Map();
    function dfs(node){
        if(node === null) return node;
        // to escape cycle
        if(visited.has(node)){
            return visited.get(node);
        }
        let copy = new Node(node.val, []);
        visited.set(node, copy);
        for(let nei of node.neighbors){
            copy.neighbors.push(dfs(nei));
        }
        return copy;
    }
    return dfs(node);
};
