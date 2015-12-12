beforeEach(function () {

  this.loadImages = function(){
    var img = new Image();
    img.src = "../images/sheet.png";
    FlappyBird.initSprites(this);
  };
});
