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
  glideDown: 4,
  glideUp: -4,
  states: {
    Dead: 2, Ascending: 1, Descending: 0
  },

  initialize: function() {
    this.y = 130;
    this.x = 30;
    this.rotation = 0;
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
    if (this.y < FlappyBird.height-FlappyBird.s_fg.height-FlappyBird.s_bird[0].height/2){
      this.y += 4;
    } else {
      FlappyBird.currentState = FlappyBird.states.Score;
    }
  },

  ascend: function(){
    if (this.ascendRate > -4){
      this.y -= this.ascendRate;
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
    if (this.currentState == this.states.Ascending) {
      this.y -= this.glideAngle;
      if (this.glideAngle > 0) {
        this.glideAngle-=0.2;
      }

    } else {
      this.y += this.glideAngle;
      if (this.glideAngle > 0) {
        this.glideAngle-=0.2;
      }
    }
  },

  changeGlideAngle: function(eventYPos){
    if (this.y < eventYPos){
      this.currentState = this.states.Descending;
    } else if (this.y > eventYPos){
      this.currentState = this.states.Ascending;
    }
    this.glideAngle = 4;
  },

  glideOrFly: function() {
    if (FlappyBird.currentMode === FlappyBird.gameModes.GlideBird){
      this.glide();
    } else {
      this.fly();
    }
  },

  update: function() {
    switch (FlappyBird.currentState) {
      case FlappyBird.states.Splash:
        this.flap();
        this.hover();
        break;
      case FlappyBird.states.Game:
        this.glideOrFly();
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

    FlappyBird.s_bird[animation].draw(
      context,
      -FlappyBird.s_bird[animation].width/2,
      -FlappyBird.s_bird[animation].height/2
    );
    context.restore();
  }
};
