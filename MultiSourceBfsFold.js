function getPathsToTarget(folderList, target) {
    let graph = new Map();
    let folderNames = new Map();
    
    // Build the graph and folder names
    for (let folder of folderList) {
        graph.set(folder.id, folder.subfolders);
        folderNames.set(folder.id, folder.name);
    }

    // Initialize the queue with all root folders
    let queue = [];
    for (let folder of folderList) {
        if (folder.id === 0) { // Assuming 0 is the root folder id
            queue.push({ path: folder.name, id: folder.id });
        }
    }

    let paths = [];

    // Perform BFS to find all paths to the target folder
    while (queue.length > 0) {
        const { path, id } = queue.shift();

        // Check if the current folder is the target
        if (id === target) {
            paths.push(path);
        }

        // Add subfolders to the queue
        const subfolders = graph.get(id);
        if (subfolders) {
            for (const subfolderId of subfolders) {
                queue.push({
                    path: `${path}/${folderNames.get(subfolderId)}`,
                    id: subfolderId
                });
            }
        }
    }

    return paths; // Return all paths to the target
}

// Example usage:
const folderList = [
    { id: 0, subfolders: [7, 3], name: "abc1" },
    { id: 0, subfolders: [9], name: "abc2" },
    { id: 9, subfolders: [3], name: "abc3" },
    { id: 3, subfolders: [2], name: "abc4" },
    { id: 2, subfolders: [], name: "abc5" },
    { id: 7, subfolders: [], name: "abc6" },
    { id: 8, subfolders: [], name: "abc7" },
];

const targets = [2, 8, 7, 3, 9, 0];

for (const target of targets) {
    console.log(`Paths to ${target}: ${getPathsToTarget(folderList, target).join(', ')}`);
}
