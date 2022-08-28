import mergeSort from './mergesort';

class Node {
  constructor(data, left = null, right = null) {
    this.data = data;
    this.left = left;
    this.right = right;
  }
}

class Tree {
  constructor(treeDataArray = []) {
    this.treeDataArray = treeDataArray;
    this.root = null;
  }

  buildTree() {
    let initialArray = this.treeDataArray;
    let uniques = [...new Set(initialArray)];
    let sorted = mergeSort(uniques);
    console.log(sorted);

    const builder = (array) => {
      if (!array) {
        return null;
      }
      let start = 0;
      let end = array.length - 1;
      let middle = Math.ceil((start + end) / 2);

      if (start > end) {
        return;
      }
      let left = array.slice(0, middle);
      let right = array.slice(middle + 1, array.length);

      let root = new Node(array[middle]);

      if (left.length === 0) {
        left = null;
      }
      if (right.length === 0) {
        right = null;
      }
      root.left = builder(left);
      root.right = builder(right);

      this.root = root;
      return this.root;
    };
    builder(sorted);
  }
}

const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }
};

let WorldTree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
WorldTree.buildTree();

prettyPrint(WorldTree.root);
