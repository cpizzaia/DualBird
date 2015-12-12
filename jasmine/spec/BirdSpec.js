describe("Bird", function(){

  beforeEach(function() {
    this.loadImages();
  });

  describe("#initialize", function(){

    beforeEach(function () {
      FlappyBird.bird.initialize();
    });

    it("should set the position of the bird", function() {
      expect(FlappyBird.bird.y).toEqual(130);
      expect(FlappyBird.bird.x).toEqual(30);
    });

    it("should set the rotation of the bird", function() {
      expect(FlappyBird.bird.rotation).toEqual(0);
    });

  });


  describe("#flap", function() {

    it("should change the animation of the bird every 5 frames", function() {
      expect(FlappyBird.bird.animationIdx).toEqual(0);
      for (var i = 0; i < 5; i++){
        FlappyBird.frames++;
        expect(FlappyBird.bird.animationIdx).toEqual(0);
        FlappyBird.bird.flap();
      }
      expect(FlappyBird.bird.animationIdx).toEqual(1);
    });
  });

  describe("#hover", function() {

    it("should change the birds y position every frame with limits", function() {
      FlappyBird.bird.initialize();
      var initialXPos = FlappyBird.bird.x;
      var lastPosition = FlappyBird.bird.y;

      for (var i = 0; i < 1000; i++){
        FlappyBird.frames++;
        FlappyBird.bird.hover();
        expect(FlappyBird.bird.y).not.toEqual(lastPosition);
        expect(FlappyBird.bird.y).toBeLessThan(150);
        expect(FlappyBird.bird.y).toBeGreaterThan(110);
        lastPosition = FlappyBird.bird.y;
        expect(FlappyBird.bird.x).toEqual(initialXPos);
      }
    });
  });


  describe("#ascend", function() {
    it("should decrease the birds y position less and less each time till it descends", function() {
      var
      initialXPos = FlappyBird.bird.x,
      lastPosition = FlappyBird.bird.y,
      difference,
      lastDifference,
      i = 0;

      while (FlappyBird.bird.ascendRate > 0) {
        FlappyBird.bird.ascend();
        difference = lastPosition - FlappyBird.bird.y;

        if (i !== 0 ){
          expect(difference).toBeLessThan(lastDifference);
        }

        lastDifference = difference;
        expect(FlappyBird.bird.y).toBeLessThan(lastPosition);
        expect(FlappyBird.bird.x).toEqual(initialXPos);
        lastPosition = FlappyBird.bird.y;
        i = 1;
      }
    });
  });


  describe("#descend", function() {
    it("should increase the birds y position and not go below the foreground", function() {
      var
      initialXPos = FlappyBird.bird.x,
      lastPosition = FlappyBird.bird.y;


      for(i = 0; i < 1000; i++){
        if (FlappyBird.bird.y < FlappyBird.height-FlappyBird.s_fg.height-FlappyBird.s_bird[0].height/2) {
          FlappyBird.bird.descend();
          expect(lastPosition).toBeLessThan(FlappyBird.bird.y);
        } else {
          FlappyBird.bird.descend();
          expect(lastPosition).toEqual(FlappyBird.bird.y);
        }
        lastPosition = FlappyBird.bird.y;
      }
    });
  });

  describe("#rotate", function() {
    it("should increase the birds rotation until max rotation is reached", function() {
      var lastAngle = FlappyBird.bird.rotation;
      while (FlappyBird.bird.rotation < FlappyBird.bird.MAX_ROTATION) {
        FlappyBird.bird.rotate();
        expect(lastAngle).toBeLessThan(FlappyBird.bird.rotation);
        lastAngle = FlappyBird.bird.rotation;
      }
      FlappyBird.bird.rotate();
      expect(lastAngle).toBeLessThan(FlappyBird.bird.rotation);
    });
  });

});
