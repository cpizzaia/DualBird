$(document).ready(function(){
  window.frames = 0;
  var
  canvas,
  context,
  width,
  height,

  score = 0,
  best = 0,

  currentState,
  states = {
    Splash : 0, Game: 1, Score: 2
  },


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
      context.fillStyle = s_bg.color;
      run();

    };
    img.src = "images/sheet.png";

  }

  main();

  function run() {
    fgpos = 0;
    bird.flap();
    var loop = function() {
      update();
      render();
      window.requestAnimationFrame(loop, canvas);
    };
    window.requestAnimationFrame(loop, canvas);

  }

  function update() {
    frames++;
    fgpos = (fgpos - 2) % 14;

    bird.flap();

  }

  function render() {
    context.fillRect(0, 0, width, height);
    s_bg.draw(context, 0, height-s_bg.height);
    s_bg.draw(context, s_bg.width, height-s_bg.height);

    bird.draw(context);

    s_fg.draw(context, fgpos, height-s_fg.height);
    s_fg.draw(context, fgpos + s_fg.height, height-s_fg.height);


  }
});
