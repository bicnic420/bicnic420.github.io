class Snake {
  constructor() {
    this.body = [];
    this.body[0] = createVector(0, 0);

    this.xdir = 1;
    this.ydir = 0;
  }

  setDir(x, y) {
    this.xdir = x;
    this.ydir = y;
  }

  update() {
    let head = this.body[this.body.length - 1].copy();

    this.body.shift();

    head.x += this.xdir;
    head.y += this.ydir;

    this.body.push(head);
  }

  grow() {
    let head = this.body[this.body.length - 1].copy();
    this.body.push(head);
  }

  eat(pos) {
    let head = this.body[this.body.length - 1];

    if (head.x === pos.x && head.y === pos.y) {
      this.grow();
      return true;
    }

    return false;
  }

  endGame() {
    let head = this.body[this.body.length - 1];

    // Wall collision
    if (head.x > w - 1 || head.x < 0 || head.y > h - 1 || head.y < 0) {
      return true;
    }

    // Self collision
    for (let i = 0; i < this.body.length - 1; i++) {
      let part = this.body[i];

      if (part.x === head.x && part.y === head.y) {
        return true;
      }
    }

    return false;
  }

 show() {

  fill(0, 255, 0);
  stroke(0);
  strokeWeight(0.05);

  for (let part of this.body) {

    rect(part.x, part.y, 1, 1);
  }
}
}
