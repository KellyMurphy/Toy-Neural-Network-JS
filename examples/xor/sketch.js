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

// Modified Training data
////////////////////////
//  0              1
//     1       0
//        .5
//     0       1
//  1              0
////////////////////////

let modified_training_data = [{
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
}, {
  inputs: [.25, .25],
  targets: [1]
}, {
  inputs: [.75, .25],
  targets: [0]
}, {
  inputs: [.25, .75],
  targets: [0]
}, {
  inputs: [.75, .75],
  targets: [1]
},{
  inputs: [.5, .5],
  targets: [.5]
}];

let nn;
let hn_slider;
let nnReset_btn;
let lr_slider;
let lr_para;
let train_cb;
let train_running;
let ti_slider;
let cnv;
let trainOneShot_btn;

// Uncomment to use modified training data
training_data = modified_training_data;

function setup() {
  cnv = createCanvas(400, 400);
  nn = new NeuralNetwork(2, 2, 1);
  nn.learning_rate = 0.05;
  layoutUI();
  train_cb.changed(trainingEnabled)
  train_running = 0
}

function draw() {
  nn.learning_rate = lr_slider.value();
  if (train_running) {
    var trainIttr = ti_slider.value();
    train(trainIttr);
  }
  updateCanvas();
}

function layoutUI() {

  // center the canvas on the page.
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  cnv.position(x, y);

  // Setup Slider for number of hidden nodes
  createP('Hidden Nodes: 2').id('hnodes');
  hn_slider = createSlider(2, 32, 2);
  hn_slider.changed(updateHNSlider);

  // Create Button to reset NN and update nidden nodes.
  nnReset_btn = createButton('Reset NN');
  nnReset_btn.mouseClicked(resetNN);

  // Setup Slider for Training Rate
  createP('Training Rate: ' + nn.learning_rate).id('trate');
  lr_slider = createSlider(0.01, 0.1, 0.05, 0.01);
  lr_slider.changed(updateLRSlider);

  // Setup Slider for training itterations per loop.
  createP('Train count per loop: 2500').id('LC');
  ti_slider = createSlider(10, 5000, 2500, 10);
  ti_slider.changed(ti_sliderChanged);

  // Create Button to train 1 itteration of training
  trainOneShot_btn = createButton('Train One Ittr');
  trainOneShot_btn.mouseClicked(trainOneShot);

  // Create Checkbox to enable training on each Draw Loop
  train_cb = createCheckbox("Loop Train", 0);
}

// Update to display Learning rate on page
function updateHNSlider() {
  var hidenNodes = hn_slider.value();
  var elt = document.getElementById("hnodes");
  elt.innerText = 'Hidden Nodes(after reset): ' + hidenNodes;
}

// Reset NN with new Hidden Node Count
function resetNN() {
  var hiddenNodes = hn_slider.value();
  var elt = document.getElementById("hnodes");
  elt.innerText = 'Hidden Nodes: ' + hiddenNodes;
  nn = new NeuralNetwork(2, hiddenNodes, 1);
}

// Update to display Learning rate on page
function updateLRSlider() {
  var elt = document.getElementById("trate");
  elt.innerText = 'Training Rate: ' + nn.learning_rate;
}

// Update to display Trining/Itteration on page
function ti_sliderChanged() {
  var elt = document.getElementById("LC");
  var trainIttr = ti_slider.value();
  elt.innerText = 'Training Rate: ' + trainIttr;
}

// Run through 1 itteration of training.
function trainOneShot() {
  var trainIttr = ti_slider.value();
  train(trainIttr);
}

function trainingEnabled() {
  train_running = this.checked();
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
