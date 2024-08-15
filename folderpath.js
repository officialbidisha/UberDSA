/**
*  
folderList = [
	{id: 0, subfolders : [7,3], name: 'abc1'},
	{id: 0, subfolders : [9], name: 'abc2'},
	{id: 9, subfolders : [], name: 'abc3'},
	{id: 3, subfolders : [2], name: 'abc4'},
	{id: 2, subfolders : [], name: 'abc5'},
	{id: 7, subfolders : [], name: 'abc6'},
	{id: 8, subfolders : [], name: 'abc7'}
];
for target folder = 2 it should return

/abc1/abc4/abc5
for target folder 8, it should return "" as it is not reachable from root.

*/



function folderPath(subfoldersList, targetID) {
  // Map to hold the folder structure
  const folderMap = new Map();

  // Build the graph from the given folder list
  subfoldersList.forEach((folder) => {
    const { id, subfolders, name } = folder;
    if (!folderMap.has(id)) {
      folderMap.set(id, []);
    }
    folderMap.get(id).push({ name, subfolders });
  });
  console.log(folderMap);

  // Perform BFS to find the path to the target folder
  const queue = folderMap
    .get(0)
    .map((rootFolder) => ({ path: rootFolder.name, id: 0 }));
  console.log("queue", queue);

  while (queue.length > 0) {
    const { path, id } = queue.shift();
    const currentFolders = folderMap.get(id);

    for (const folder of currentFolders) {
      if (id === targetID) {
        return `/${path}`;
      }

      folder.subfolders.forEach((subfolderID) => {
        const subfolders = folderMap.get(subfolderID);
        if (subfolders) {
          subfolders.forEach((subfolder) => {
            queue.push({ path: `${path}/${subfolder.name}`, id: subfolderID });
          });
        }
      });
    }
  }

  // If the target folder is not reachable from the root
  return "";
}

// Early exit, optimised

function folderPaths(subfoldersList, targetIDs) {
    // Map to hold the folder structure
    const folderMap = new Map();
    
    // Build the graph from the given folder list
    subfoldersList.forEach(folder => {
        const { id, subfolders, name } = folder;
        if (!folderMap.has(id)) {
            folderMap.set(id, []);
        }
        folderMap.get(id).push({ name, subfolders });
    });

    // Set to track targets
    const targetsSet = new Set(targetIDs);
    const paths = new Map();
    
    // Perform BFS to find the path to all target folders
    const queue = folderMap.get(0).map(rootFolder => ({ path: rootFolder.name, id: 0 }));
    
    while (queue.length > 0) {
        const { path, id } = queue.shift();
        const currentFolders = folderMap.get(id);

        for (const folder of currentFolders) {
            const currentPath = `${path}/${folder.name}`;

            // If it's a target folder, store the path
            if (targetsSet.has(id)) {
                paths.set(id, `/${currentPath}`);
                targetsSet.delete(id); // Remove the found target from the set
            }

            // Add subfolders to the queue for further exploration
            folder.subfolders.forEach(subfolderID => {
                if (folderMap.has(subfolderID)) {
                    queue.push({ path: currentPath, id: subfolderID });
                }
            });
        }

        // Early exit if all targets are found
        if (targetsSet.size === 0) {
            break;
        }
    }

    // Construct the result array
    return targetIDs.map(id => paths.get(id) || "");
}

// Example usage:
const folderList = [
    { id: 0, subfolders: [7, 3], name: "abc1" },
    { id: 0, subfolders: [9], name: "abc2" },
    { id: 9, subfolders: [], name: "abc3" },
    { id: 3, subfolders: [2], name: "abc4" },
    { id: 2, subfolders: [], name: "abc5" },
    { id: 7, subfolders: [], name: "abc6" },
    { id: 8, subfolders: [], name: "abc7" }
];

const targets = [2, 8, 7, 3, 9, 0];
console.log(folderPaths(folderList, targets)); 
// Output: [ '/abc1/abc4/abc5', '', '/abc1/abc6', '/abc1/abc4', '/abc2/abc3', '/abc1' ]

