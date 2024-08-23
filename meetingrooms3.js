var mostBooked = function(n, meetings) {
    let roomUsage = new Array(n).fill(0);
    let roomAvailability = new Array(n).fill(0);

    meetings.sort((a, b) => a[0] - b[0]);

    for (let [start, end] of meetings) {
        let earliestRoom = 0;
        let earliestTime = Infinity;

        for (let i = 0; i < n; i++) {
            // immdediate booking
            /**
                If an available room is found:
                It increments the usage count of that room (roomUsage[i]++).
                It updates the availability of that room to the end time of the current meeting (roomAvailability[i] = end).
                It breaks out of the loop, as the room has been successfully booked.
             */
            if (roomAvailability[i] <= start) {
                roomUsage[i]++;
                roomAvailability[i] = end;
                earliestRoom = -1;
                break;
            }
            /*If no room is available at the start time, the algorithm finds the room that becomes available the earliest (roomAvailability[i] < earliestTime).*/
            if (roomAvailability[i] < earliestTime) {
                earliestTime = roomAvailability[i];
                earliestRoom = i;
            }
        }

        /*The meeting is then booked in the room that becomes available the earliest, and the room's availability is updated (roomAvailability[earliestRoom] += end - start).*/
        if (earliestRoom !== -1) {
            roomUsage[earliestRoom]++;
            roomAvailability[earliestRoom] += end - start;
        }
    }
    /*After processing all meetings, the algorithm finds the index of the room that has been used the most (Math.max(...roomUsage)).*/
    return roomUsage.indexOf(Math.max(...roomUsage));
};
