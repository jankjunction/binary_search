class Queue {
  constructor() {
    this.array = [];
  }
  enqueue(value) {
    return this.array.push(value);
  }
  dequeue() {
    return this.array.shift();
  }
}

export default Queue;
