class Folder {
  constructor(id, subfolders, name) {
    this.id = id;
    this.subfolders = subfolders;
    this.name = name;
  }
}

const folderMap = new Map();  // A map to store folder information by id

function addFolder(f) {
  folderMap.set(f.id, f);
}

async function printPath(target) {
  // Convert folderMap to an array of folders
  const folderList = Array.from(folderMap.values());

  // Build a graph from the folderList
  let graph = new Map();
  for (const folder of folderList) {
    graph.set(folder.id, folder.subfolders);
  }

  let visited = new Set();

  function dfs(current) {
    if (visited.has(current)) return null;
    visited.add(current);

    let folder = folderMap.get(current);
    if (!folder) return null;

    if (current === target) return folder.name;

    for (const neighbor of graph.get(current) || []) {
      const result = dfs(neighbor);
      if (result) {
        return folder.name + "/" + result;
      }
    }

    return null;
  }

  let result = dfs(0);
  return result ? "/" + result : "";
}

// Example usage
const folders = [
  new Folder(0, [7, 3], "abc"),
  new Folder(0, [], "xyz"),
  new Folder(3, [], "pqr"),
  new Folder(8, [], "def"),
  new Folder(7, [9], "ijk"),
  new Folder(9, [], "lmn")
];

folders.forEach(addFolder);

(async () => {
  console.log(await printPath(9));  // Output: /abc/ijk/lmn
  console.log(await printPath(8));  // Output: ""
})();
