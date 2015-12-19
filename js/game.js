window.DualBird = window.DualBird || {
  GLIDE_BIRD_SPEED: 5,
  FLAPPY_BIRD_SPEED: 2,

  s_bird: null,
  s_bg: null,
  s_fg: null,
  s_pipeNorth: null,
  s_pipeSouth: null,
  s_text: null,
  s_score: null,
  s_splash: null,
  s_buttons: null,
  s_numberS: null,
  s_numberB: null,

  frames: 0,
  currentState: 0,
  canvas: null,
  context: null,
  width: 320,
  height: 480,
  score: 0,
  fgpos: 0,
  currentMode: 0,
  arrowSize: 50,
  restartButton: null,

  glideBird: null,

  gameModes: {
    FlappyBird: 0, GlideBird: 1
  },

  states: {
    Splash : 0, Game: 1, Score: 2
  },

  resetGame: function() {
    this.currentState = this.states.Splash;
    this.pipes.initialize();
    this.bird.initialize();
    this.currentMode = this.gameModes.FlappyBird;
    this.score = 0;
  },

  setGameModeAndStart: function(offset) {
    if (offset > this.height/1.6) {
      this.currentMode = this.gameModes.GlideBird;
      this.currentState = this.states.Game;
    } else if (offset < this.height/3) {
      this.currentMode = this.gameModes.FlappyBird;
      this.currentState = this.states.Game;
      this.bird.jump();
    }
  },

  glideOrJump: function(offset) {
    if (this.currentMode === this.gameModes.GlideBird){
      this.bird.changeGlideAngle(offset);
    } else {
      this.bird.jump();
    }
  },

  getTouchOffset: function(event) {
      var offsetTop = $("#flappy-bird").offset().top;
      return event.originalEvent.touches[0].pageY - offsetTop;
  },

  checkForGameReset: function(offset) {
    if (offset >= this.height/1.5 - this.s_buttons.Ok.height/2 && offset <= this.height/1.5  + this.s_buttons.Ok.height/2)
      this.resetGame();
  },

  main: function(){
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

    $("#flappy-bird").on('mousedown', function(e) {

      switch (this.currentState) {
        case this.states.Splash:
          this.setGameModeAndStart(e.offsetY);
          break;
        case this.states.Game:
          this.glideOrJump(e.offsetY);
          break;
        case this.states.Score:
          this.checkForGameReset(e.offsetY);
          break;
      }
    }.bind(this));

    $("#flappy-bird").on('touchstart', function(e) {
      e.preventDefault();

      var offsetY = this.getTouchOffset(e);

      switch (this.currentState) {
        case this.states.Splash:
          this.setGameModeAndStart(offsetY);
          break;
        case this.states.Game:
          this.glideOrJump(offsetY);
          break;
        case this.states.Score:
          this.checkForGameReset(offsetY);
          break;
      }
    }.bind(this));

    this.initImagesAndRun();

  },

  initImagesAndRun: function() {

    this.glideBird = new Image();
    this.glideBird.src = "images/GlideBird_superblue.png";

    this.arrow = new Image();
    this.arrow.src = "images/arrow.png";

    this.modeChoice = new Image();
    this.modeChoice.src = "images/mode_choice.png";

    var img = new Image();

    img.onload = function() {
      this.initSprites(img);
      this.pipes.initialize();
      this.context.fillStyle = this.s_bg.color;
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

  updateFgpos: function(){
    if (this.currentMode === this.gameModes.GlideBird) {
      if (this.currentState !== this.states.Score){
        this.fgpos = (this.fgpos - this.GLIDE_BIRD_SPEED) % 14;
      }
    } else {
      if (this.currentState !== this.states.Score){
        this.fgpos = (this.fgpos - this.FLAPPY_BIRD_SPEED) % 14;
      }
    }
  },

  update: function() {
    this.frames++;
    this.updateScore();
    this.updateFgpos();
    this.bird.update();
  },

  updateScore:function() {
    if (this.currentState === this.states.Game) {
      this.score++;
    }
  },

  collisionCheck: function(){
    for (var i = 0; i < this.pipes.xPositions.length; i++) {
      if (this.bird.x+this.s_bird[0].width/4 >= this.pipes.xPositions[i] && this.bird.x-this.s_bird[0].width/4 <= this.pipes.xPositions[i] + this.s_pipeNorth.width) {
        if (this.bird.y+this.s_bird[0].height/2 > this.pipes.yBotPositions[i] || this.bird.y-this.s_bird[0].height/2 < this.pipes.yTopPositions[i] + this.s_pipeNorth.height){
          this.currentState = this.states.Score;
          return 1;
        }
      }
    }
    return 0;
  },

  renderSplash: function() {
    this.s_text.FlappyBird.draw(this.context, this.width/2-this.s_text.FlappyBird.width/2, this.height/4-this.s_text.FlappyBird.height/2);
    this.drawGlideBirdLogo(this.width/2, this.height/1.4, 200);
    this.drawModeChoice(this.width/2, this.height/2, 300);
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
    if (this.currentMode === this.gameModes.GlideBird && this.currentState != this.states.Score){
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

  renderState: function() {
    switch (this.currentState) {
      case this.states.Splash:
        this.renderSplash();
        break;
      case this.states.Game:
        this.pipes.render(this.context);
        this.collisionCheck();
        break;
      case this.states.Score:
        this.pipes.render(this.context);
        this.s_text.GameOver.draw(this.context, this.width/2-this.s_text.GameOver.width/2, this.height/2-this.s_text.GameOver.height/2);
        this.s_buttons.Ok.draw(this.context, this.width/2-this.s_buttons.Ok.width/2, this.height/1.5-this.s_buttons.Ok.height/2);
        this.s_numberB.draw(this.context, this.width/2.35, this.height/1.7-this.s_numberB.height/2, this.score);
      break;
    }
  },

  render: function() {
    this.context.fillRect(0, 0, this.width, this.height);

    this.s_bg.draw(this.context, 0, this.height-this.s_bg.height);
    this.s_bg.draw(this.context, this.s_bg.width, this.height-this.s_bg.height);

    this.renderState();

    this.bird.draw(this.context);

    this.s_fg.draw(this.context, this.fgpos, this.height-this.s_fg.height);
    this.s_fg.draw(this.context, this.fgpos + this.s_fg.height, this.height-this.s_fg.height);

    this.drawGlideBirdCtrls();
  }
};
