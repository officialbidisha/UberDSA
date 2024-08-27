/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {number[][]} descriptions
 * @return {TreeNode}
 */
var createBinaryTree = function(descriptions) {
    let nodesMap = new Map();
    let childSet = new Set();
    for(let [parent, child, isLeft] of descriptions){
        if(!nodesMap.has(parent)){
            nodesMap.set(parent, new TreeNode(parent));
        }
        if(!nodesMap.has(child)){
            nodesMap.set(child, new TreeNode(child));
        }
        isLeft? nodesMap.get(parent).left = nodesMap.get(child) : nodesMap.get(parent).right = nodesMap.get(child);
        childSet.add(child);
    }
    for(let [parent, child, isLeft] of descriptions){
        if(!childSet.has(parent)){
            return nodesMap.get(parent);
        }
    }
};
