class KillTile extends Tile
{

	//level code = M or W depends on direction
	
	
	constructor(x, y, width, height, speedX,d){
		super(x, y, width, height, speedX);
		this.direction = d;
		this.moe = 0.2;
	}
	
	start(){

		if(this.direction == "up")
		{
			this.sprite.src = 'imgs/tiles/KillTile_UP.png';
		}
		else
		{
			this.sprite.src = 'imgs/tiles/KillTile_DOWN.png';
		}
		

		//Create collider with full size to check win state
		this.colliders.push(new RectCollider(this.x + this.width * this.moe,this.y + this.height * this.moe, this.width - 2*this.width*this.moe,this.height - 2*this.height*this.moe,this.speedX,this.speedY));
		
		
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






















