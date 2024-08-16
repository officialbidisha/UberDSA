/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @param {number[][]} queries
 * @return {boolean[]}
 */
var checkIfPrerequisite = function(n, pres, qs) {
    let graph = new Array(n);
    for(let i=0;i<n;i++){
        graph[i] = new Array(n).fill(0);
    }
    console.log(graph);
    for(let [preq, course] of pres){
        graph[preq][course] = 1;
    }

    for(let mid =0;mid<n;mid++){
        for(let i=0;i<n;i++){
            for(let j=0;j<n;j++){
                if(graph[i][mid] && graph[mid][j]){
                    graph[i][j] = 1;
                }
            }
        }
    }

    let result = [];
    for(let [preq, course] of qs){
        result.push(graph[preq][course])
    };
    return result;
};
