/** https://leetcode.com/discuss/interview-question/5267395/Uber-SSE-frontend-ds-algo-interview-question */

const isValid = (pattern, toMatch) => {
  const patternIdx = {};

  // Store character indices for the pattern
  for (let i = 0; i < pattern.length; i++) {
    patternIdx[pattern[i]] = i;
  }

  let prevIdx = -1;

  for (const char of toMatch) {
    if (char in patternIdx) {
      const currentIdx = patternIdx[char];
      if (currentIdx <= prevIdx) {
        return false; // Out of order
      }
      prevIdx = currentIdx;
    }
  }

  return true;
};

// Example usage:
let pattern = "abcd";
let toMatch = "axubbxcxbxd";
console.log(isValid(pattern, toMatch)); // Expected output: false
