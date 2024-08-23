
var canAttendMeetings = function(intervals) {
    intervals = intervals.sort((a,b)=> a[0]-b[0]);
    let i=0;
    while(i<intervals.length-1){
        if(intervals[i][1]>intervals[i+1][0]){
            return false
        }
        i++;
    }
    return true;
};
