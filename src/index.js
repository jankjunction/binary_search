import mergeSort from './mergesort';
import Queue from './queue';

class Node {
  constructor(data, left = null, right = null) {
    this.data = data;
    this.left = left;
    this.right = right;
  }

  numChildren(node = this) {
    let count = 0;
    if (node.left) {
      count += 1;
    }
    if (node.right) {
      count += 1;
    }
    return count;
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

  insert(key, tree = this.root) {
    if (tree.data === key) {
      return;
    }
    if (key < tree.data && tree.left === null) {
      return (tree.left = new Node(key));
    } else if (key > tree.data && tree.right === null) {
      return (tree.right = new Node(key));
    } else {
      if (key < tree.data) {
        this.insert(key, tree.left);
      } else {
        this.insert(key, tree.right);
      }
    }
  }

  minValue(tree = this.root) {
    while (tree.left !== null) {
      return this.minValue(tree.left);
    }
    return tree.data;
  }

  delete(key, tree = this.root) {
    const deleteRec = (root, key) => {
      if (root === null) {
        return root;
      } else {
        if (key < root.data) {
          root.left = deleteRec(root.left, key);
        } else if (key > root.data) {
          root.right = deleteRec(root.right, key);
        } else {
          console.log(root.left, root.right);
          if (root.left === null) {
            return root.right;
          } else if (root.right === null) {
            return root.left;
          }
          root.data = this.minValue(root.right);
          root.right = deleteRec(root.right, root.data);
        }
        return root;
      }
    };

    tree = deleteRec(this.root, key);
    return tree;
  }

  find(key, tree = this.root) {
    if (tree === null) {
      return 'key not found in tree';
    }
    if (key === tree.data) {
      return tree;
    } else if (key < tree.data) {
      return this.find(key, tree.left);
    } else {
      return this.find(key, tree.right);
    }
  }

  levelOrder(fnct, tree = this.root) {
    let queue = new Queue();
    queue.enqueue(tree);
    while (queue.array.length > 0) {
      if (queue.array[0].left !== null) {
        queue.enqueue(queue.array[0].left);
      }
      if (queue.array[0].right !== null) {
        queue.enqueue(queue.array[0].right);
      }
      fnct(queue.dequeue());
    }
  }

  preOrder(fnct, tree = this.root) {
    if (tree === null) {
      return;
    } else {
      fnct(tree);
      this.preOrder(fnct, tree.left);
      this.preOrder(fnct, tree.right);
    }
  }

  inOrder(fnct, tree = this.root) {
    if (tree === null) {
      return;
    } else {
      this.inOrder(fnct, tree.left);
      fnct(tree);
      this.inOrder(fnct, tree.right);
    }
  }

  postOrder(fnct, tree = this.root) {
    if (tree === null) {
      return;
    } else {
      this.postOrder(fnct, tree.left);
      this.postOrder(fnct, tree.right);
      fnct(tree);
    }
  }
}

const returnValue = (node) => {
  console.log(node.data);
  return node.data;
};

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
WorldTree.insert(66, WorldTree.root);
WorldTree.insert(777);
prettyPrint(WorldTree.root);
console.log(WorldTree.postOrder(returnValue));
