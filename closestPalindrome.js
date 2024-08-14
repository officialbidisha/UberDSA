/**
 * @param {string} n
 * @return {string}
 */
var nearestPalindromic = function(n) {
    let len = n.length;
    let half = n.slice(0, Math.ceil(len / 2));
    let smallestDifference = Infinity;
    let result = null;
    let candidates = new Set([
        (Math.pow(10, len - 1) - 1).toString(),
        (Math.pow(10, len) + 1).toString(),
    ]);

    let mirror = half + half.split('').reverse().join('').slice(len % 2);
    let plusOne = (+half + 1).toString();
    let minusOne = (+half - 1).toString();

    candidates.add(mirror);
    candidates.add(plusOne + plusOne.split('').reverse().join('').slice(len % 2));
    candidates.add(minusOne + minusOne.split('').reverse().join('').slice(len % 2));

    candidates.delete(n);

    for (let candidate of candidates) {
        let diff = Math.abs(parseInt(candidate) - parseInt(n));

        if (diff < smallestDifference || (diff === smallestDifference && parseInt(candidate) < parseInt(result))) {
            result = candidate;
            smallestDifference = diff;
        }
    }
    return result;
};
