DualBird.gameView = {
  fgpos: 0,
  GLIDE_BIRD_SPEED: 5,
  FLAPPY_BIRD_SPEED: 2,

  initialize: function(callback) {
    this.canvas = document.createElement("canvas");

    this.width = window.innerWidth;
    this.height = 480;

    if (this.width >= 320) {
      this.width = 320;
      this.canvas.style.border = "1px solid black";
    }

    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.canvas.id = "flappy-bird";
    this.context = this.canvas.getContext("2d");
    document.body.appendChild(this.canvas);

    this.initImages(callback);
  },

  initImages: function(callback) {

    this.glideBird = new Image();
    this.glideBird.src = "images/GlideBird_superblue.png";

    this.arrow = new Image();
    this.arrow.src = "images/arrow.png";

    this.modeChoice = new Image();
    this.modeChoice.src = "images/mode_choice.png";

    var img = new Image();

    img.onload = function() {
      this.initSprites(img);
      DualBird.pipes.initialize();
      this.context.fillStyle = this.s_bg.color;
      callback();

    }.bind(this);
    img.src = "images/sheet.png";
  },

  checkForGameReset: function(offset, callback) {
    if (
      offset >= this.height/1.5 - this.s_buttons.Ok.height/2 &&
      offset <= this.height/1.5  + this.s_buttons.Ok.height/2
    ) {
      callback();
    }
  },

  updateGlideFgpos: function(){
    this.fgpos = (this.fgpos - this.GLIDE_BIRD_SPEED) % 14;
  },

  updateFlappyFgpos: function() {
    this.fgpos = (this.fgpos - this.FLAPPY_BIRD_SPEED) % 14;
  },

  drawArrowAndCenter: function(x, y, size) {
    var height = this.arrow.height * (size/this.arrow.width);
    this.context.drawImage(this.arrow, x-size/2, y-height, size, height);
  },

  drawUpArrow: function(x, y, size) {
    this.context.save();
    this.context.rotate(3.14);
    this.drawArrowAndCenter(-x, -y, size);
    this.context.restore();
  },

  drawGlideBirdCtrls: function(){
    if (DualBird.currentMode === DualBird.modes.GlideBird && DualBird.currentState != DualBird.states.Score){
      this.drawArrowAndCenter(this.width/2, this.height/1.05, 50);
      this.drawUpArrow(this.width/2, this.height/32, 50);
    }
  },

  drawGlideBirdLogo: function(x, y, size){
      var height = this.glideBird.height * (size/this.glideBird.width);
      this.context.drawImage(this.glideBird, x-size/2, y-height, size, height);
  },

  drawModeChoice: function(x, y, size){
      var height = this.modeChoice.height * (size/this.modeChoice.width);
      this.context.drawImage(this.modeChoice, x-size/2, y-height, size, height);
  },

  renderSplash: function() {
    this.s_text.FlappyBird.draw(
      this.context,
      this.width/2-this.s_text.FlappyBird.width/2,
      this.height/4-this.s_text.FlappyBird.height/2
    );

    this.drawGlideBirdLogo(
      this.width/2,
      this.height/1.4,
      200
    );

    this.drawModeChoice(
      this.width/2,
      this.height/2,
      300
    );
  },

  renderGame: function() {
    DualBird.pipes.render(this.context);
  },

  renderScore: function() {
    DualBird.pipes.render(this.context);

    this.s_text.GameOver.draw(
      this.context,
      this.width/2-this.s_text.GameOver.width/2,
      this.height/2-this.s_text.GameOver.height/2
    );

    this.s_buttons.Ok.draw(
      this.context,
      this.width/2-this.s_buttons.Ok.width/2,
      this.height/1.5-this.s_buttons.Ok.height/2
    );

    this.s_numberB.draw(
      this.context,
      this.width/2.35,
      this.height/1.7-this.s_numberB.height/2,
      DualBird.score
    );

  },

  renderState: function() {
    switch (DualBird.currentState) {
      case DualBird.states.Splash:
        this.renderSplash();
        break;
      case DualBird.states.Game:
        this.renderGame();
        break;
      case DualBird.states.Score:
        this.renderScore();
      break;
    }
  },

  render: function() {
    this.context.fillRect(0, 0, this.width, this.height);

    this.s_bg.draw(this.context, 0, this.height-this.s_bg.height);
    this.s_bg.draw(this.context, this.s_bg.width, this.height-this.s_bg.height);

    this.renderState();

    DualBird.bird.draw(this.context);

    this.s_fg.draw(this.context, this.fgpos, this.height-this.s_fg.height);
    this.s_fg.draw(this.context, this.fgpos + this.s_fg.height, this.height-this.s_fg.height);

    this.drawGlideBirdCtrls();
  }
};
