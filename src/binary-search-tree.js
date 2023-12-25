const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  constructor() {
    this.root = null;
  }
  root() {
    return this.root;
  }

  add( data ) {
    this.root = insert(this.root, data);
    function insert(node, data) {
      if (node === null) {
        return new Node(data);
      }
      if (data < node.data) {
        node.left = insert(node.left, data);
      } else if (data > node.data) {
        node.right = insert(node.right, data);
      }
      return node;
    }
  }
  has( data ) {
    function search(node, data) {
      if (node === null) {
        return false;
      }

      if (data === node.data) {
        return true;
      } else if (data < node.data) {
        return search(node.left, data);
      } else {
        return search(node.right, data);
      }
    }
    return search(this.root, data);
  }

  find( data ) {
    if(!this.root) return false;

    let currentRoot = this.root;
    let result = false;

    while(currentRoot && !result) {
      if(data < currentRoot.data) {
        currentRoot = currentRoot.left;
      } else if(data > currentRoot.data) {
        currentRoot = currentRoot.right;
      } else {
        result = currentRoot;
      }
    }
    return (!result)? null : result;
  }

  remove( data ) {
    this.root = removeNode(this.root, data);
    function removeNode(root, data) {

      if (data > root.data) {
        root.right = removeNode(root.right, data);
        return root;
      } else if (data < root.data) {
        root.left = removeNode(root.left, data);
        return root;
      } else {
        if (!root.left && !root.right) return null;

        if (!root.left) {
          return root.right;
        }
        if (!root.right) {
          return root.left;
        }

        let minRight = root.right;
        while (minRight.left) {
          minRight = minRight.left;
        }
        root.data = minRight.data;
        root.right = removeNode(root.right, minRight.data);
        return root;
      }
    }
  }

  min() {
    let node = this.root;
    while (node.left) {
      node = node.left;
    }
    return node.data;
  }

  max() {
    let node = this.root;
    while (node.right) {
      node = node.right;
    }
    return node.data;
  }
}

module.exports = {
  BinarySearchTree
};