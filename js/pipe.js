FlappyBird.pipes = {

  position1: null,
  position2: null,

  position1Bot: null,
  position1Top: null,

  position2Bot: null,
  position2Top: null,

  distance: null,
  spacing: null,

  offset1: null,
  offset2: null,

  reset: function(position){
    if (this.position1 < -s_pipeNorth.width) {
      this.position1 = FlappyBird.width;
      this.offset1 = this.randomOffset();
    }
    if (this.position2 < -s_pipeNorth.width) {
      this.position2 = FlappyBird.width;
      this.offset2 = this.randomOffset();
    }

  },

  initialize: function(){
    this.distance = FlappyBird.width/2 + s_pipeNorth.width/2;
    this.position1 = FlappyBird.width;
    this.position2 = FlappyBird.width + this.distance;
    this.spacing = FlappyBird.height/2 + 20;

  },

  randomOffset: function(){
    return Math.floor(Math.random() * (-80 - 80) + 80);
  },


  generate: function(){
    this.reset();
    this.position1 -= 2;
    this.position2 -= 2;

    this.position1Top = this.spacing + this.offset1;
    this.position1Bot = -this.spacing + this.offset1;

    this.position2Top = this.spacing + this.offset2;
    this.position2Bot = -this.spacing + this.offset2;
  },




  render: function(context){
    this.generate();
    s_pipeNorth.draw(context, this.position1, this.position1Top);
    s_pipeSouth.draw(context, this.position1, this.position1Bot);

    s_pipeNorth.draw(context, this.position2, this.position2Top);
    s_pipeSouth.draw(context, this.position2, this.position2Bot);
  }
};
