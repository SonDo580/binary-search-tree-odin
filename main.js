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
      console.log("Empty Tree!");
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

  function insert(node = root, value) {
    if (node === null) {
      node = NodeFactory(value);
      return node;
    }

    if (node.data === value) {
      console.log("Value already exists in BST");
      return;
    }

    // if (value < node.data) {
    //   insert(node.left, value);
    // }

    // if (value > node.data) {
    //   insert(node.right, value);
    // }
  }

  return { prettyPrint, insert };
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
console.log("\n* Insert 8:");
tree.insert(8);
tree.prettyPrint();
