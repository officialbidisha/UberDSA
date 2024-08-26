var taskSchedulerII = function (tasks, space) {
    let prevTime = {};
    let currTime = 0;
    for (let task of tasks) {
        if (currTime < prevTime[task] + space) {
            let breakTime = prevTime[task] + space - currTime + 1;
            currTime += breakTime;
        } else {
            currTime++;
        }
        prevTime[task] = currTime;
    }
    return currTime;
};
