DualBird.pipes = {

  xPositions: [],

  yTopPositions: [],
  yBotPositions: [],

  distance: null,
  spacing: null,

  offsets: [],

  reset: function(){
    for (var i = 0; i < this.xPositions.length; i++) {
      if (this.xPositions[i] < -DualBird.s_pipeNorth.width) {
        this.xPositions[i] = DualBird.width;
        this.offsets[i] = this.randomOffset();
      }
    }
  },

  initialize: function(){
    this.distance = DualBird.width/2 + DualBird.s_pipeNorth.width/2;
    this.spacing = DualBird.height/2 + 20;

    this.xPositions[0] = DualBird.width;
    this.xPositions[1] = DualBird.width + this.distance;

    this.offsets[0] = this.randomOffset();
    this.offsets[1] = this.randomOffset();
  },

  randomOffset: function(){
    if (DualBird.currentMode === DualBird.gameModes.GlideBird) {
      this.spacing--;
    }
    return Math.floor(Math.random() * (-80 - 80) + 80);

  },

  generateNewXPositions: function(i){
    if (DualBird.currentMode === DualBird.gameModes.GlideBird) {
      this.xPositions[i] -= DualBird.GLIDE_BIRD_SPEED;
    } else {
      this.xPositions[i] -= DualBird.FLAPPY_BIRD_SPEED;
    }
  },

  generate: function(){
    this.reset();
    if (DualBird.currentState !== DualBird.states.Score) {
      for (var i = 0; i < this.xPositions.length; i++){
        this.generateNewXPositions(i);
        this.yBotPositions[i] = this.spacing + this.offsets[i];
        this.yTopPositions[i] = -this.spacing + this.offsets[i];
      }
    }
  },

  render: function(context){
    this.generate();
    for (var i = 0; i < this.xPositions.length; i++){
      DualBird.s_pipeNorth.draw(context, this.xPositions[i], this.yBotPositions[i]);
      DualBird.s_pipeSouth.draw(context, this.xPositions[i], this.yTopPositions[i]);
    }
  }
};
