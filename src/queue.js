class Queue {
  constructor(array) {
    this.array = array;
  }
  enqueue(value) {
    this.array.push(value);
  }
  dequeue() {
    this.array.shift();
  }
}

export default Queue;
