class TimeMap {
    constructor() {             // O(1)
        this.map = new Map();   // SC: O(T)
    }
    set(key, value, timestamp) {    // O(1)
        const keyVals = this.map.has(key) ? this.map.get(key) : [];
        keyVals.push([timestamp, value]);
        this.map.set(key, keyVals);
    }
    get(key, timestamp) {           // O(logT)
        const keyTimestamps = this.map.has(key) ? this.map.get(key) : [];
        let left = 0,
            right = keyTimestamps.length - 1,
            mid, ts = null
        
		// using binary search to find the ts <= timestamp
        while(left <= right) {
            mid = left + Math.floor((right - left) / 2);
            if(keyTimestamps[mid][0] <= timestamp) {
                ts = keyTimestamps[mid][1];
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        return ts === null ? "" : ts;
    }
}