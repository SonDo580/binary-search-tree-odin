function NodeFactory(data, left = null, right = null) {
  return { data, left, right };
}

function TreeFactory(array) {
  let root = null;

  const buildTree = () => {};
}

// SORTING ALGORITHMS
function _swap(array, i, j) {
  let temp = array[i];
  array[i] = array[j];
  array[j] = temp;
}

function _partition(array, left, right) {
  let pivot = array[Math.floor((left + right) / 2)]; // use the middle element as pivot

  let i = left; // left pointer
  let j = right; // right pointer

  while (i <= j) {
    while (array[i] < pivot) {
      i++;
    }
    while (array[j] > pivot) {
      j--;
    }
    if (i <= j) {
      _swap(array, i, j);
      i++;
      j--;
    }
  }

  return i; // pivot is now sorted and remain at this same index
}

function quickSort(array, left, right) {
  let index;

  if (array.length > 1) {
    index = _partition(array, left, right); // (new) index of the pivot

    // sort the elements on the left side of the pivot
    if (left < index - 1) {
      quickSort(array, left, index - 1);
    }

    // sort the elements on the right side of the pivot
    if (index < right) {
      quickSort(array, index, right);
    }
  }

  return array;
}

function insertionSort(array) {
  // use JS built-in sort()
  array.sort((a, b) => a - b);
  return array;
}

// TEST QUICK_SORT
// const array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
// const sortedArray = quickSort(array, 0, array.length - 1);
// console.log(sortedArray);
