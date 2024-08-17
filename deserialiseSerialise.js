/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */

/**
 * Encodes a tree to a single string.
 *
 * @param {TreeNode} root
 * @return {string}
 */
var serialize = function(root) {
    if(root === null) return [];
    let data = [];
    function dfs(node){
       
        if(node === null){
            data.push("N");
            return;
        }
        data.push(node.val.toString())
        dfs(node.left);
        dfs(node.right);
    }
     dfs(root);
     return data.join(",");
};

/**
 * Decodes your encoded data to tree.
 *
 * @param {string} data
 * @return {TreeNode}
 */
var deserialize = function(data) {
    if(!data.length) return null;
    let res = data.split(',');
    let index = 0;
    function expandDfs(){
        if(res[index] === 'N'){
            index++;
            return null;
        }
        const node = new TreeNode(parseInt(res[index]));
        index++;
        node.left = expandDfs();
        node.right = expandDfs();
        return node;
    }
    return expandDfs();
};

/**
 * Your functions will be called as such:
 * deserialize(serialize(root));
 */
