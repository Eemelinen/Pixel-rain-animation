class Particle {

  constructor(canvas, mappedImage, context) {
    this.mappedImage = mappedImage;
    this.canvas = canvas;
    this.context = context;
    this.x = Math.random() * canvas.width;
    this.y = 0;
    this.speed = 0;
    this.velocity = Math.random() * 0.5;
    this.size = Math.random() * 1.5 + 1;
    this.position1 = Math.floor(this.y);
    this.position2 = Math.floor(this.x);
  }

  update() {
    this.position1 = Math.floor(this.y);
    this.position2 = Math.floor(this.x);
    this.speed = this.mappedImage[this.position1][this.position2][0];
    let movement = (2.5 - this.speed) + this.velocity;

    this.y += movement;
    // this.x += movement;

    if (this.y >= this.canvas.height) {
      this.y = 0;
      this.x = Math.random() * this.canvas.width;
    }

    if (this.x >= this.canvas.width) {
      this.x = 0;
      this.y = Math.random() * this.canvas.height;
    }
  }

  draw() {
    this.context.beginPath();
    // ctx.fillStyle = 'red';
    this.context.fillStyle = this.mappedImage[this.position1][this.position2][1];
    this.context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    this.context.fill();
  }
}
