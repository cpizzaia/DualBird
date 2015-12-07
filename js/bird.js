FlappyBird.bird = {
  animationIdx: 0,
  animationArray: [0, 1, 2, 1],
  rotation: 0,
  y: 130,
  x: 30,
  currentState: 0,
  ascendRate: 8,
  timeout: null,
  glideAngle: 0,
  states: {
    Dead: 2, Ascending: 1, Descending: 0
  },

  dead: function(){
    this.descend();
    this.rotate();
  },

  flap: function(){
    this.animationIdx = Math.floor(FlappyBird.frames/5) % this.animationArray.length;
  },

  rotate: function(){
    if (this.rotation/10 < 1.5){
      this.rotation++;
    }
  },

  descend: function(){
    if (this.y < FlappyBird.height-s_fg.height-s_bird[0].height/2){
      this.y += 4;
    } else {
      FlappyBird.currentState = FlappyBird.states.Score;
    }
  },

  ascend: function(){
    if (this.ascendRate > -4){
      this.y -= Math.ceil(this.ascendRate);
      this.ascendRate -= 0.5;
    } else {
      this.descend();
    }
  },

  resetAscendRate: function(){
    this.ascendRate = 8;
  },

  fly: function(){
    if (this.currentState === this.states.Ascending){
      this.ascend();
    } else {
      this.descend();
      this.rotate();
    }
  },

  hover: function(){
    this.y += Math.cos(FlappyBird.frames/10);
  },

  jump: function(){
    this.currentState = this.states.Ascending;
    this.rotation = -10;
    this.resetAscendRate();

    window.clearTimeout(this.timeout);

    this.timeout = window.setTimeout(function(){
      this.currentState = this.states.Descending;
    }.bind(this), 500);
  },

  glide: function() {
    this.y += this.glideAngle;
  },

  changeGlideAngle: function(eventYPos){
    if (this.y < eventYPos){
      this.glideAngle += 2;
    } else if (this.y > eventYPos){
      this.glideAngle -= 2;
    }
  },



  update: function() {
    switch (FlappyBird.currentState) {
      case FlappyBird.states.Splash:
        this.flap();
        this.hover();
        break;
      case FlappyBird.states.Game:
        if (FlappyBird.currentMode === FlappyBird.gameModes.GlideBird){
          this.glide();
        } else {
          this.fly();
        }
        this.flap();
        break;
      case FlappyBird.states.Score:
        this.dead();
        break;
    }
  },


  draw: function(context){
    context.save();
    context.translate(this.x, this.y);
    context.rotate(this.rotation/10);

    var animation = this.animationArray[this.animationIdx];

    s_bird[animation].draw(
      context,
      -s_bird[animation].width/2,
      -s_bird[animation].height/2
    );
    context.restore();
  }
};
