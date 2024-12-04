
// Task functions
function taskA(done) {
  console.log("Calling A");
  setTimeout(() => {
    console.log("Task A Completed");
    done();
  }, 500);
}

function taskB(done) {
  console.log("Calling B");
  setTimeout(() => {
    console.log("Task B Completed");
    done();
  }, 2000);
}

function taskC(done) {
  console.log("Calling C");
  setTimeout(() => {
    console.log("Task C Completed");
    done();
  }, 200);
}

function taskD(done) {
  console.log("Calling D");
  setTimeout(() => {
    console.log("Task D Completed");
    done();
  }, 500);
}

function taskE(done) {
  console.log("Calling E");
  setTimeout(() => {
    console.log("Task E Completed");
    done();
  }, 500);
}

// Step 1: Create the graph in the required format
const asyncGraph = {
  a: {
    dependencyList: [], // No dependencies
    task: taskA,
  },
  b: {
    dependencyList: [], // No dependencies
    task: taskB,
  },
  c: {
    dependencyList: [], // No dependencies
    task: taskC,
  },
  d: {
    dependencyList: ["a", "b"], // Depends on A and B
    task: taskD,
  },
  e: {
    dependencyList: ["c", "d"], // Depends on C and D
    task: taskE,
  },
};

// const asyncGraph = {
//   a: {
//     dependencyList: [],
//     task: (done) => {
//       console.log("Calling A");
//       setTimeout(() => {
//         console.log("Task A Completed");
//         done();
//       }, 500);
//     },
//   },
//   b: {
//     dependencyList: [],
//     task: (done) => {
//       console.log("Calling B");
//       setTimeout(() => {
//         console.log("Task B Completed");
//         done();
//       }, 2000);
//     },
//   },
//   c: {
//     dependencyList: [],
//     task: (done) => {
//       console.log("Calling C");
//       setTimeout(() => {
//         console.log("Task C Completed");
//         done();
//       }, 200);
//     },
//   },
//   d: {
//     dependencyList: ["a", "b"], // D depends on A and B
//     task: (done) => {
//       console.log("Calling D");
//       setTimeout(() => {
//         console.log("Task D Completed");
//         done();
//       }, 500);
//     },
//   },
//   e: {
//     dependencyList: ["c", "d"], // E depends on C and D
//     task: (done) => {
//       console.log("Calling E");
//       setTimeout(() => {
//         console.log("Task E Completed");
//         done();
//       }, 500);
//     },
//   },
// };

// Step 2: Function to execute the tasks
function runTasks(graph, callback) {
  const dependencyCount = {}; // Tracks unresolved dependencies
  const dependentsMap = {}; // Maps tasks to their dependents
  const taskQueue = []; // Queue for tasks ready to execute
  const completed = new Set(); // Tracks completed tasks

  // Initialize the graph
  for (const node in graph) {
    const { dependencyList } = graph[node]; // what tasks need to be finished befoee picking this up
    dependencyCount[node] = dependencyList.length;

    dependencyList.forEach((dependency) => {
      if (!dependentsMap[dependency]) {
        dependentsMap[dependency] = [];
      }
      dependentsMap[dependency].push(node); // push d in a's and b's map
    });

    // Tasks with no dependencies can be executed immediately
    if (dependencyList.length === 0) {
      taskQueue.push(node);
    }
  }

  // Function to process the next task
  function processNextTask() {
    if (taskQueue.length === 0) {
      if (completed.size === Object.keys(graph).length && callback) {
        callback();
      }
      return;
    }

    const currentTask = taskQueue.shift();
    const { task } = graph[currentTask];

    // Execute the current task
    task(() => {
      completed.add(currentTask);

      // Update dependents and check if they're ready to execute
      if (dependentsMap[currentTask]) {
        dependentsMap[currentTask].forEach((dependent) => {
          dependencyCount[dependent]--;
          if (dependencyCount[dependent] === 0) {
            taskQueue.push(dependent);
            processNextTask();
          }
        });
      }

      // Continue processing the next task
      processNextTask();
    });
  }

  // Start processing tasks
  processNextTask();
}

// Example usage:
runTasks(asyncGraph, () => {
  console.log("All tasks completed!");
});
