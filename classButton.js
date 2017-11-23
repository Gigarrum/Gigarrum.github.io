class Button
{
	
	constructor(x, y, width, height,f){
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.clickFunction = f;
		this.isActive = false;
		Global.appendButtons(this);
	}
	
	mouseIsOver(mouseX, mouseY){
		if (mouseX < this.x || mouseX > this.x + this.width) return false;
		if (mouseY < this.y || mouseY > this.y + this.height) return false;
		return true;
	}

	
}






















