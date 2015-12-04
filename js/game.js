window.FlappyBird = window.FlappyBird || {

  frames: 0,
  currentState: 0,
  canvas: null,
  context: null,
  width: null,
  height: null,
  score: 0,
  best: 0,
  fgpos: 0,

  states: {
    Splash : 0, Game: 1, Score: 2
  },

  main: function(){
    this.canvas = document.createElement("canvas");

    this.width = window.innerWidth;
    this.height = window.innderHeight;

    var event = "touchstart";

    if (this.width >= 500) {
      this.width = 320;
      this.height = 480;
      this.canvas.style.border = "1px solid black";
      event = "mousedown";
    }

    document.addEventListener(event, function(){
      this.currentState = this.states.Game;
      this.bird.jump();
    }.bind(this));

    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.context = this.canvas.getContext("2d");
    document.body.appendChild(this.canvas);

    var img = new Image();

    img.onload = function() {
      initSprites(img);
      this.context.fillStyle = s_bg.color;
      this.run();

    }.bind(this);
    img.src = "images/sheet.png";
  },

  run: function() {
    this.fgpos = 0;
    this.bird.flap();
    var loop = function() {
      this.update();
      this.render();
      window.requestAnimationFrame(loop, this.canvas);
    }.bind(this);
    window.requestAnimationFrame(loop, this.canvas);

  },

  update: function() {
    this.frames++;
    this.fgpos = (this.fgpos - 2) % 14;


    this.bird.update();

  },

  render: function() {
    this.context.fillRect(0, 0, this.width, this.height);
    s_bg.draw(this.context, 0, this.height-s_bg.height);
    s_bg.draw(this.context, s_bg.width, this.height-s_bg.height);

    this.bird.draw(this.context);

    this.pipes.render(this.context);

    s_fg.draw(this.context, this.fgpos, this.height-s_fg.height);
    s_fg.draw(this.context, this.fgpos + s_fg.height, this.height-s_fg.height);

    if (this.currentState === this.states.Splash){
      s_splash.draw(this.context, this.width/2-s_splash.width/2, this.height/2-s_splash.height/2);
    }


  }
};

$(document).ready(function(){
  FlappyBird.main();
});
