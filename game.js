var player;
var stage;
var victoryScreen = new Image;
var defeatScreen = new Image;
var retryButton;
var menuButton;

//Control the canvas size
function resizeCanvas()
{
	Global.canvas.width = window.innerWidth;
	Global.canvas.height = window.innerHeight;
}

//Init all variables and objects 
function gameStart(stageCode)
{

	//Game is not on menu anymore
	Global.mainMenu = false;

	//define ingame menu screens
	victoryScreen.src = 'imgs/screens/victoryScreen.png';
	defeatScreen.src = 'imgs/screens/defeatScreen.png';

	//set retry button
	retryButton = new Button(473,383,170,50,
	function(){
		setGame(stageCode);
	});

	//set menu button
	menuButton = new Button(709,383,170,50,
	function(){
		console.log("crico");
		Global.gameIsPaused = true;
		Global.mainMenu = true;

		//reload main menu sound
		audio.load();
		audio.play();
		frameLoop();

	});

	
	window.addEventListener("keydown", getKeyDown);
	window.addEventListener("mousemove", onMouseMove);
	window.addEventListener("click", onMouseClick);

	setGame(stageCode);
}

//Control input listener
function getKeyDown(e){	

	//Should work only when game is running
	if(!Global.gameIsPaused)
	{
		//Up arrow -> JUMP \o/
		if (e.keyCode == '38') {
			player.jump();
		}
		//Q buttom
		else if (e.keyCode == '81') {
			Global.onOffTiles.forEach(function(obj){
				obj.on = !obj.on;
			});
		}
	}

	//P pause
	if (e.keyCode == '80'){
		if(Global.gameIsPaused && (!Global.gameIsWon) && (!Global.gameIsLost))
		{
			Global.gameIsPaused = false;
			gameLoop();
		}
		else
		{
			Global.gameIsPaused = true;
			pauseLoop();
		}
	}

	if(e.keyCode == '82')
	{
		if(retryButton.isActive){
			retryButton.clickFunction();
		}
	}
}

function startObjs()
{
	
	//Call all "gameObjs" start function
	Global.gameObjs.forEach(function(obj){
		obj.start();
	});
}

function setGame(stageCode)
{
	//everytime game is set, the block sizes are aswell, based on the canvas size. that makes it run in any window size
	Global.blockSize = Global.canvas.height / 21;
	
	//clean all arrays from the game
	Global.gameObjs.length = 0;
	Global.onOffTiles.length = 0;

		
	//instantiate player again
	player = new Player(Global.canvas.width/2 - 32 - 8*Global.blockSize,Global.blockSize * 10, 2*Global.blockSize, 2*Global.blockSize);

	//instantiate stage again
	stage = new Stage(stageCode,player);

	//clean all tiles
	stage.tile.length = 0;

	//unable retry button
	retryButton.isActive = false;
	menuButton.isActive = false;

	//set all stage and game objs again
	stage.setStage();
	startObjs();
	
	//unpause the game
	Global.gameIsPaused = Global.gameIsWon = Global.gameIsLost = false;
	Global.lastFrameTime = new Date();
	
	gameLoop();

}

//Main game loop
function gameLoop()
{

	var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFram || window.msRequestAnimationFrame;
	
	if(stage.music.paused){
		stage.music.play();
	}

	//Clear canvas
	Global.ctx.drawImage(stage.background,0,0,Global.canvas.width,Global.canvas.height);
	Global.deltaTime = new Date() - Global.lastFrameTime;
	Global.lastFrameTime = new Date();
	
	
	
	//Call all "gameObjs" update function
	Global.gameObjs.forEach(function(obj){
		obj.update();

	});
	
	//Game continues if it isn't paused
	if(!Global.gameIsPaused)
	{
		//Request game loop
		requestAnimationFrame(gameLoop);
	}
	
}


//Paused game loop
function pauseLoop()
{
	var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFram || window.msRequestAnimationFrame;
	Global.deltaTime = new Date() - Global.lastFrameTime;
	Global.lastFrameTime = new Date();	
	if(!stage.music.paused){
		stage.music.pause();
	} 

	if(Global.gameIsWon || Global.gameIsLost){

		//call endGameLoop
		retryButton.isActive = true;
		menuButton.isActive = true;
		endGameLoop();

	}else if(Global.gameIsPaused){

		//Request pause loop
		requestAnimationFrame(pauseLoop);
	}
	
}

function endGameLoop()
{

	var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFram || window.msRequestAnimationFrame;
	Global.deltaTime = new Date() - Global.lastFrameTime;
	Global.lastFrameTime = new Date();	
	if(Global.gameIsWon){

		Global.ctx.drawImage(victoryScreen,Global.canvas.width/2 - victoryScreen.width/2,Global.canvas.height/2 - victoryScreen.height/2);

	}else if (Global.gameIsLost) {

		Global.ctx.drawImage(defeatScreen,Global.canvas.width/2 - defeatScreen.width/2,Global.canvas.height/2 - victoryScreen.height/2);
	}
	
	//Request endGameLoop
	if(Global.gameIsLost || Global.gameIsWon){
		requestAnimationFrame(endGameLoop);
	}
	

}

function onMouseMove (ev) {

	//Pega a posição do mouse na tela
    if (ev.layerX || ev.layerX == 0) //Tratamento para o Firefox
    { 
          Global.mousePositionX = ev.layerX;
          Global.mousePositionY = ev.layerY;
    }

     Global.mousePositionX -= Global.canvas.offsetLeft;
     Global.mousePositionY -= Global.canvas.offsetTop;

     //DEBUG -> console.log(Global.mousePositionX + "    " + Global.mousePositionY);
     

}

function onMouseClick(ev){

	 //DEBUG -> 
	 console.log(Global.mousePositionX + "    " + Global.mousePositionY)	

	Global.buttons.forEach(function(obj){
				
		if(obj.isActive){
			if(obj.mouseIsOver(Global.mousePositionX, Global.mousePositionY)){
				obj.clickFunction();
			}
		}

	});

}



