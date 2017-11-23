class WinningTile extends Tile
{

	//level code = w 
	//size 32x32
	
	constructor(x, y, width, height, speedX){
		super(x, y, width, height, speedX);
		
	}
	
	start(){
		this.sprite.src = 'imgs/tiles/WinningTile.png';

		//Create collider with full size to check win state
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






















