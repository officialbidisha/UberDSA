var mostBooked = function(n, meetings) {
    let roomUsage = new Array(n).fill(0);
    let roomAvailability = new Array(n).fill(0);

    meetings.sort((a, b) => a[0] - b[0]);

    for (let [start, end] of meetings) {
        let earliestRoom = 0;
        let earliestTime = Infinity;

        for (let i = 0; i < n; i++) {
            if (roomAvailability[i] <= start) {
                roomUsage[i]++;
                roomAvailability[i] = end;
                earliestRoom = -1;
                break;
            }
            if (roomAvailability[i] < earliestTime) {
                earliestTime = roomAvailability[i];
                earliestRoom = i;
            }
        }

        if (earliestRoom !== -1) {
            roomUsage[earliestRoom]++;
            roomAvailability[earliestRoom] += end - start;
        }
    }

    return roomUsage.indexOf(Math.max(...roomUsage));
};
