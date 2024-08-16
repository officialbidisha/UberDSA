// Parallel courses

var minimumSemesters = function(numCourses, prerequisites) {
    // Initialize the prerequisites list and in-degree array
    let prerequisitesList = [];
    for (let i = 0; i <= numCourses; i++) {
        prerequisitesList[i] = [];
    }
    
    let inDegree = Array(numCourses + 1).fill(0);

    // Build the graph
    prerequisites.forEach(([course, dependent]) => {
        prerequisitesList[course].push(dependent);
        inDegree[dependent]++;
    });

    let queue = [];
    // Initialize the queue with courses that have no prerequisites
    for (let i = 1; i <= numCourses; i++) {
        if (inDegree[i] === 0) {
            queue.push(i);
        }
    }

    let semesters = 0;
    let coursesTaken = 0;

    // Process the courses level by level (BFS-like approach)
    while (queue.length > 0) {
        let size = queue.length; // Capture the number of courses to process this semester
        for (let i = 0; i < size; i++) {
            let course = queue.shift(); // Dequeue the first course
            coursesTaken++;
            for (let dependent of prerequisitesList[course]) {
                inDegree[dependent]--;
                if (inDegree[dependent] === 0) {
                    queue.push(dependent); // Enqueue the dependent course
                }
            }
        }
        semesters++;
    }

    // Check if all courses were taken
    return coursesTaken === numCourses ? semesters : -1;
};
