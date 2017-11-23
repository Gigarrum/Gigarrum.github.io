class PlatformTile extends Tile
{

	
	
	constructor(x, y, width, height, speedX){
		super(x, y, width, height, speedX);
		this.moe = 0.3;
		this.sprite = new Image;

	}
	
	start(){
		this.sprite.src = 'imgs/tiles/PlatformTile.jpg';
		//Create top collider with father's width and 10% of it's height
		this.colliders.push(new RectCollider(this.x,this.y,this.width,(this.height*this.moe),this.speedX,this.speedY));
		this.colliders.push(new RectCollider(this.x,this.y+(this.height*(1-this.moe)),this.width,(this.height*this.moe),this.speedX,this.speedY));
		this.colliders.push(new RectCollider(this.x, this.y+(this.height*this.moe), this.width, this.height*(1-2*this.moe), this.speedX, this.speedY));
		
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






















