class FakeTile extends Tile
{

	
	constructor(x, y, width, height, speedX){
		super(x, y, width, height);
		this.speedX = speedX
		this.speedY;
		this.sprite = new Image;
		this.moe = 0.3;

	}
	
	start(){
		this.sprite.src = 'imgs/tiles/PlatformTile.jpg';
		//Create top collider with father's width and 10% of it's height

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






















