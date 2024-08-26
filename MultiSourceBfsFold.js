function preprocessPaths(folderList) {
    let graph = new Map();
    let rootFolders = new Set();

    // Build the graph and identify root folders
    for (let i = 0; i < folderList.length; i++) {
        let folder = folderList[i];
        if (!graph.has(folder.id)) {
            graph.set(folder.id, []);
        }
        graph.get(folder.id).push({ name: folder.name, subfolders: folder.subfolders });

        // Add root folders to the set
        if (folder.id === 0) {
            rootFolders.add(folder.id);
        }
    }

    let pathsMap = new Map();

    // Initialize the queue with all root folders
    for (const rootId of rootFolders) {
        const rootFoldersList = graph.get(rootId) || [];
        const queue = rootFoldersList.map((rootFolder) => ({
            path: rootFolder.name,
            id: rootId,
            subfolders: rootFolder.subfolders
        }));

        // Perform BFS to preprocess paths
        while (queue.length > 0) {
            const { path, id, subfolders } = queue.shift();

            // Store the path for the current folder ID
            if (!pathsMap.has(id)) {
                pathsMap.set(id, []);
            }
            pathsMap.get(id).push(path);

            for (const subfolderId of subfolders) {
                const subfolder = graph.get(subfolderId);
                if (subfolder) {
                    queue.push({
                        path: `${path}/${subfolder[0].name}`,
                        id: subfolderId,
                        subfolders: subfolder[0].subfolders
                    });
                }
            }
        }
    }

    return pathsMap;
}

function getPath(pathsMap, target) {
    if (pathsMap.has(target)) {
        return pathsMap.get(target);
    }
    return "";
}

// Example usage
const folderList = [
    { id: 0, subfolders: [7, 3], name: "abc1" },
    { id: 0, subfolders: [9], name: "abc2" },
    { id: 9, subfolders: [3], name: "abc3" },
    { id: 3, subfolders: [2], name: "abc4" },
    { id: 2, subfolders: [], name: "abc5" },
    { id: 7, subfolders: [], name: "abc6" },
    { id: 8, subfolders: [], name: "abc7" }
];

const targets = [2, 8, 7, 3, 9];
const pathsMap = preprocessPaths(folderList);

targets.forEach(target => {
    console.log(`Paths to folder ${target}:`, getPath(pathsMap, target));
});
