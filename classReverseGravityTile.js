class ReverseGravityTile extends Tile
{
	//level code = u (gravity reverse bottom-top) or d (gravity reverse top-bottom)
	//size 64x128
	
	constructor(x, y, width, height, speedX,way){
		super(x, y, width, height, speedX);
		this.gravityWay = way;
		
	}
	
	start(){
		this.sprite.src = 'imgs/tiles/ReverseGravityTile.png';

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