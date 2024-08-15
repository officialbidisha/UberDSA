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
