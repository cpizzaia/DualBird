beforeEach(function () {

  this.loadImages = function(){
    var img = new Image();
    img.src = "../images/sheet.png";
    DualBird.initSprites(this);
  };
});
