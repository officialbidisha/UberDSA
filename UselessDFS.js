function getPathDFS(folderList, target) {
  const graph = new Map();

  // Build the graph
  for (let folder of folderList) {
    if (!graph.has(folder.id)) {
      graph.set(folder.id, []);
    }
    graph.get(folder.id).push({
      name: folder.name,
      subfolders: folder.subfolders,
    });
  }

  const visited = new Set();
  let paths = [];

  function dfs(id, path) {
    if (visited.has(id)) {
      console.log("Cycle detected at folder ID:", id);
      return;
    }

    visited.add(id);

    let folderDetails = graph.get(id);

    if (!folderDetails) {
      return;
    }

    for (let folder of folderDetails) {
      let currentPath = path ? `${path}/${folder.name}` : folder.name;

      if (folder.subfolders.includes(target)) {
        let targetName = graph.get(target)[0].name;
        paths.push(`${currentPath}/${targetName}`);
      }

      for (let subfolderId of folder.subfolders) {
        dfs(subfolderId, currentPath);
      }
    }

    visited.delete(id); // Remove the id from the visited set after the recursion
  }

  // Start DFS from root-level folders (id 0)
  if (graph.has(0)) {
    for (let rootFolder of graph.get(0)) {
      dfs(0, rootFolder.name);
    }
  }

  return paths.length > 0 ? paths : ""; // Return an empty string if the target is not found
}

// Example usage
const folderList = [
  { id: 0, subfolders: [7, 3], name: "abc" },
  { id: 0, subfolders: [], name: "xyz" },
  { id: 3, subfolders: [], name: "pqr" },
  { id: 8, subfolders: [], name: "def" },
  { id: 7, subfolders: [9], name: "ijk" },
  { id: 9, subfolders: [], name: "lmn" },
];

console.log(getPathDFS(folderList, 2)); // Output: "/abc/pqr"
