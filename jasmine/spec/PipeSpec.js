describe("Pipe", function(){

  beforeEach(function() {
    this.loadImages();
    FlappyBird.pipes.initialize();
    var pipes = FlappyBird.pipes;
  });

  describe("#initialize", function() {
    it("should initialize the pipe positions", function() {
      expect(FlappyBird.pipes.xPositions[0]).toEqual(FlappyBird.width);
      expect(FlappyBird.pipes.xPositions[1]).toEqual(FlappyBird.width + FlappyBird.pipes.distance);
    });
  });



});
