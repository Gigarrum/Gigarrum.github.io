class Tile extends GameObject
{
	
	constructor(x, y, width, height, speedX){
		super(x, y, width, height);
		this.speedX = speedX
		this.speedY;
		this.sprite = new Image;
		this.colliders = [];

	}
	
	start(){
		
		
	}

	update(){
		this.speedControl();
		
	}
	
	

	//set the speed for the tile and all the colliders it constains
	setSpeedX(val){

		this.speedX = val;

		if(this.colliders.length > 0)
		{
			this.colliders.forEach(function(collider){
				collider.speedX = val;
			});	
		}

		
	}

	
}






















