const myImage = new Image();
myImage.src = stringifiedImage;

let particlesArray = [];
const numberOfParticles = 5000;

function drawImage() {

  const canvas = document.getElementById('canvas1');
  const context = canvas.getContext('2d');
  canvas.width = 570;
  canvas.height = 697;
  context.drawImage(myImage, 0, 0, canvas.width, canvas.height);
  const pixels = context.getImageData(0, 0, canvas.width, canvas.height);
  context.clearRect(0, 0, canvas.width, canvas.height);

  let mappedImage = [];
  for (let y = 0; y < canvas.height; y++) {
    let row = [];
    for (let x = 0; x < canvas.width; x++) {
      const red = pixels.data[(y * 4 * pixels.width) + (x * 4)];
      const green = pixels.data[(y * 4 * pixels.width) + (x * 4 + 1)];
      const blue = pixels.data[(y * 4 * pixels.width) + (x * 4 + 2)];
      const brightness = calculateRelativeBrightness(red, green, blue);
      const cellColor = `rgb(${red}, ${green}, ${blue}`;
      const cell = [
        brightness,
        cellColor
      ];
      row.push(cell);
    }
    mappedImage.push(row);
  }

  /** Adjust colors for human eye perception */
  function calculateRelativeBrightness(red, green, blue) {
    return Math.sqrt(
      (red * red) * 0.299 +
      (green * green) * 0.587 +
      (blue * blue) * 0.114
    ) / 100;
  }

  function initParticles() {
    for (let i = 0; i < numberOfParticles; i++) {
      particlesArray.push(new Particle(canvas, mappedImage, context))
    }
  }

  initParticles();

  function animate() {
    context.globalAlpha = 0.05;
    context.fillStyle = 'rgb(0, 0, 0)';
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.globalAlpha = 0.2;

    for (let i = 0; i < particlesArray.length; i++) {
      particlesArray[i].update();
      context.globalAlpha = particlesArray[i].speed * 0.5;
      particlesArray[i].draw();
    }
    requestAnimationFrame(animate);
  }
  animate();

}

myImage.addEventListener('load', () => drawImage());
