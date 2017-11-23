class OnOffTile extends Tile
{

	//level code = O(on blocks) or o(off blocks) 
	//size 32x32

	constructor(x, y, width, height, speedX, on){
		super(x, y, width, height, speedX);
		this.moe = 0.3;
		this.on = on;
		Global.appendOnOff(this);
		this.offSprite = new Image;
	}
	
	start(){
		this.sprite.src = 'imgs/tiles/OnOffTile_ON.png';
		this.offSprite.src = 'imgs/tiles/OnOffTile_OFF.png';

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
		if(this.on){
			Global.ctx.drawImage(this.sprite,this.x,this.y, this.width, this.height);
		}
		else{
			Global.ctx.drawImage(this.offSprite,this.x,this.y, this.width, this.height);
		}
	}

}






















