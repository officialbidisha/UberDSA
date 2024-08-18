/**
 * @param {number[][]} buildings
 * @return {number[][]}
 */
var getSkyline = function(buildings) { 
    const heights = new Map(); // maintain a map of heights
    let events = [];
    for(let [start, end, height] of buildings){
        events.push([start, -height]);
        events.push([end, height]);
    }

    // sort first based on position else if same position, 
    // then sort by height
    events.sort(([x1,h1],[x2,h2])=> x1===x2? h1-h2: x1-x2 );

    const result = [];
    heights.set(0, 1);
    let maxHeight = -Infinity;
    // heights simply maintains a map of height where initial value is 0 , heiht 0
    for(let [pos, height] of events){
        if(height<0){
            heights.set(-height,( heights.get(-height)||0) + 1)
        }else{
            heights.set(height, (heights.get(height)-1));
            if (heights.get(height) === 0) {
                heights.delete(height);
            }
        }

        let currMaxHeight = Math.max(...heights.keys());
        if(maxHeight!== currMaxHeight){
            result.push([pos, currMaxHeight]);
            maxHeight = currMaxHeight;
        }
    }
    return result;

};
