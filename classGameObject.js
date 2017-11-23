class GameObject
{
	
	constructor(x, y, width, height){
		this.x = x;
		this.y = y;
		this.speedX = 0;
		this.speedY = 0;
		this.width = width;
		this.height = height;
		Global.appendGameObjs(this);
	}
	 
	

	start(){}
	
	update(){}

	
	speedControl(){
		this.x += this.speedX * Global.deltaTime/10;
		this.y += this.speedY;
	}
}