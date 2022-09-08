function NodeFactory(data, left = null, right = null) {
  return { data, left, right };
}

function TreeFactory(array) {
  array = quickSort(removeDuplicates(array));
  // console.log(array);

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

  return { prettyPrint };
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
function removeDuplicates(array) {
  if (array.length <= 1) {
    return array;
  }

  let object = {};
  for (let item of array) {
    if (!object.hasOwnProperty(item)) {
      object[item] = 1;
    } else {
      continue;
    }
  }
  return Object.keys(object);
}

// TEST SORT AND REMOVE DUPLICATE
const array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const sortedArray = quickSort(array, 0, array.length - 1);
console.log(array);
console.log(removeDuplicates(array));
console.log(sortedArray);
console.log(removeDuplicates(sortedArray));

// DRIVER SCRIPT
// const array = [];
// const array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const tree = TreeFactory(array);
tree.prettyPrint();
