/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {boolean}
 */
var canFinish = function(numCourses, prerequisites) {
    let prerequisitesList = [];
    let visiting = new Set();
    let visited = new Set();
    for(let i=0;i<numCourses;i++){
        prerequisitesList[i] = [];
    }
    for(let i=0;i<prerequisites.length;i++){
        let [course, dependent] = prerequisites[i];
        prerequisitesList[course].push(dependent);
    }
    for(let i=0;i< numCourses;i++){
     
        if(!dfs(i)){
            return false;
        }
    }

    function dfs(course){
        if(visited.has(course)) return true;
        if(visiting.has(course)) return false;
        visiting.add(course);
        for(let i=0;i<prerequisitesList[course].length;i++){
            if(!dfs(prerequisitesList[course][i])){
                return false;
            }
        }
        visiting.delete(course);
        visited.add(course);
        return true;
    }
    return true;
   
};
