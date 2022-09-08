function NodeFactory(data, left = null, right = null) {
  return { data, left, right };
}

function TreeFactory(array) {
  let root = null;
  root = _buildTree();

  function _buildTree() {
    array = removeDuplicates(array);
    if (array.length === 0) {
      return null;
    }
    if (array.length === 1) {
      root = NodeFactory(array[0]);
      return root;
    }

    array = quickSort(array);

    let middle = Math.floor(array.length / 2);
    root = NodeFactory(array[middle]);
    root.left = buildTree(array.slice(0, middle));
    root.right = buildTree(array.slice(middle + 1));

    return root;
  }

  function prettyPrint(node = root, prefix = "", isLeft = true) {
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
// const array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
// const sortedArray = quickSort(array, 0, array.length - 1);
// console.log(sortedArray);
// console.log(removeDuplicates(sortedArray));

// DRIVER SCRIPT
const array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const tree = TreeFactory(array);
tree.prettyPrint();
