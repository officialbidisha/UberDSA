
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

    console.log(graph);
  
    // Initialize the queue with root folders
    const queue = graph.get(0).map((rootFolder) => ({
      path: rootFolder.name,
      id: 0,
      subfolders: rootFolder.subfolders,
    }));

    console.log(
        'queue', queue
    );
    let paths = [];
  
    // // Perform BFS to find the path to the target folder
    while (queue.length > 0) {
      const { path, id, subfolders } = queue.shift();
  
      for (const subfolderId of subfolders) {
        // console.log(subfolderId);
        if (subfolderId === target) {
          const targetFolder = graph.get(subfolderId);
          paths.push( `${path}/${targetFolder[0].name}`);
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

  
    return paths.length>0 ? paths: ""; // Return an empty string if the target is not found
  }
  
  
  // Example usage:
  const folderList = [
    { id: 0, subfolders: [7, 3], name: "abc1" },
    { id: 0, subfolders: [], name: "abc2" },
    { id: 9, subfolders: [3], name: "abc3" },
    { id: 3, subfolders: [2], name: "abc4" },
    { id: 2, subfolders: [], name: "abc5" },
    { id: 7, subfolders: [], name: "abc6" },
    { id: 8, subfolders: [], name: "abc7" },
  ];
  
  const targets = [2, 8, 7, 3, 9, 0];
  console.log("---Results here -----")
  console.log(getPath(folderList, 8));
