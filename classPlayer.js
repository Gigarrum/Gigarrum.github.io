class Player extends GameObject
{

	
	constructor(x, y, width, height){
		super(x, y, width, height)
		this.sprite = new Image;
		this.flipSprite = new Image;
		this.speedY = 0;
		this.gravityScale = 0.25 * (Global.blockSize/32);
		this.jumpForce = 9.4 * (Global.blockSize/32);
		this.maxSpeed = 9.5 * (Global.blockSize/32);
		this.grounded = false;
	}
	
	start(){
		this.sprite.src = 'imgs/player/player.png';
		this.flipSprite.src = 'imgs/player/flippedPlayer.png';
		
	}

	update(){
		this.gravityControl();
		this.speedControl();
		this.draw();
	}
	
	die(){
		Global.gameIsLost = true;
		Global.gameIsPaused = true;
		pauseLoop();
	}

	draw(){
		if(this.gravityScale > 0)
		{			
			Global.ctx.drawImage(this.sprite,this.x,this.y,this.width,this.height);	
		}
		else
		{
			Global.ctx.drawImage(this.flipSprite,this.x,this.y,this.width,this.height);	
		}
	}

	gravityControl(){
		if(Math.abs(this.speedY) >= this.maxSpeed)
			this.speedY = this.maxSpeed * Math.sign(this.gravityScale);
		else
			this.speedY += this.gravityScale * Global.deltaTime/10;
			
	}

	reverseGravity(){
		this.gravityScale *= -1;
		this.speedY *= -1;
	}
	
	jump()
	{
		if(this.grounded)
		{
			if(this.gravityScale > 0)
				player.speedY = -player.jumpForce;
			else
				player.speedY = player.jumpForce;
	
		}
	}

	setGravity(way)
	{
		//check if gravity can be altered
		if(way == "up" && this.gravityScale > 0)
		{
			this.reverseGravity();
		}
		else if (way == "down" && this.gravityScale < 0)
		{
			this.reverseGravity();
		}


	}


}






















