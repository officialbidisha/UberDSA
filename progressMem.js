/*


memoize is a function that takes one argument, asynchronousFunction:
function memoize(asynchronousFunction) { }

where asynchronousFunction is a function that takes n arguments. The last argument of asynchronousFunction 
is a callback in the form of function callback(error, result).
Here's an example of asynchronousFunction:
function getSomeData(foo, bar, callback) {
  var uri = 'http://localhost?foo=' + foo + '&bar=' + bar;
  somehowNavigateUri(uri, function onResponse(error, response, body) {
    callback(error, body);
  });
}

Calling getSomeData with the same foo and bar arguments should result in the callback firing with the same data.
However, calling getSomeData multiple times, even with the same arguments will always trigger the costly XHR call.
One way to optimize repeated calls of getSomeData, we can create memoizedGetSomeData = memoize(getSomeData). 
memoizedGetSomeData should return a function of the same interface as getSomeData.
Calling memoizedGetSomeData with the same arguments multiple times should result in the callback being fired with the same result.
The result should be cached on the first invocation, and retrieved from the cache on every consecutive invocation, 
preventing the costly request call.

Task:
Implement memoize.
User Code
function slowFunction(param1, param2, callback) {
  setTimeout(function respond() {
// callback(null /* no error */, {
//       firstParameter: param1,
//       secondParameter: param2 // This can be anything, as long as it depends on the passed parameters
//     });
//   }, 1000 /* make it slow */);
// }

// slowFunction('foo', 'bar', function onFirstInvocation(error, data) {
//   // Should take 1 second
//   console.log(data);
//   slowFunction('foo', 'bar', function onSecondInvocation(error, data) {
//     // Should take 1 second
//     console.log(data);
//   });
// });

// var fastFunction = memoize(slowFunction);

// fastFunction('foo', 'bar', function onFirstInvocation(error, data) {
//   // Should take 1 second
//   console.log(data);
//   fastFunction('foo', 'bar', function onSecondInvocation(error, data) {
//     // Should be immediate / very fast!
//     console.log(data);
//   });
// });
// 



function memoize(fn) {
  let cache = {};
  return function memoized(...args) {
    let params = args.slice(0, args.length - 1);
    let cb = args[args.length - 1];
    let key = generateKey(params);
    if (cache.hasOwnProperty(key)) {
      console.log("---RETURNED FROM CACHE---");
      return cb(null, cache[key]);
    }
    fn(...params, (err, data) => {
      if (err) {
        return cb(err, null);
      } else {
        cache[key] = data;
        cb(null, data);
      }
    });
  };

  function generateKey(args) {
    return args
      .map((arg) => {
        if (typeof arg === "object") {
          return handleObject(arg);
        }
        if (typeof arg === "function") {
          return arg.toString();
        }
        if (typeof arg === "undefined") return "undefined";
        if (arg === null) return "null";
        return String(arg);
      })
      .sort()
      .join("|");
  }

  function handleObject(obj) {
    if (obj === null) return "null";
    if (typeof obj !== "object") return String(obj);
    const keys = Object.keys(obj).sort();
    let sortedObj = {};
    for (const key of keys) {
      sortedObj[key] = stableStringify(obj[key]); // Recursively process values
    }
    return JSON.stringify(sortedObj); // Convert sorted object to string
  }
}

// function slowFunction(param1, param2, callback) {
//   setTimeout(() => {
//     callback(null, {
//       firstParameter: param1,
//       secondParameter: param2, // Result depends on inputs
//     });
//   }, 4000); // Simulate a 4-second delay
// }

// let fastFunc = memoize(slowFunction);
// fastFunc("foo", "bar", function onFirstInvocation(error, data) {
//   // Should take 1 second
//   console.log(data);
//   fastFunc("bar", "foo", function onSecondInvocation(error, data) {
//     // Should be immediate / very fast!
//     console.log(data);
//   });
// });

// // Example of a slow function
// function slowFunction(param1, param2, callback) {
//   setTimeout(function respond() {
//     callback(null, {
//       firstParameter: param1,
//       secondParameter: param2 // This can be anything, as long as it depends on the passed parameters
//     });
//   }, 1000); // Simulate a delay
// }

// // Testing the memoize function
// let fastFunction = memoize(slowFunction);

// fastFunction('foo', 'bar', function onFirstInvocation(error, data) {
//   // Should take 1 second
//   console.log('First call:', data);
//   fastFunction('foo', 'bar', function onSecondInvocation(error, data) {
//     // Should be immediate / very fast!
//     console.log('Second call:', data);
//   });
// });

// // Testing another scenario
// function getSquare(x, cb) {
//   console.log("function executed", x);
//   setTimeout(() => {
//     cb(null, x * x);
//   }, 200);
// }

// let memoizedSquare = memoize(getSquare);

// memoizedSquare(4, (err, res) => {
//   if (!err) console.log('Square of 4:', res); // Should print 16
// });
// memoizedSquare(4, (err, res) => {
//   if (!err) console.log('Square of 4 again:', res); // Should print 16 (cached)
// });
// memoizedSquare(5, (err, res) => {
//   if (!err) console.log('Square of 5:', res); // Should print 25
// });
// memoizedSquare(6, (err, res) => {
//   if (!err) console.log('Square of 6:', res); // Should print 36
// });
// memoizedSquare(4, (err, res) => {
//   if (!err) console.log('Square of 4 again:', res); // Should print 16 (cached)
// });
