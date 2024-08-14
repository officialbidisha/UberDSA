// https://leetcode.com/problems/add-edges-to-make-degrees-of-all-nodes-even/

/**
 * @param {number} n
 * @param {number[][]} edges
 * @return {boolean}
 */
var isPossible = function(n, edges) {
  const graph = new Map();
  const degreeCount = new Map();
  let odds = [];
  for(let [node1, node2] of edges){
    if(!graph.has(node1)) { graph.set(node1, []);}
    if(!graph.has(node2)) { graph.set(node2, []);}
    graph.get(node1).push(node2);
    graph.get(node2).push(node1);
    degreeCount.set(node1, (degreeCount.get(node1)||0) +1);
    degreeCount.set(node2, (degreeCount.get(node2)||0) +1);
  }

  for(let [key, value] of degreeCount){
    if(value%2 == 1){
        odds.push(key);
    }
  }

  if(odds.length === 0 ) return true;
  if(odds.length === 2){
     let [node1, node2] = odds;
     if(!graph.get(node1).includes(node2)){
        return true;
     }
     for(let i=1;i<=n;i++){
        if(!graph.get(node1).includes(i) && !graph.get(node2).includes(i)){
            return true;
        }
     }
  }

  if(odds.length === 4){
    const [node1, node2, node3, node4] = odds;
    if(!graph.get(node1).includes(node2) && !graph.get(node3).includes(node4)){
        return true;
    }
    if(!graph.get(node1).includes(node3) && !graph.get(node2).includes(node4)){
        return true;
    }
    if(!graph.get(node1).includes(node4) && !graph.get(node2).includes(node3)){
        return true;
    }
  }
  return false;

};
