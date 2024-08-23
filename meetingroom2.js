/**
 * @param {number[][]} intervals
 * @return {number}
 */
var minMeetingRooms = function(intervals) {
    let starts = [];
    let ends = [];
    for(let [start, end] of intervals){
        starts.push(start);
        ends.push(end);
    }
    starts.sort((a,b)=> a-b);
    ends.sort((a,b)=>a-b);
    let s= 0, e=0;
    let count = 0;
    let maxCount = 0;
    while(s<intervals.length){
        if(starts[s]<ends[e]){
            s++;
            count++;
        }else{
            e++;
            count--;
        }
        maxCount= Math.max(count, maxCount);
    }
    return maxCount;
};
