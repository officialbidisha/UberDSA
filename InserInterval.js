/**
 * @param {number[][]} intervals
 * @param {number[]} newInterval
 * @return {number[][]}
 */
var insert = function(intervals, newInterval) {
    if(intervals.length === 0) return [newInterval];
    let n = intervals.length;
    let target = newInterval[0];
    let left = 0, right = n-1;
    while(left<=right){
        let mid = Math.floor((left+right)/2);
        if(intervals[mid][0]<target){
            left = mid+1;
        }else{
            right = mid-1;
        }
    }

    intervals.splice(left, 0, newInterval);

    /**
     * Merge overlapping intervals
     */
     let res = [];
     for(let interval of intervals){
        let [start, end] = interval;
        if(res.length === 0 || res[res.length-1][1] < start){
            res.push(interval);
        } else{
            res[res.length-1][1] = Math.max(res[res.length-1][1], end);
        }
     }
     return res;
};
