describe("Pipe", function(){

  beforeEach(function() {
    this.loadImages();
    FlappyBird.pipes.initialize();
  });

  describe("#randomOffset", function() {
    it("reduces the spacing between the pipes each time it is called in glide bird mode", function() {
      var lastSpacing = FlappyBird.pipes.spacing;
      FlappyBird.pipes.randomOffset();
      expect(lastSpacing).toEqual(FlappyBird.pipes.spacing);
      FlappyBird.currentMode = FlappyBird.gameModes.GlideBird;
      FlappyBird.pipes.randomOffset();
      expect(lastSpacing).toBeGreaterThan(FlappyBird.pipes.spacing);
    });
  });

  describe("#initialize", function() {
    it("should initialize the pipe positions", function() {
      expect(FlappyBird.pipes.xPositions[0]).toEqual(FlappyBird.width);
      expect(FlappyBird.pipes.xPositions[1]).toEqual(FlappyBird.width + FlappyBird.pipes.distance);
    });
  });

  describe("#generateNewXPositions", function() {
    it("should generate new x positions for the pipes based on the current speed of the game", function() {
      var lastXpositions = [];
      FlappyBird.currentMode = FlappyBird.gameModes.FlappyBird;

      for (var i = 0; i < FlappyBird.pipes.xPositions.length; i++){
        lastXpositions[i] = FlappyBird.pipes.xPositions[i];
        FlappyBird.pipes.generateNewXPositions(i);
        expect(lastXpositions[i] - FlappyBird.FLAPPY_BIRD_SPEED).toEqual(FlappyBird.pipes.xPositions[i]);
      }

      FlappyBird.currentMode = FlappyBird.gameModes.GlideBird;

      for (i = 0; i < FlappyBird.pipes.xPositions.length; i++){
        lastXpositions[i] = FlappyBird.pipes.xPositions[i];
        FlappyBird.pipes.generateNewXPositions(i);
        expect(lastXpositions[i] - FlappyBird.GLIDE_BIRD_SPEED).toEqual(FlappyBird.pipes.xPositions[i]);
      }


    });
  });





});
