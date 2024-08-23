/**
 * @param {number} n
 * @param {number[][]} meetings
 * @return {number}
 */

var mostBooked = function(n, meetings) {
    let rooms_meetings_counter = new Array(n).fill(0);
    let available_rooms = new Array(n).fill(-1);
    meetings.sort((a, b) => a[0] - b[0]);

    meetings.map((meeting) => {
        let [start, end] = meeting;
        let earliestRoomIdx = 0;
        let earliestEndTime = Number.MAX_SAFE_INTEGER;

        let isAvailableRoomExist = false;

        for (let i = 0; i < n; i++) {
            if (available_rooms[i] <= start) {
                rooms_meetings_counter[i]++;
                available_rooms[i] = end;
                isAvailableRoomExist = true;
                break;
            }

            if (available_rooms[i] < earliestEndTime) {
                earliestEndTime = available_rooms[i];
                earliestRoomIdx = i;
            }
        }

        if (!isAvailableRoomExist) {
            rooms_meetings_counter[earliestRoomIdx]++;
            available_rooms[earliestRoomIdx] += end - start;
        }
    });

    return rooms_meetings_counter.indexOf(Math.max(...rooms_meetings_counter));
};
