function NodeFactory(data, left = null, right = null) {
  return { data, left, right };
}

function TreeFactory(array) {
  array = removeDuplicates(quickSort(array));

  let root = _buildTree(array);

  function getRoot() {
    return root;
  }

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

    arr = [...inOrder(cb, node.left)];

    if (cb !== null) {
      cb(node.data);
    }
    arr.push(node.data);

    arr = [...arr, ...inOrder(cb, node.right)];

    return arr;
  }

  function preOrder(cb = null, node = root) {
    if (node === null) {
      return [];
    }

    let arr = [];

    if (cb !== null) {
      cb(node.data);
    }
    arr.push(node.data);

    arr = [...arr, ...preOrder(cb, node.left)];
    arr = [...arr, ...preOrder(cb, node.right)];

    return arr;
  }

  function postOrder(cb = null, node = root) {
    if (node === null) {
      return [];
    }

    let arr = [];

    arr = [...postOrder(cb, node.left)];
    arr = [...arr, ...postOrder(cb, node.right)];

    if (cb !== null) {
      cb(node.data);
    }
    arr.push(node.data);

    return arr;
  }

  function getHeight(node = root) {
    if (node === null) {
      return -1;
    }

    let leftHeight = getHeight(node.left);
    let rightHeight = getHeight(node.right);
    let max = Math.max(leftHeight, rightHeight) + 1;

    return max;
  }

  function getDepth(node = root) {
    if (node === null) {
      return -1;
    }

    let value = node.data;
    let pointer = root;
    let depth = 0;

    while (value < pointer.data) {
      pointer = pointer.left;
      depth++;
    }

    while (value > pointer.data) {
      pointer = pointer.right;
      depth++;
    }

    // Because 'node' is extracted from the tree, 'value' will be found.
    // If value === pointer.data
    return depth;
  }

  function _isBalancedNumeric(node = root) {
    if (node === null) {
      return 0;
    }

    let leftHeight = _isBalancedNumeric(node.left);
    if (leftHeight === -1) {
      return -1;
    }

    let rightHeight = _isBalancedNumeric(node.right);
    if (rightHeight === -1) {
      return -1;
    }

    if (Math.abs(leftHeight - rightHeight) > 1) {
      return -1;
    } else {
      return Math.max(leftHeight, rightHeight) + 1;
    }
  }

  return {
    getRoot,
    prettyPrint,
    insertValue,
    deleteValue,
    findValue,
    levelOrder,
    inOrder,
    preOrder,
    postOrder,
    getHeight,
    getDepth,
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
const root = tree.getRoot();
// tree.prettyPrint(root);
tree.prettyPrint();

// console.log("\n* Insert 9:");
// tree.insertValue(9);
// tree.prettyPrint();
console.log("\n* Insert 100:");
tree.insertValue(100);
// tree.prettyPrint();
console.log("\n* Insert 6:");
tree.insertValue(6);
tree.prettyPrint();

// console.log("\n* Delete 67:");
// tree.deleteValue(67);
// tree.prettyPrint();
// console.log("\n* Delete 10:"); // not found
// tree.deleteValue(10);
// tree.prettyPrint();

console.log("\n* Find 10:");
tree.prettyPrint(tree.findValue(10));
console.log("\n* Find 67:");
tree.prettyPrint(tree.findValue(67));

console.log("\n* Level-Order travesal:");
tree.levelOrder(console.log);
console.log(tree.levelOrder());
console.log("\n* In-Order travesal:");
tree.inOrder(console.log);
console.log(tree.inOrder());
console.log("\n* Pre-Order travesal:");
tree.preOrder(console.log);
console.log(tree.preOrder());
console.log("\n* Post-Order travesal:");
tree.postOrder(console.log);
console.log(tree.postOrder());

console.log("\n* Tree height:");
console.log(tree.getHeight());
console.log("\n* Node(root.left.right) height:");
console.log(tree.getHeight(root.left.right));
console.log("\n* Node(root.left) depth:");
console.log(tree.getDepth(root.left));
