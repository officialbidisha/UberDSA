function maxNonRepeatingGroups(s) {
  let groups = [];
  let set = new Set();
  let left = 0;
  for (let right = 0; right < s.length; right++) {
    let char = s[right];
    if (set.has(char)) {
      groups.push(s.slice(left, right));
      left = right;
      set.clear();
    }
    set.add(char);
  }
  if (left < s.length) {
    groups.push(s.slice(left));
  }

  console.log(groups);
  return groups;
}

const s = "abacbc";
const result = maxNonRepeatingGroups(s);
console.log("Maximum number of non-repeating groups:", result); // Output: 3
