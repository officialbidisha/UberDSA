class FolderManager {
  constructor() {
    this.graph = new Map();
    this.rootFolders = new Set();
    this.lock = false; // Simple lock mechanism
  }

  // Simple lock function
  async _acquireLock() {
    while (this.lock) {
      await new Promise((resolve) => setTimeout(resolve, 10));
    }
    this.lock = true;
  }

  // Simple unlock function
  _releaseLock() {
    this.lock = false;
  }

  // Thread-safe method to add a folder
  async addFolder(folder) {
    await this._acquireLock(); // Acquire lock
    try {
      if (!this.graph.has(folder.id)) {
        this.graph.set(folder.id, folder);
      }
      if (folder.id === 0) {
        this.rootFolders.add(folder.id);
      }
    } finally {
      this._releaseLock(); // Release lock
    }
  }

  // Method to get the path from root to a target folder
  async printPath(target) {
    await this._acquireLock(); // Acquire lock
    try {
      if (!this.graph.has(target)) return ""; // No such folder

      let queue = [];
      let visited = new Set();

      // Initialize queue with root-level folders
      for (const rootId of this.rootFolders) {
        const rootFolder = this.graph.get(rootId);
        if (rootFolder) {
          queue.push({ path: rootFolder.name, id: rootFolder.id, subfolders: rootFolder.subfolders });
          visited.add(rootId);
        }
      }

      // BFS to find the path to the target folder
      while (queue.length > 0) {
        let { id, path, subfolders } = queue.shift();
        for (const subfolderId of subfolders) {
          if (visited.has(subfolderId)) continue;

          let subfolder = this.graph.get(subfolderId);
          if (subfolder) {
            if (subfolder.id === target) {
              return `${path}/${subfolder.name}`;
            }
            queue.push({
              id: subfolder.id,
              path: `${path}/${subfolder.name}`,
              subfolders: subfolder.subfolders,
            });
            visited.add(subfolderId);
          }
        }
      }
      return ""; // If no path found
    } finally {
      this._releaseLock(); // Release lock
    }
  }
}
