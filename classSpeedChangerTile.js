class SpeedChangerTile extends Tile
{
	//level code = >(speed-up) or <(speed-down) 
	//size 
	
	constructor(x, y, width, height, speedX,increase){
		super(x, y, width, height, speedX);
		this.speedChanged = false;
		this.increase = increase;
		
	}
	
	start(){
		if(this.increase)
			this.sprite.src = 'imgs/tiles/SpeedUpTile.png';
		else
			this.sprite.src = 'imgs/tiles/SpeedDownTile.png';


		//Create collider with full size to check gravity change
		this.colliders.push(new RectCollider(this.x,this.y,this.width,this.height,this.speedX,this.speedY));
		
	}

	update(){
		this.speedControl();
		this.draw();
	}
	
	draw(){
		if(this.x > -100 && this.x < Global.canvas.width + 100)
		Global.ctx.drawImage(this.sprite,this.x,this.y, this.width, this.height);
	}



	

	
}