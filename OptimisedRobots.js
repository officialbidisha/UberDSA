function precomputeDistances(locationMap) {
  const rows = locationMap.length;
  const cols = rows > 0 ? locationMap[0].length : 0;

  // Initialize distance matrices for each direction
  const leftDist = Array.from({ length: rows }, () =>
    Array(cols).fill(Infinity)
  );
  const topDist = Array.from({ length: rows }, () =>
    Array(cols).fill(Infinity)
  );
  const bottomDist = Array.from({ length: rows }, () =>
    Array(cols).fill(Infinity)
  );
  const rightDist = Array.from({ length: rows }, () =>
    Array(cols).fill(Infinity)
  );

  // Directions: [top, bottom, left, right]
  const directions = [
    [-1, 0], // Top
    [1, 0], // Bottom
    [0, -1], // Left
    [0, 1], // Right
  ];

  // BFS to compute the distances for each direction
  function bfs(startRow, startCol, dx, dy, distArray) {
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
        distArray[startRow][startCol] = distance;
        return;
      }
    }
  }

  // Precompute distances for each direction for every cell
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (locationMap[r][c] === "O") {
        bfs(r, c, -1, 0, topDist); // Top
        bfs(r, c, 1, 0, bottomDist); // Bottom
        bfs(r, c, 0, -1, leftDist); // Left
        bfs(r, c, 0, 1, rightDist); // Right
      }
    }
  }

  return { leftDist, topDist, bottomDist, rightDist };
}

function findRobotsWithMatchingQuery(locationMap, query) {
  const { leftDist, topDist, bottomDist, rightDist } =
    precomputeDistances(locationMap);
  const robots = [];

  // Find all robots ('O') in the grid
  for (let i = 0; i < locationMap.length; i++) {
    for (let j = 0; j < locationMap[i].length; j++) {
      if (locationMap[i][j] === "O") {
        robots.push([i, j]);
      }
    }
  }

  // Array to store the matching robots
  const matchingRobots = [];

  // Check each robot if it matches the query
  for (const [r, c] of robots) {
    const left = leftDist[r][c]; // Left
    const top = topDist[r][c]; // Top
    const bottom = bottomDist[r][c]; // Bottom
    const right = rightDist[r][c]; // Right

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
