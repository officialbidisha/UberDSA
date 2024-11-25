/* https://leetcode.com/discuss/interview-experience/2008790/uber-phone-screen */

function BreakingBad(name, symbols) {
  class TrieNode {
    constructor() {
      this.children = {};
      this.isEnd = false;
    }
  }

  class Trie {
    constructor() {
      this.root = new TrieNode();
    }

    insert(word) {
      let node = this.root;
      for (let char of word.toLowerCase()) {
        if (!node.children[char]) {
          node.children[char] = new TrieNode();
        }
        node = node.children[char];
      }
      node.isEnd = true;
    }

    searchLongestPrefix(word) {
      let node = this.root;
      let longestPrefix = '';
      let currentPrefix = '';
      for (let char of word.toLowerCase()) {
        if (!node.children[char]) break;
        node = node.children[char];
        currentPrefix += char;
        if (node.isEnd) {
          longestPrefix = currentPrefix; // Update the longest valid match
        }
      }
      return longestPrefix;
    }
  }

  // Build the Trie with symbols
  const trie = new Trie();
  for (let symbol of symbols) {
    trie.insert(symbol);
  }

  const words = name.split(' ');
  let result = [];

  for (let word of words) {
    let modifiedWord = word;
    let transformedWord = '';

    // Process each word entirely
    while (modifiedWord.length > 0) {
      const match = trie.searchLongestPrefix(modifiedWord);
      if (match) {
        // Add the matched symbol with brackets
        transformedWord += `[${modifiedWord.slice(0, match.length)}]`;
        modifiedWord = modifiedWord.slice(match.length); // Remove matched portion
      } else {
        // Add the first unmatched character
        transformedWord += modifiedWord[0];
        modifiedWord = modifiedWord.slice(1);
      }
    }

    result.push(transformedWord);
  }

  return result.join(' ');
}

// Test case
const symbols = [
  'H',
  'He',
  'Li',
  'Be',
  'B',
  'C',
  'N',
  'F',
  'Ne',
  'Na',
  'Co',
  'Ni',
  'Cu',
  'Ga',
  'Al',
  'Si',
];

console.log(BreakingBad('henry alba', symbols));
