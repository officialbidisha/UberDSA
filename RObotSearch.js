function findRobotsWithMatchingQuery(locationMap, query) {
  const rows = locationMap.length;
  const cols = rows > 0 ? locationMap[0].length : 0;

  // Directions: [top, bottom, left, right]
  const directions = [
    [-1, 0], // Top
    [1, 0], // Bottom
    [0, -1], // Left
    [0, 1], // Right
  ];

  // Helper function to calculate distance to blocker using BFS
  function distanceToBlockerBFS(startRow, startCol, [dx, dy]) {
    let distance = 0;
    let [currentRow, currentCol] = [startRow, startCol];

    while (true) {
      currentRow += dx;
      currentCol += dy;
      distance++;

      // Check if we are out of bounds or hit a blocker
      if (
        currentRow < 0 ||
        currentRow >= rows ||
        currentCol < 0 ||
        currentCol >= cols ||
        locationMap[currentRow][currentCol] === "X"
      ) {
        return distance;
      }
    }
  }

  // Find all robots ('O') in the grid
  const robots = [];
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (locationMap[i][j] === "O") {
        robots.push([i, j]);
      }
    }
  }

  // Array to store the matching robots
  const matchingRobots = [];

  // Check each robot if it matches the query
  for (const [r, c] of robots) {
    const left = distanceToBlockerBFS(r, c, directions[2]); // Left
    const top = distanceToBlockerBFS(r, c, directions[0]); // Top
    const bottom = distanceToBlockerBFS(r, c, directions[1]); // Bottom
    const right = distanceToBlockerBFS(r, c, directions[3]); // Right

    // Compare distances with query
    if (
      left === query[0] &&
      top === query[1] &&
      bottom === query[2] &&
      right === query[3]
    ) {
      matchingRobots.push([r, c]);
    }
  }

  return matchingRobots;
}

// Test Case
const locationMap = [
  ["O", "E", "E", "E", "X"],
  ["E", "O", "X", "X", "X"],
  ["E", "E", "E", "E", "E"],
  ["X", "E", "O", "E", "E"],
  ["X", "E", "X", "E", "X"],
];

const query = [2, 2, 4, 1]; // Expected output: [[1, 1]]
console.log(findRobotsWithMatchingQuery(locationMap, query)); // Expected Output: [[1, 1]]
