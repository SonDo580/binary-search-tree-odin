function NodeFactory(data, left = null, right = null) {
  return { data, left, right };
}

function TreeFactory(array) {
  array = removeDuplicates(quickSort(array));

  let root = _buildTree(array);

  function _buildTree(array) {
    if (array.length === 0) {
      return null;
    }
    if (array.length === 1) {
      return NodeFactory(array[0]);
    }

    let middle = Math.floor((array.length - 1) / 2);
    let node = NodeFactory(array[middle]);
    node.left = _buildTree(array.slice(0, middle));
    node.right = _buildTree(array.slice(middle + 1));

    return node;
  }

  function prettyPrint(node = root, prefix = "", isLeft = true) {
    if (node === null) {
      console.log("Empty!");
      return;
    }

    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }

    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);

    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  }

  function insertValue(value, node = root) {
    if (node === null) {
      node = NodeFactory(value);
    } else if (value < node.data) {
      node.left = insertValue(value, node.left);
    } else if (value > node.data) {
      node.right = insertValue(value, node.right);
    } else if (value === node.data) {
      console.log("Value already exists in BST");
    }

    return node;
  }

  function deleteValue(value, node = root) {
    if (node === null) {
      console.log("Value not found");
      return node;
    }

    if (value < node.data) {
      node.left = deleteValue(value, node.left);
    } else if (value > node.data) {
      node.right = deleteValue(value, node.right);
    } else if (value === node.data) {
      // Node with only 1 child or no child
      if (node.left === null) {
        return node.right;
      } else if (node.right === null) {
        return node.left;
      }

      // Node with 2 children:
      // Get the smallest value in the right subtree
      node.data = _minValue(node.right);
      // Delete the node with smallest value in the right subtree
      node.right = deleteValue(node.data, node.right);
    }

    return node;
  }

  function _minValue(node) {
    let min = node.data;
    while (node.left !== null) {
      min = node.left.data;
      node = node.left;
    }
    return min;
  }

  function findValue(value, node = root) {
    if (node === null) {
      return node;
    }

    if (value < node.data) {
      return findValue(value, node.left);
    } else if (value > node.data) {
      return findValue(value, node.right);
    } else if (value === node.data) {
      return node;
    }
  }

  function levelOrder(cb = null, node = root) {
    if (node === null) {
      return [];
    }

    const queue = [];
    queue.push(node);

    const arr = [];

    while (queue.length > 0) {
      let currentNode = queue.shift();
      if (cb !== null) {
        cb(currentNode.data);
      }
      arr.push(currentNode.data);

      if (currentNode.left !== null) {
        queue.push(currentNode.left);
      }

      if (currentNode.right !== null) {
        queue.push(currentNode.right);
      }
    }

    return arr;
  }

  function inOrder(cb = null, node = root) {
    if (node === null) {
      return [];
    }

    let arr = [];

    if (node.left !== null) {
      arr = [...inOrder(cb, node.left)];
    }

    if (cb !== null) {
      cb(node.data);
    }
    arr.push(node.data);

    if (node.right !== null) {
      arr = [...arr, ...inOrder(cb, node.right)];
    }

    return arr;
  }

  return {
    prettyPrint,
    insertValue,
    deleteValue,
    findValue,
    levelOrder,
    inOrder,
  };
}

// SORTING ALGORITHMS
function quickSort(array) {
  let lessList = [];
  let moreList = [];
  const pivotList = [];

  if (array.length <= 1) {
    return array;
  }

  pivot = array[0]; // just use the first element
  for (let value of array) {
    if (value < pivot) {
      lessList.push(value);
    } else if (value > pivot) {
      moreList.push(value);
    } else if (value === pivot) {
      pivotList.push(value);
    }
  }

  lessList = quickSort(lessList);
  moreList = quickSort(moreList);

  return [...lessList, ...pivotList, ...moreList];
}

// REMOVE DUPLICATES
function removeDuplicates(sortedArray) {
  if (sortedArray.length <= 1) {
    return sortedArray;
  }

  const array = [];
  for (let item of sortedArray) {
    if (array.length === 0) {
      array.push(item);
    } else if (item === array[array.length - 1]) {
      continue;
    } else {
      array.push(item);
    }
  }

  return array;
}

// TEST SORT AND REMOVE DUPLICATE
// const array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
// const sortedArray = quickSort(array, 0, array.length - 1);
// console.log(array);
// console.log(sortedArray);
// console.log(removeDuplicates(sortedArray));

// DRIVER SCRIPT
// const array = [];
const array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const tree = TreeFactory(array);
tree.prettyPrint();
// console.log("\n* Insert 9:");
// tree.insertValue(9);
// tree.prettyPrint();
// console.log("\n* Insert 100:");
// tree.insertValue(100);
// tree.prettyPrint();
// console.log("\n* Insert 6:");
// tree.insertValue(6);
// tree.prettyPrint();
// console.log("\n* Delete 67:");
// tree.deleteValue(67);
// tree.prettyPrint();
// console.log("\n* Delete 10:"); // not found
// tree.deleteValue(10);
// tree.prettyPrint();
// console.log("\n* Find 10:");
// tree.prettyPrint(tree.findValue(10));
// console.log("\n* Find 100:");
// tree.prettyPrint(tree.findValue(100));
console.log("\n* Level-Order travesal:");
tree.levelOrder(console.log);
console.log(tree.levelOrder());
console.log("\n* In-Order travesal:");
tree.inOrder(console.log);
console.log(tree.inOrder());
