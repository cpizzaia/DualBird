DualBird.bird = {
  MAX_ROTATION: 1.5,
  ASCEND_RATE: 8,
  FLAP_ANIMATION_RATE: 5,
  MAX_GLIDE_ANGLE: 4,
  GLIDE_ANGLE_REDUCER: 0.2,

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

  initialize: function() {
    this.y = 130;
    this.x = 30;
    this.rotation = 0;
    this.glideAngle = 0;
  },

  dead: function(){
    this.descend();
    this.rotate();
  },

  flap: function(){
    this.animationIdx = Math.floor(DualBird.frames/this.FLAP_ANIMATION_RATE) % this.animationArray.length;
  },

  rotate: function(){
    if (this.rotation/10 < this.MAX_ROTATION){
      this.rotation++;
    }
  },

  descend: function(){
    if (this.y < DualBird.gameView.height-DualBird.gameView.s_fg.height-DualBird.gameView.s_bird[0].height/2){
      this.y += 4;
    } else {
      DualBird.currentState = DualBird.states.Score;
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
    this.ascendRate = this.ASCEND_RATE;
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
    this.y += Math.cos(DualBird.frames/10);
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
      this.glideUp();
    } else {
      this.glideDown();
    }
  },

  glideUp: function() {
    this.y -= this.glideAngle;
    if (this.glideAngle > 0) {
      this.glideAngle-= this.GLIDE_ANGLE_REDUCER;
    }
  },

  glideDown: function() {
    this.y += this.glideAngle;
    if (this.glideAngle > 0) {
      this.glideAngle-= this.GLIDE_ANGLE_REDUCER;
    }
  },

  changeGlideAngle: function(eventYPos){
    if (this.y < eventYPos){
      this.currentState = this.states.Descending;
    } else if (this.y > eventYPos){
      this.currentState = this.states.Ascending;
    }
    this.glideAngle = this.MAX_GLIDE_ANGLE;
  },

  glideOrFly: function() {
    if (DualBird.currentMode === DualBird.modes.GlideBird){
      this.glide();
    } else {
      this.fly();
    }
  },

  update: function() {
    switch (DualBird.currentState) {
      case DualBird.states.Splash:
        this.flap();
        this.hover();
        break;
      case DualBird.states.Game:
        this.glideOrFly();
        this.flap();
        break;
      case DualBird.states.Score:
        this.dead();
        break;
    }
  },

  draw: function(context){
    context.save();
    context.translate(this.x, this.y);
    context.rotate(this.rotation/10);

    var animation = this.animationArray[this.animationIdx];

    DualBird.gameView.s_bird[animation].draw(
      context,
      -DualBird.gameView.s_bird[animation].width/2,
      -DualBird.gameView.s_bird[animation].height/2
    );
    context.restore();
  }
};
