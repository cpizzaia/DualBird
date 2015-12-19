DualBird.pipes = {

  xPositions: [],

  yTopPositions: [],
  yBotPositions: [],

  offsets: [],

  reset: function(){
    for (var i = 0; i < this.xPositions.length; i++) {
      if (this.xPositions[i] < -DualBird.gameView.s_pipeNorth.width) {
        this.xPositions[i] = DualBird.gameView.width;
        this.offsets[i] = this.randomOffset();
      }
    }
  },

  initialize: function(){
    this.distance = DualBird.gameView.width/2 + DualBird.gameView.s_pipeNorth.width/2;
    this.spacing = DualBird.gameView.height/2 + 20;

    this.xPositions[0] = DualBird.gameView.width;
    this.xPositions[1] = DualBird.gameView.width + this.distance;

    this.offsets[0] = this.randomOffset();
    this.offsets[1] = this.randomOffset();

    for (var i = 0; i < this.xPositions.length; i++) {
      this.generateNewYPositions(i);
    }
  },

  randomOffset: function(){
    if (DualBird.currentMode === DualBird.modes.GlideBird) {
      this.spacing--;
    }
    return Math.floor(Math.random() * (-80 - 80) + 80);

  },

  generateNewXPositions: function(i){
    if (DualBird.currentMode === DualBird.modes.GlideBird) {
      this.xPositions[i] -= DualBird.gameView.GLIDE_BIRD_SPEED;
    } else {
      this.xPositions[i] -= DualBird.gameView.FLAPPY_BIRD_SPEED;
    }
  },

  generateNewYPositions: function(i) {
    this.yBotPositions[i] = this.spacing + this.offsets[i];
    this.yTopPositions[i] = -this.spacing + this.offsets[i];
  },

  update: function(){
    this.reset();
    if (DualBird.currentState !== DualBird.states.Score) {
      for (var i = 0; i < this.xPositions.length; i++){
        this.generateNewXPositions(i);
        this.generateNewYPositions(i);
      }
    }
  },

  render: function(context){
    for (var i = 0; i < this.xPositions.length; i++){
      DualBird.gameView.s_pipeNorth.draw(context, this.xPositions[i], this.yBotPositions[i]);
      DualBird.gameView.s_pipeSouth.draw(context, this.xPositions[i], this.yTopPositions[i]);
    }
  }
};
