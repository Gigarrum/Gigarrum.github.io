class RectCollider extends GameObject{

	constructor(x,y,width,height,speedX,speedY){
		super(x,y,width,height);
		this.speedX = speedX;
		this.speedY = speedY;
		
		
	}

	update(){
		this.speedControl();
		
	}

	start(){

	}

	
	
	isCollidingWith(gameObj){

		if ((this.x + this.width) < gameObj.x || this.x > (gameObj.x + gameObj.width)) return false;
		if ((this.y + this.height) < gameObj.y || this.y > (gameObj.y + gameObj.height)) return false;

		return true;
	}

}