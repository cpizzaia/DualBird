$(document).ready(function(){
  var
  canvas,
  context,
  width,
  height,

  frames = 0,
  score = 0,
  best = 0,

  currentState,
  states = {
    Splash : 0, Game: 1, Score: 2
  },

  bird = {},

  pipes = {};

  function main() {
    canvas = document.createElement("canvas");

    width = window.innerWidth;
    height = window.innderHeight;

    if (width >= 500) {
      width = 320;
      height = 480;
      canvas.style.border = "1px solid black";
    }

    canvas.width = width;
    canvas.height = height;
    context = canvas.getContext("2d");
    document.body.appendChild(canvas);

    var img = new Image();
    img.onload = function() {
      initSprites(this);
      run();

    };
    img.src = "images/sheet.png";

  }

  main();

  function run() {
    var loop = function(){
      update();
      render();
      window.requestAnimationFrame(loop, canvas);
    };
    window. requestAnimationFrame(loop, canvas);

  }

  function update() {

  }

  function render() {
    s_bg.draw(context, 0, height-s_bg.height);
    s_bg.draw(context, s_bg.width, height-s_bg.height);
  }
});
