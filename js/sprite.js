DualBird.Sprite = function(img, x, y, width, height) {
	this.img = img;
	this.x = x*2;
	this.y = y*2;
	this.width = width*2;
	this.height = height*2;
};

DualBird.Sprite.prototype.draw = function(ctx, x, y) {
	ctx.drawImage(this.img, this.x, this.y, this.width, this.height,
		x, y, this.width, this.height);
};

DualBird.initSprites = function(img) {

		this.s_bird = [
			new this.Sprite(img, 156, 115, 17, 12),
			new this.Sprite(img, 156, 128, 17, 12),
			new this.Sprite(img, 156, 141, 17, 12)
		];

		this.s_bg = new this.Sprite(img,   0, 0, 138, 114);
		this.s_bg.color = "#70C5CF";
		this.s_fg = new this.Sprite(img, 138, 0, 112,  56);

		this.s_pipeNorth = new this.Sprite(img, 251, 0, 26, 200);
		this.s_pipeSouth = new this.Sprite(img, 277, 0, 26, 200);

		this.s_text = {
			FlappyBird: new this.Sprite(img, 59, 114, 96, 22),
			GameOver:   new this.Sprite(img, 59, 136, 94, 19),
			GetReady:   new this.Sprite(img, 59, 155, 87, 22)
		};
		this.s_buttons = {
			Rate:  new this.Sprite(img,  79, 177, 40, 14),
			Menu:  new this.Sprite(img, 119, 177, 40, 14),
			Share: new this.Sprite(img, 159, 177, 40, 14),
			Score: new this.Sprite(img,  79, 191, 40, 14),
			Ok:    new this.Sprite(img, 119, 191, 40, 14),
			Start: new this.Sprite(img, 159, 191, 40, 14)
		};

		this.s_score  = new this.Sprite(img, 138,  56, 113, 58);
		this.s_splash = new this.Sprite(img,   0, 114,  59, 49);

		this.s_numberS = new this.Sprite(img, 0, 177, 6,  7);
		this.s_numberB = new this.Sprite(img, 0, 188, 7, 10);

		this.s_numberS.draw = this.s_numberB.draw = function(ctx, x, y, num) {
			num = num.toString();
			var step = this.width + 2;
			for (var i = 0, len = num.length; i < len; i++) {
				var n = parseInt(num[i]);
				ctx.drawImage(img, step*n, this.y, this.width, this.height,
					x, y, this.width, this.height);
				x += step;
			}
		};
};
