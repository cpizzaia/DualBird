window.DualBird = window.DualBird || {

  frames: 0,
  currentState: 0,
  score: 0,
  currentMode: 0,
  arrowSize: 50,

  modes: {
    FlappyBird: 0, GlideBird: 1
  },

  states: {
    Splash : 0, Game: 1, Score: 2
  },

  resetGame: function() {
    this.currentState = this.states.Splash;
    this.pipes.initialize();
    this.bird.initialize();
    this.currentMode = this.modes.FlappyBird;
    this.score = 0;
  },

  setGameModeAndStart: function(offset) {
    if (offset > this.gameView.height/1.6) {
      this.currentMode = this.modes.GlideBird;
      this.currentState = this.states.Game;
    } else if (offset < this.gameView.height/3) {
      this.currentMode = this.modes.FlappyBird;
      this.currentState = this.states.Game;
      this.bird.jump();
    }
  },

  glideOrJump: function(offset) {
    if (this.currentMode === this.modes.GlideBird){
      this.bird.changeGlideAngle(offset);
    } else {
      this.bird.jump();
    }
  },

  getTouchOffset: function(event) {
      var offsetTop = $("#flappy-bird").offset().top;
      return event.originalEvent.touches[0].pageY - offsetTop;
  },

  main: function(){

    this.gameView.initialize(this.run.bind(this));

    $("#flappy-bird").on('mousedown', function(e) {

      switch (this.currentState) {
        case this.states.Splash:
          this.setGameModeAndStart(e.offsetY);
          break;
        case this.states.Game:
          this.glideOrJump(e.offsetY);
          break;
        case this.states.Score:
          this.gameView.checkForGameReset(e.offsetY, this.resetGame.bind(this));
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
  },


  run: function() {
    this.fgpos = 0;
    this.bird.flap();

    var loop = function() {
      this.update();

      this.gameView.render();

      window.requestAnimationFrame(loop, this.canvas);
    }.bind(this);

    window.requestAnimationFrame(loop, this.canvas);
  },

  updateFgpos: function() {
    switch (this.currentMode) {
      case this.modes.GlideBird:
        this.gameView.updateGlideFgpos();
        break;
      case this.modes.FlappyBird:
        this.gameView.updateFlappyFgpos();
        break;
    }
  },


  update: function() {
    this.frames++;
    this.bird.update();

    switch (this.currentState) {
      case this.states.Splash:
        this.updateFgpos();
        break;
      case this.states.Game:
        this.pipes.update();
        this.updateScore();
        this.collisionCheck();
        this.updateFgpos();
        break;
      case this.states.Score:
        break;
    }
  },

  updateScore:function() {
    this.score++;
  },

  collisionCheck: function(){
    for (var i = 0; i < this.pipes.xPositions.length; i++) {
      if (
        this.bird.x + this.gameView.s_bird[0].width/4 >= this.pipes.xPositions[i] &&
        this.bird.x - this.gameView.s_bird[0].width/4 <= this.pipes.xPositions[i] + this.gameView.s_pipeNorth.width
      ) {
        if (
          this.bird.y + this.gameView.s_bird[0].height/2 > this.pipes.yBotPositions[i] ||
          this.bird.y - this.gameView.s_bird[0].height/2 < this.pipes.yTopPositions[i] + this.gameView.s_pipeNorth.height
        ) {
          this.currentState = this.states.Score;
          return 1;
        }
      }
    }
    return 0;
  },
};
