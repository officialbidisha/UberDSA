const folderList = [
  { id: 0, subfolders: [7, 3], name: "abc1" },
  { id: 0, subfolders: [], name: "abc2" },
  { id: 9, subfolders: [3], name: "abc3" },
  { id: 3, subfolders: [2], name: "abc4" },
  { id: 2, subfolders: [], name: "abc5" },
  { id: 7, subfolders: [], name: "abc6" },
  { id: 8, subfolders: [], name: "abc7" },
];

const target = 2;

function getPath(folderList, target) {
  const graph = new Map();
  for (let i = 0; i < folderList.length; i++) {
    let folder = folderList[i];
    if (!graph.has(folder.id)) {
      graph.set(folder.id, []);
    }
    graph
      .get(folder.id)
      .push({ name: folder.name, subfolders: folder.subfolders });
  }
  let paths = [];
  let queue = [];

  graph.get(0).map((x) => {
    queue.push({ path: x.name, id: 0, subfolders: x.subfolders });
  });
  while (queue.length > 0) {
    let { id, path, subfolders } = queue.shift();
    for (const subfolder of subfolders) {
      if (subfolder === target) {
        let name = graph.get(subfolder)[0].name;
        paths.push(`${path}/${name}`);
      }
      let folderDetails = graph.get(subfolder);
      if (folderDetails) {
        queue.push({
          id: subfolder,
          path: `${path}/${folderDetails[0].name}`,
          subfolders: folderDetails[0].subfolders,
        });
      }
    }
  }

  return paths.length > 0 ? paths : ""; // Return an empty string if the target is not found
}

console.log(getPath(folderList, 2));
