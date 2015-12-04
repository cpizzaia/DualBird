FlappyBird.pipes = {

  position: null,
  distance: null,
  spacing: null,
  offset: null,


  generate: function(){
    if (this.position === null || this.position < -s_pipeNorth.width) {
      this.position = FlappyBird.width;
      this.spacing = FlappyBird.height/2 + 20;
      this.distance = FlappyBird.width/2;
      this.offset = Math.floor(Math.random() * (-80 - 80) + 80);
    }
    this.position-=2;
  },




  render: function(context){
    this.generate();
    s_pipeNorth.draw(context, this.position, this.spacing+this.offset);
    s_pipeSouth.draw(context, this.position, -this.spacing+this.offset);
  }
};
