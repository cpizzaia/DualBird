FlappyBird.pipes = {

  position1: null,
  position2: null,

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
    this.distance = FlappyBird.width/2;
    this.position1 = FlappyBird.width;
    this.position2 = FlappyBird.width + this.distance+s_pipeNorth.width/2;
    this.spacing = FlappyBird.height/2 + 20;

  },

  randomOffset: function(){
    return Math.floor(Math.random() * (-80 - 80) + 80);
  },


  generate: function(){
    this.reset();
    this.position1 -= 2;
    this.position2 -= 2;
  },




  render: function(context){
    this.generate();
    s_pipeNorth.draw(context, this.position1, this.spacing+this.offset1);
    s_pipeSouth.draw(context, this.position1, -this.spacing+this.offset1);

    s_pipeNorth.draw(context, this.position2, this.spacing+this.offset2);
    s_pipeSouth.draw(context, this.position2, -this.spacing+this.offset2);
  }
};
