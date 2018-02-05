let nn;
let training_data = [{
  inputs: [0, 0],
  targets: [0]
}, {
  inputs: [1, 0],
  targets: [1]
}, {
  inputs: [0, 1],
  targets: [1]
}, {
  inputs: [1, 1],
  targets: [0]
}];

let lr_slider;
let lr_para;
let train_cb;
let train_running;

function setup() {
  createCanvas(400, 400);
  nn = new NeuralNetwork(2, 4, 1);
  lr_slider = createSlider(0.01, 0.1, 0.05, 0.01);
  //lr_para = createElement('p', '.1');
  train_cb = createCheckbox("Training", 0);
  train_cb.changed(trainingEnabled)
  train_running=0

}

function trainingEnabled() {
  train_running = this.checked();
}

function draw() {
  nn.learning_rate = lr_slider.value();
  if (train_running) {
    train(5000);
  }
  updateCanvas();
}

function train(n) {
  for (let i = 0; i < n; i++) {
    let data = random(training_data);
    nn.train(data.inputs, data.targets);
  }
}

function updateCanvas() {
  background(0);
  let resolution = 10;
  let cols = floor(width / resolution);
  let rows = floor(height / resolution);

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = i * resolution;
      let y = j * resolution;
      let input_1 = i / (cols - 1);
      let input_2 = j / (rows - 1);
      let output = nn.predict([input_1, input_2]);
      let col = output[0] * 255;
      fill(col);
      noStroke();
      rect(x, y, resolution, resolution);
    }
  }
}
