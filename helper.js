// swap and partition are used in quickSort
function swap(array, i, j) {
  let temp = array[i];
  array[i] = array[j];
  array[j] = temp;
}

function partition(array, left, right) {
  //   let pivot = array[Math.floor((left + right) / 2)]; // use the middle element
  //   let i = left; // left pointer
  //   let j = right; // right pointer
  //   while (i <= j) {
  //     while (array[i] < pivot) {
  //       i++;
  //     }
  //     while (array[j] > pivot) {
  //       j--;
  //     }
  //   }
}

function quickSort(array) {}

export { quickSort };
