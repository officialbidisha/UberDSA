class Folder {
  constructor(id, subfolders, name) {
    this.id = id;
    this.subfolders = subfolders;
    this.name = name;
  }
}

class FolderStructure {
  constructor(folders) {
    this.graph = new Map();
    this.roots = [];
    this.cache = new Map();

    // Build the graph
    for (let folder of folders) {
      this.graph.set(folder.id, folder);
      if (folder.id === 0) {
        this.roots.push(folder.id);
      }
    }
  }

  findPath(folderId) {
    // Check if path is already cached
    if (this.cache.has(folderId)) {
      return this.cache.get(folderId);
    }

    // DFS function
    const dfs = (folderId, visited = new Set()) => {
      if (visited.has(folderId)) {
        throw new Error("Cycle detected in the folder structure");
      }

      visited.add(folderId);

      let folder = this.graph.get(folderId);
      if (folder.id === 0) {
        visited.delete(folderId);
        return folder.name;
      }

      for (let parent of this.roots) {
        let parentFolder = this.graph.get(parent);
        if (parentFolder.subfolders.includes(folderId)) {
          let result = dfs(parent, visited);
          if (result) {
            visited.delete(folderId);
            return result + "/" + folder.name;
          }
        }
      }

      visited.delete(folderId);
      return "";
    };

    // Try to find the path from each root folder
    for (let root of this.roots) {
      let result = dfs(folderId);
      if (result) {
        this.cache.set(folderId, result); // Cache the result
        return result;
      }
    }

    return "";
  }
}

// Example usage:
let folders = [
  new Folder(0, [7, 3], "abc"),
  new Folder(0, [], "xyz"),
  new Folder(3, [], "pqr"),
  new Folder(8, [], "def"),
  new Folder(7, [9], "ijk"),
  new Folder(9, [], "lmn")
];

let folderStructure = new FolderStructure(folders);
console.log(folderStructure.findPath(9)); // Output: "abc/ijk/lmn"
console.log(folderStructure.findPath(8)); // Output: ""
