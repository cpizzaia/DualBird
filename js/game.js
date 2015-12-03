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

  bird = {
    animation: 0,
    flap: function(){
      window.setInterval(function(){
        this.animation++;
        if (this.animation === 3){
          this.animation = 0;
        }
      }.bind(this), 200);
    },
    draw: function(){
      s_bird[this.animation].draw(context, 30, 130);
    }
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
    window.setInterval(function(){
      update();
      render();
    }, 7);

  }

  function update() {
    if (fgpos == -14){
      fgpos = 0;
    } else {
      fgpos--;
    }
  }

  function render() {
    context.fillRect(0, 0, width, height);
    s_bg.draw(context, 0, height-s_bg.height);
    s_bg.draw(context, s_bg.width, height-s_bg.height);

    s_fg.draw(context, fgpos, height-s_fg.height);
    s_fg.draw(context, fgpos + s_fg.height, height-s_fg.height);

    bird.draw();
  }
});
