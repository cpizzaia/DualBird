FlappyBird.pipes = {

  position: null,
  distance: null,

  generate: function(){
    if (this.position === null || this.position < -s_pipeNorth.width) {
      this.position = FlappyBird.width;
      this.distance = FlappyBird.width/2;
    }
    this.position-=2;
  },




  render: function(context){
    this.generate();
    s_pipeNorth.draw(context, this.position, FlappyBird.height/2);
    s_pipeSouth.draw(context, this.position, -FlappyBird.height/2);
  }
};
