/* https://leetcode.com/discuss/interview-experience/2008790/uber-phone-screen */

class TrieNode {
    constructor() {
        this.children = {};
        this.isEnd = false; // Marks the end of a valid symbol
    }
}

class Trie {
    constructor() {
        this.root = new TrieNode();
    }

    // Insert a symbol into the trie
    insert(symbol) {
        let currentNode = this.root;
        for (const char of symbol) {
            if (!currentNode.children[char]) {
                currentNode.children[char] = new TrieNode();
            }
            currentNode = currentNode.children[char];
        }
        currentNode.isEnd = true;
    }

    // Search for the longest symbol in the trie starting from a word
    searchLongestPrefix(word) {
        let currentNode = this.root;
        let longestMatch = "";
        let currentMatch = "";

        for (const char of word) {
            if (!currentNode.children[char]) break;

            currentNode = currentNode.children[char];
            currentMatch += char;

            if (currentNode.isEnd) {
                longestMatch = currentMatch; // Update longest valid match
            }
        }

        return longestMatch;
    }
}

/**
 * Function to replace symbols in a name with bracketed forms using a Trie.
 * @param {string} name - The input name.
 * @param {string[]} symbols - List of symbols to match.
 * @param {boolean} replaceAll - Whether to replace all occurrences of symbols or just the first match.
 * @return {string} - The formatted phrase with symbols bracketed.
 */
function BreakingBad(name, symbols, replaceAll = false) {
    // Create a trie and insert all symbols
    const trie = new Trie();
    for (const symbol of symbols) {
        trie.insert(symbol.toLowerCase());
    }

    const words = name.split(" ");
    const bracketedWords = words.map(word => {
        let modifiedWord = word;
        let result = "";

        while (modifiedWord.length > 0) {
            const match = trie.searchLongestPrefix(modifiedWord.toLowerCase());
            if (match) {
                // Replace the matched symbol
                const startIndex = modifiedWord.toLowerCase().indexOf(match);
                result += `[${modifiedWord.slice(startIndex, startIndex + match.length)}]`;
                modifiedWord = modifiedWord.slice(startIndex + match.length);
                if (!replaceAll) break;
            } else {
                // Add the first character and continue
                result += modifiedWord[0];
                modifiedWord = modifiedWord.slice(1);
            }
        }

        return result;
    });

    return bracketedWords.join(" ");
}
