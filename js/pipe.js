FlappyBird.pipes = {

  xPositions: [],

  yTopPositions: [],
  yBotPositions: [],

  distance: null,
  spacing: null,

  offsets: [],

  reset: function(){
    for (var i = 0; i < this.xPositions.length; i++) {
      if (this.xPositions[i] < -s_pipeNorth.width) {
        this.xPositions[i] = FlappyBird.width;
        this.offsets[i] = this.randomOffset();
      }
    }
  },

  initialize: function(){
    this.distance = FlappyBird.width/2 + s_pipeNorth.width/2;
    this.spacing = FlappyBird.height/2 + 20;

    this.xPositions[0] = FlappyBird.width;
    this.xPositions[1] = FlappyBird.width + this.distance;

    this.offsets[0] = this.randomOffset();
    this.offsets[1] = this.randomOffset();
  },

  randomOffset: function(){
    this.spacing--;
    return Math.floor(Math.random() * (-80 - 80) + 80);

  },


  generate: function(){
    this.reset();
    if (FlappyBird.currentState !== FlappyBird.states.Score) {
      for (var i = 0; i < this.xPositions.length; i++){
        this.xPositions[i] -= 4;

        this.yBotPositions[i] = this.spacing + this.offsets[i];
        this.yTopPositions[i] = -this.spacing + this.offsets[i];
      }
    }
  },




  render: function(context){
    this.generate();
    for (var i = 0; i < this.xPositions.length; i++){
      s_pipeNorth.draw(context, this.xPositions[i], this.yBotPositions[i]);
      s_pipeSouth.draw(context, this.xPositions[i], this.yTopPositions[i]);
    }
  }
};
