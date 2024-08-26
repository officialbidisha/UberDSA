let folderList = [
  { id: 0, subfolders: [7, 3], name: "abc1" },
  { id: 1, subfolders: [9], name: "abc2" },
  { id: 9, subfolders: [], name: "abc3" },
  { id: 3, subfolders: [2], name: "abc4" },
  { id: 2, subfolders: [], name: "abc5" },
  { id: 7, subfolders: [], name: "abc6" },
  { id: 8, subfolders: [], name: "abc7" },
];

const target = 2;

function getPath(folderList, target) {
  let graph = {};
  let path = "";

  // Build the graph from the folderList
  for (let i = 0; i < folderList.length; i++) {
    let folderElement = folderList[i];
    if (!graph[folderElement.id]) {
      graph[folderElement.id] = folderElement.subfolders;
    }
  }

  let visited = new Set();

  function dfs(source) {
    visited.add(source);

    let sourcePath = folderList.find((x) => x.id == source);

    if (source === target) return sourcePath.name;

    for (let neighbor of graph[source]) {
      if (!visited.has(neighbor)) {
        let result = dfs(neighbor);
        if (result) {
          return sourcePath.name + "/" + result;
        }
      }
    }

    return null;
  }

  let result = dfs(0);
  return result ? "/" + result : "";
}

let x = getPath(folderList, target);
console.log(x);
