// swap and partition are used in quickSort
function swap(array, i, j) {
  let temp = array[i];
  array[i] = array[j];
  array[j] = temp;
}

function partition(array, left, right) {
  let pivot = array[Math.floor((left + right) / 2)]; // use the middle element

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
      swap(array, i, j);
      i++;
      j--;
    }
  }

  return i;
}

function quickSort(array, left, right) {
  let index;

  if (array.length > 1) {
    index = partition(array, left, right); // (new) index of the pivot

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

// TEST QUICKSORT
// const array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
// const sortedArray = quickSort(array, 0, array.length - 1);
// console.log(sortedArray);

// export { quickSort };
