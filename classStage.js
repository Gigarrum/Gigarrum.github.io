class Stage extends GameObject
{
	
	constructor(level, player){
		super(0,0,0,0);
		this.tile = [];
		this.counter = 0;
		this.player = player;
		this.music = new Audio();
		this.level = level;
		this.background = new Image();
		
	}
	
	start(){

		this.music.play();
	}

	update(){
		this.collisionDetection();
		this.checkPlayerOutOfBounds();
	}

	placeTile(obj){
		this.tile[this.counter] = obj;
		this.counter++;
	}

	//Check collision for every collider from every tile
	collisionDetection()
	{
		//
		player.grounded = false;

		//this.tile.forEach(function(obj){
		for(var i = 0; i < this.tile.length; i++){
			if(this.tile[i] instanceof PlatformTile)
			{
				this.check4sideCollision(this.tile[i]);
			}
			else if(this.tile[i] instanceof OnOffTile && this.tile[i].on){
				this.check4sideCollision(this.tile[i]);
			}
			else if (this.tile[i] instanceof WinningTile)
			{
				if(this.tile[i].colliders[0].isCollidingWith(player)){
					Global.gameIsWon = true;
					Global.gameIsPaused = true;
					pauseLoop();
				}
			}else if(this.tile[i] instanceof ReverseGravityTile)
			{
				if(this.tile[i].colliders[0].isCollidingWith(player)){
					player.setGravity(this.tile[i].gravityWay);
				}
			}else if(this.tile[i] instanceof SpeedChangerTile && (!this.tile[i].speedChanged))
			{
				if(this.tile[i].colliders[0].isCollidingWith(player)){
					this.changeSpeed(this.tile[i].increase);
					this.tile[i].speedChanged = true;
				}
			}else if(this.tile[i] instanceof KillTile)
			{
				if(this.tile[i].colliders[0].isCollidingWith(player)){
					player.die();
				}
			}


		}
	}

	check4sideCollision(obj)
	{
		//check side collision
		if(obj.colliders[2].isCollidingWith(player)){
			player.die();
		}
		//check top collision
		else if(obj.colliders[0].isCollidingWith(player))
		{
			player.y = obj.y - player.height;

			//check if player is grounded for gravity top-bottom
			if(player.gravityScale > 0) 
			{
				player.grounded = true;
				player.speedY = 0;
			}


		}
		//check bottom collision
		else if(obj.colliders[1].isCollidingWith(player))
		{
			player.y = (obj.colliders[1].y+obj.colliders[1].height);


			//check if player is grounded for gravity bottom-top
			if(player.gravityScale < 0) 
			{
				player.grounded = true;
				player.speedY = 0;
			}


		}

	}

	checkPlayerOutOfBounds()
	{
		if(player.y - player.height < -300)
			player.die();
		else
			if(player.y > Global.canvas.height)
				player.die();
	}

	changeSpeed(increase)
	{

		if(increase)
		{
			this.tile.forEach(function(obj)
			{
				obj.setSpeedX(obj.speedX*1.25);
			});
		}
		else
		{
			this.tile.forEach(function(obj)
			{
				obj.setSpeedX(obj.speedX/1.25);
			});
		}

		
	}

	setStage(){
		this.string = Global.stageString(this.level);
		this.speedX = this.string[0][0] * (Global.blockSize/32);
		this.stageWidth = this.string[1].length;
		this.stageHeight = 21;
		this.music.src = this.string[0][1];
		this.background.src = this.string[0][2];
		this.counter = 0;
		this.offset = (8)*Global.blockSize;
	



		//read the stage string and instantiate objects 
		for(var j=1;j<this.stageHeight+1;j++){
			for(var i=0;i<this.stageWidth;i++)
			{
				switch(this.string[j][i])
				{
					case "a":
						this.placeTile(new PlatformTile(Global.blockSize*i + Global.canvas.width/2 - this.offset, Global.blockSize*(j-1), Global.blockSize, Global.blockSize, this.speedX));
						break;
					case "O":
						this.placeTile(new OnOffTile(Global.blockSize*i + Global.canvas.width/2 - this.offset, Global.blockSize*(j-1), Global.blockSize, Global.blockSize, this.speedX, true));
						break;
					case "o":
						this.placeTile(new OnOffTile(Global.blockSize*i + Global.canvas.width/2 - this.offset, Global.blockSize*(j-1), Global.blockSize, Global.blockSize, this.speedX, false));
						break;
					case "f":
						this.placeTile(new FakeTile(Global.blockSize*i + Global.canvas.width/2 - this.offset, Global.blockSize*(j-1), Global.blockSize, Global.blockSize, this.speedX));
						break;
					case "v":
						this.placeTile(new WinningTile(Global.blockSize*i + Global.canvas.width/2 - this.offset, Global.blockSize*(j-1), Global.blockSize, Global.blockSize, this.speedX));
						break;
					case "u":
						this.placeTile(new ReverseGravityTile(Global.blockSize*i + Global.canvas.width/2 - this.offset, Global.blockSize*(j-1), 2*Global.blockSize, 4*Global.blockSize, this.speedX,"up"));
						break;
					case "d":
						this.placeTile(new ReverseGravityTile(Global.blockSize*i + Global.canvas.width/2 - this.offset, Global.blockSize*(j-1),2*Global.blockSize, 4*Global.blockSize, this.speedX,"down"));
						break;
					case ">":
						this.placeTile(new SpeedChangerTile(Global.blockSize*i + Global.canvas.width/2 - this.offset, Global.blockSize*(j-1), Global.blockSize, Global.blockSize, this.speedX,true));
						break;
					case "<":
						this.placeTile(new SpeedChangerTile(Global.blockSize*i + Global.canvas.width/2 - this.offset, Global.blockSize*(j-1), Global.blockSize, Global.blockSize, this.speedX,false));
						break;
					case "M":
						this.placeTile(new KillTile(Global.blockSize*i + Global.canvas.width/2 - this.offset, Global.blockSize*(j-1), Global.blockSize, Global.blockSize, this.speedX,"up"));
						break;
					case "W":
					this.placeTile(new KillTile(Global.blockSize*i + Global.canvas.width/2 - this.offset, Global.blockSize*(j-1), Global.blockSize, Global.blockSize, this.speedX,"down"));
					break;	
				}
			}

		}
	}
		
}






















