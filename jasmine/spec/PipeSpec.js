describe("Pipe", function(){

  beforeEach(function() {
    this.loadImages();
    DualBird.pipes.initialize();
  });

  describe("#randomOffset", function() {
    it("reduces the spacing between the pipes each time it is called in glide bird mode", function() {
      var lastSpacing = DualBird.pipes.spacing;
      DualBird.pipes.randomOffset();
      expect(lastSpacing).toEqual(DualBird.pipes.spacing);
      DualBird.currentMode = DualBird.gameModes.GlideBird;
      DualBird.pipes.randomOffset();
      expect(lastSpacing).toBeGreaterThan(DualBird.pipes.spacing);
    });
  });

  describe("#initialize", function() {
    it("should initialize the pipe positions", function() {
      expect(DualBird.pipes.xPositions[0]).toEqual(DualBird.width);
      expect(DualBird.pipes.xPositions[1]).toEqual(DualBird.width + DualBird.pipes.distance);
    });
  });

  describe("#generateNewXPositions", function() {
    it("should generate new x positions for the pipes based on the current speed of the game", function() {
      var lastXPositions = [];
      DualBird.currentMode = DualBird.gameModes.FlappyBird;

      for (var i = 0; i < DualBird.pipes.xPositions.length; i++){
        lastXPositions[i] = DualBird.pipes.xPositions[i];
        DualBird.pipes.generateNewXPositions(i);
        expect(lastXPositions[i] - DualBird.FLAPPY_BIRD_SPEED).toEqual(DualBird.pipes.xPositions[i]);
      }

      DualBird.currentMode = DualBird.gameModes.GlideBird;

      for (i = 0; i < DualBird.pipes.xPositions.length; i++){
        lastXPositions[i] = DualBird.pipes.xPositions[i];
        DualBird.pipes.generateNewXPositions(i);
        expect(lastXPositions[i] - DualBird.GLIDE_BIRD_SPEED).toEqual(DualBird.pipes.xPositions[i]);
      }
    });
  });

  describe("#generateNewYPositions", function() {
    it("should generate new y positions only in glide bird mode based on spacing", function() {
      var
      lastYTopPositions = [],
      lastYBotPositions = [];

      DualBird.currentMode = DualBird.gameModes.FlappyBird;

      for (var i = 0; i < DualBird.pipes.xPositions.length; i++){
        lastYTopPositions[i] = DualBird.pipes.yTopPositions[i];
        lastYBotPositions[i] = DualBird.pipes.yBotPositions[i];
        DualBird.pipes.randomOffset();
        DualBird.pipes.generateNewYPositions(i);
        expect(lastYTopPositions[i]).toEqual(DualBird.pipes.yTopPositions[i]);
        expect(lastYBotPositions[i]).toEqual(DualBird.pipes.yBotPositions[i]);
      }

      DualBird.currentMode = DualBird.gameModes.GlideBird;

      for (i = 0; i < DualBird.pipes.xPositions.length; i++){
        lastYTopPositions[i] = DualBird.pipes.yTopPositions[i];
        lastYBotPositions[i] = DualBird.pipes.yBotPositions[i];
        DualBird.pipes.randomOffset();
        DualBird.pipes.generateNewYPositions(i);
        expect(lastYTopPositions[i]).toBeLessThan(DualBird.pipes.yTopPositions[i]);
        expect(lastYBotPositions[i]).toBeGreaterThan(DualBird.pipes.yBotPositions[i]);
      }
    });
  });





});
