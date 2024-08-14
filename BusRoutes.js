// https://leetcode.com/problems/bus-routes

var numBusesToDestination = function(routes, source, target) {
    let routMap = new Map();
    if(source === target) return 0;
    let countOfBuses = 0;
    for(let i=0;i<routes.length;i++){
        for(let j=0;j<routes[i].length;j++){
            if(routMap.has(routes[i][j])){
                routMap.get(routes[i][j]).push(i);
            }else{
                routMap.set(routes[i][j], [i]);
            }
        }
    }
    if (!routMap.has(source)) return -1;
    let queue = [];
    let visited = new Set();
    for(let element of routMap.get(source)){
        queue.push(element);
        visited.add(element);
    }
    console.log(queue);
    while(queue.length>0){
        countOfBuses++;
        let size = queue.length;
        for(let i=0;i<size;i++){
            let stop = queue.shift();
            let buses = routes[stop];
            for(let j of buses){
                if(target === j) return countOfBuses;
                for(let route of routMap.get(j)){
                    if(!visited.has(route)){
                        visited.add(route);
                        queue.push(route);
                    }
                }
            }
        }
    }
    return -1;
};
