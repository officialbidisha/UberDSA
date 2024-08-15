function getPath(folderList, target) {
  let graph = new Map();

  // Build the graph
  for (let i = 0; i < folderList.length; i++) {
    let folder = folderList[i];
    if (!graph.has(folder.id)) {
      graph.set(folder.id, []);
    }
    graph
      .get(folder.id)
      .push({ name: folder.name, subfolders: folder.subfolders });
  }

  // Initialize the queue with root folders
  const queue = graph.get(0).map((rootFolder) => ({
    path: rootFolder.name,
    id: rootFolder.id,
    subfolders: rootFolder.subfolders,
  }));

  // Perform BFS to find the path to the target folder
  while (queue.length > 0) {
    const { path, id, subfolders } = queue.shift();

    for (const subfolderId of subfolders) {
      // console.log(subfolderId);
      if (subfolderId === target) {
        const targetFolder = graph.get(subfolderId);
        return `${path}/${targetFolder[0].name}`;
      }

      const subfolder = graph.get(subfolderId);
      if (subfolder) {
        queue.push({
          path: `${path}/${subfolder[0].name}`,
          id: subfolderId,
          subfolders: subfolder[0].subfolders,
        });
      }
    }
  }

  return ""; // Return an empty string if the target is not found
}


/////// Preprocess

function getPath(folderList, target) {
  let graph = new Map();
  let paths = new Map();

  // Build the graph
  for (let i = 0; i < folderList.length; i++) {
    let folder = folderList[i];
    if (!graph.has(folder.id)) {
      graph.set(folder.id, []);
    }
    graph.get(folder.id).push({
      name: folder.name,
      id: folder.id,
      subfolders: folder.subfolders,
    });
  }

  // Initialize the queue with root folders and preprocess paths
  const queue = graph.get(0).map((rootFolder) => ({
    path: rootFolder.name,
    id: rootFolder.id,
    subfolders: rootFolder.subfolders,
  }));

  while (queue.length > 0) {
    const { path, id, subfolders } = queue.shift();

    // Store the current path in the paths map
    paths.set(id, path);

    for (const subfolderId of subfolders) {
      const subfolder = graph.get(subfolderId);
      if (subfolder) {
        queue.push({
          path: `${path}/${subfolder[0].name}`,
          id: subfolderId,
          subfolders: subfolder[0].subfolders,
        });
      }
    }
  }

  // After preprocessing, retrieve the path for the target
  return paths; // Return an empty string if the target is not found
}

function folderPaths(subfoldersList, targetIDs) {
  // Preprocess paths from the root
  const paths = getPath(subfoldersList);

  // Retrieve paths for all target folders
  return targetIDs.map((id) => {
    return paths.get(id) ? `${paths.get(id)}` : "";
  });
}

// Example usage:
const folderList = [
  { id: 0, subfolders: [7, 3], name: "abc1" },
  { id: 0, subfolders: [9], name: "abc2" },
  { id: 9, subfolders: [], name: "abc3" },
  { id: 3, subfolders: [2], name: "abc4" },
  { id: 2, subfolders: [], name: "abc5" },
  { id: 7, subfolders: [], name: "abc6" },
  { id: 8, subfolders: [], name: "abc7" },
];

const targets = [2, 8, 7, 3, 9, 0];
console.log(folderPaths(folderList, targets));

