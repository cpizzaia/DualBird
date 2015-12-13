describe("Game", function() {

  beforeEach(function() {
    this.loadImages();
    DualBird.resetGame();
  });

  describe("#collisionCheck", function() {
    it("it should detect a collision between the bird and the pipes and then set the state to score", function() {
      DualBird.pipes.xPositions[0] = 30;
      DualBird.pipes.yBotPositions[0] = 130;
      DualBird.collisionCheck();
      expect(DualBird.currentState).toEqual(DualBird.states.Score);
    });

    it("it should allow the bird to fly through the gap", function() {
      DualBird.pipes.xPositions[0] = DualBird.bird.x - DualBird.s_bird[0].width/2;
      DualBird.pipes.yBotPositions[0] = DualBird.bird.y+DualBird.s_bird[0].height/2;
      DualBird.pipes.yTopPositions[0] = DualBird.bird.y-DualBird.s_pipeNorth.height-DualBird.s_bird[0].height/2;
      DualBird.collisionCheck();
      expect(DualBird.currentState).toEqual(DualBird.states.Splash);
    });


    it("it should not detect a collision when the bird is not in range of the pipe", function() {
      DualBird.pipes.xPositions[0] = DualBird.bird.x+DualBird.s_bird[0].width/4+1;
      DualBird.pipes.yBotPositions[0] = DualBird.bird.y;
      DualBird.pipes.yTopPositions[0] = DualBird.bird.y-DualBird.s_pipeNorth.height;
      DualBird.collisionCheck();
      expect(DualBird.currentState).toEqual(DualBird.states.Splash);
    });

    it("it should detect a collision when the bird is in range of the pipe and they are closed", function() {
      DualBird.pipes.xPositions[0] = DualBird.bird.x+DualBird.s_bird[0].width/4;
      DualBird.pipes.yBotPositions[0] = DualBird.bird.y;
      DualBird.pipes.yTopPositions[0] = DualBird.bird.y-DualBird.s_pipeNorth.height;
      DualBird.collisionCheck();
      expect(DualBird.currentState).toEqual(DualBird.states.Score);
    });


    it("it should detect a collision when the bird is hits the bottom pipe", function() {
      DualBird.pipes.xPositions[0] = DualBird.bird.x;
      DualBird.pipes.yBotPositions[0] = DualBird.bird.y-1+DualBird.s_bird[0].height/2;
      DualBird.pipes.yTopPositions[0] = DualBird.bird.y-DualBird.s_pipeNorth.height-DualBird.s_bird[0].height/2;
      DualBird.collisionCheck();
      expect(DualBird.currentState).toEqual(DualBird.states.Score);
    });

    it("it should detect a collision when the bird is hits the top pipe", function() {
      DualBird.pipes.xPositions[0] = DualBird.bird.x;
      DualBird.pipes.yBotPositions[0] = DualBird.bird.y+DualBird.s_bird[0].height/2;
      DualBird.pipes.yTopPositions[0] = DualBird.bird.y+1-DualBird.s_pipeNorth.height-DualBird.s_bird[0].height/2;
      DualBird.collisionCheck();
      expect(DualBird.currentState).toEqual(DualBird.states.Score);
    });
  });
});
