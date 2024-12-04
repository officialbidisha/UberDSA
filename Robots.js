function findRobots(locationMap, query) {
  let rows = locationMap.length;
  let cols = locationMap[0].length;
  function getDistances(x, y) {
    let left,
      top,
      right,
      bottom = 0;
    for (let j = y - 1; j >= 0; j--) {
      if (locationMap[x][j] === "X") {
        return;
      }
      left++;
    }

    for (let j = y + 1; j < cols; j++) {
      if (locationMap[x][j] === "X") {
        return;
      }
      right++;
    }

    for (let i = x - 1; i >= 0; i--) {
      if (locationMap[i][y] === "X") break;
      top++;
    }

    // Distance to the bottom blocker or boundary
    for (let i = x + 1; i < rows; i++) {
      if (locationMap[i][y] === "X") break;
      bottom++;
    }

    return [left, top, bottom, right];
  }
  // Iterate through the grid to find robots
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (locationMap[i][j] === "O") {
        const distances = getDistances(i, j);
        if (distances.join(",") === query.join(",")) {
          result.push([i, j]);
        }
      }
    }
  }

  return result.length > 0 ? result : [[-1, 1]];
}
