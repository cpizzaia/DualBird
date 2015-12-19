describe("Bird", function(){

  beforeEach(function() {
    this.loadImages();
    DualBird.bird.initialize();
  });

  describe("#initialize", function(){

    beforeEach(function () {
      DualBird.bird.initialize();
    });

    it("should set the position of the bird", function() {
      expect(DualBird.bird.y).toEqual(130);
      expect(DualBird.bird.x).toEqual(30);
    });

    it("should set the rotation of the bird", function() {
      expect(DualBird.bird.rotation).toEqual(0);
    });

  });


  describe("#flap", function() {

    it("should change the animation of the bird every FLAP_ANIMATION_RATE frames", function() {
      expect(DualBird.bird.animationIdx).toEqual(0);
      for (var i = 0; i < 5; i++){
        DualBird.frames++;
        expect(DualBird.bird.animationIdx).toEqual(0);
        DualBird.bird.flap();
      }
      expect(DualBird.bird.animationIdx).toEqual(1);
    });
  });

  describe("#hover", function() {

    it("should change the birds y position every frame with limits", function() {
      DualBird.bird.initialize();
      var initialXPos = DualBird.bird.x;
      var lastPosition = DualBird.bird.y;

      for (var i = 0; i < 1000; i++){
        DualBird.frames++;
        DualBird.bird.hover();
        expect(DualBird.bird.y).not.toEqual(lastPosition);
        expect(DualBird.bird.y).toBeLessThan(150);
        expect(DualBird.bird.y).toBeGreaterThan(110);
        lastPosition = DualBird.bird.y;
        expect(DualBird.bird.x).toEqual(initialXPos);
      }
    });
  });


  describe("#ascend", function() {
    it("should decrease the birds y position less and less each time till it descends", function() {
      var
      initialXPos = DualBird.bird.x,
      lastPosition = DualBird.bird.y,
      difference,
      lastDifference,
      i = 0;

      while (DualBird.bird.ascendRate > 0) {
        DualBird.bird.ascend();
        difference = lastPosition - DualBird.bird.y;

        if (i !== 0 ){
          expect(difference).toBeLessThan(lastDifference);
        }

        lastDifference = difference;
        expect(DualBird.bird.y).toBeLessThan(lastPosition);
        expect(DualBird.bird.x).toEqual(initialXPos);
        lastPosition = DualBird.bird.y;
        i = 1;
      }
    });
  });


  describe("#descend", function() {
    it("should increase the birds y position and not go below the foreground", function() {
      var
      initialXPos = DualBird.bird.x,
      lastPosition = DualBird.bird.y;


      for(i = 0; i < 1000; i++){
        if (DualBird.bird.y < DualBird.gameView.height-DualBird.gameView.s_fg.height-DualBird.gameView.s_bird[0].height/2) {
          DualBird.bird.descend();
          expect(lastPosition).toBeLessThan(DualBird.bird.y);
        } else {
          DualBird.bird.descend();
          expect(lastPosition).toEqual(DualBird.bird.y);
        }
        lastPosition = DualBird.bird.y;
      }
    });
  });

  describe("#rotate", function() {
    it("should increase the birds rotation until max rotation is reached", function() {
      var lastAngle = DualBird.bird.rotation;
      while (DualBird.bird.rotation < DualBird.bird.MAX_ROTATION) {
        DualBird.bird.rotate();
        expect(lastAngle).toBeLessThan(DualBird.bird.rotation);
        lastAngle = DualBird.bird.rotation;
      }
      DualBird.bird.rotate();
      expect(lastAngle).toBeLessThan(DualBird.bird.rotation);
    });
  });

  describe("#changeGlideAngle", function() {
    it("should set the state to ascending if the event is above the bird and set glide angle to MAX_GLIDE_ANGLE", function() {
      expect(DualBird.bird.glideAngle).toEqual(0);
      DualBird.bird.currentState = DualBird.bird.states.Descending;
      DualBird.bird.changeGlideAngle(DualBird.bird.y - 10);
      expect(DualBird.bird.currentState).toEqual(DualBird.bird.states.Ascending);
      expect(DualBird.bird.glideAngle).toEqual(DualBird.bird.MAX_GLIDE_ANGLE);
    });

    it("should set the state to descending if the event is below the bird and set glide angle to MAX_GLIDE_ANGLE", function() {
      expect(DualBird.bird.glideAngle).toEqual(0);
      DualBird.bird.currentState = DualBird.bird.states.Ascending;
      DualBird.bird.changeGlideAngle(DualBird.bird.y + 10);
      expect(DualBird.bird.currentState).toEqual(DualBird.bird.states.Descending);
      expect(DualBird.bird.glideAngle).toEqual(DualBird.bird.MAX_GLIDE_ANGLE);
    });
  });

  describe("#glideUp", function() {
    it("should move the bird up until the glide angle is zero", function() {
      var lastPosition = DualBird.bird.y;
      DualBird.bird.changeGlideAngle(lastPosition - 10);
      while (DualBird.bird.glideAngle > 0) {
        DualBird.bird.glideUp();
        expect(lastPosition).toBeGreaterThan(DualBird.bird.y);
        lastPosition = DualBird.bird.y;
      }

      DualBird.bird.glideUp();
      expect(lastPosition).toEqual(DualBird.bird.y);
    });
  });

  describe("#glideDown", function() {
    it("should move the bird down until the glide angle is zero", function() {
      var lastPosition = DualBird.bird.y;
      DualBird.bird.changeGlideAngle(lastPosition + 10);
      while (DualBird.bird.glideAngle > 0) {
        DualBird.bird.glideDown();
        expect(lastPosition).toBeLessThan(DualBird.bird.y);
        lastPosition = DualBird.bird.y;
      }

      DualBird.bird.glideUp();
      expect(lastPosition).toEqual(DualBird.bird.y);
    });
  });

});
