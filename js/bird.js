bird = {
  animationIdx: 0,
  animationArray: [0, 1, 2, 1],
  rotation: 0,
  y: 130,
  x: 30,

  flap: function(){

    this.animationIdx = Math.floor(frames/5) % this.animationArray.length;

  },

  draw: function(context){
    if (this.rotation < 1.5 && currentState !== states.Splash) {
      this.rotation = frames/10;
    }



    context.save();
    context.translate(this.x, this.y);
    context.rotate(this.rotation);

    var animation = this.animationArray[this.animationIdx];

    s_bird[animation].draw(
      context,
      -s_bird[animation].width/2,
      -s_bird[animation].height/2
    );
    context.restore();
  }
};
