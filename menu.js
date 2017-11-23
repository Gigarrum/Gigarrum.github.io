// establish vars
var source, context, analyser, fbc_array, rads,
	center_x, center_y, radius, radius_old, deltarad,
	bars, bar_x, bar_y, bar_x_term, bar_y_term, bar_width,
	bar_height, react_x, react_y, intensity, rot, inputURL,
	JSONPThing, JSONResponse;

var circleColor = 0;
var decrementCircleColor = false;

//botoes declarados
var buttonPlay;
var buttonControls;
var imageControls;

var aux = 0;

//Importa a nova fonte, lobster, neste caso
WebFont.load({
    google: {
      families: ['Lobster']
    }
  });

var client_id = "8df0d68fcc1920c92fc389b89e7ce20f";

bars = 230;		//Quantidade de barras no audio spectrum
react_x = 0;	
react_y = 0;
radius = 0;		//raio
deltarad = 0;	//delta radiano
rot = 0;		//rotação
intensity = 0;

function initPage() {

	Global.createGlobals();

	Global.canvas = document.getElementById("gameCanvas"); //"Declara o Global.canvas"
	Global.ctx = Global.canvas.getContext("2d"); // Define que o tipo do Global.canvas é 2d
	resize_canvas();

	buttonPlay = new Button (Global.canvas.width/2 - 41, Global.canvas.height/2 - Global.canvas.height * 0.05, 82, 45,
	function(){
		audio.pause();
		gameStart(1);
		buttonPlay.isActive = false;
		buttonControls.isActive = false;
	});
	buttonPlay.isActive = true;
	buttonControls = new Button (Global.canvas.width/2 - 41, Global.canvas.height/2 + Global.canvas.height * 0.05, 120, 45,
	function(){
		imageControls.enabled = true;
	});
	buttonControls.isActive = true;

	imageControls = new Image();
	imageControls.enabled = false;
	imageControls.src = "imgs/screens/ControlScreen.png";


    //Chama a função quando o mouse se mover
    Global.canvas.addEventListener("mousemove", on_mousemove, false);

    //Chama a função quando o mouse executar um clique
    Global.canvas.addEventListener("click", on_mouseclick, false);


	/* DECLARE O BOTÃO LA EM CIMA
	buttonNovo = new Button (x, y, largura, altura,
		function(){

		});
	*/

	audio = new Audio(); // Instancia um novo objeto audio
	audio.crossOrigin = "anonymous"; //Não vai ter o sinalizador de credenciais definido, ou seja, não haverá troca de credenciais através de coockies
	audio.loop = true; //quando a musica terminar, ela reinicia e fica em um loop
	
	context = new AudioContext(); // instacia um novo AudioObject
	analyser = context.createAnalyser(); // Cria um AnalyserNode, que serve para mostrar dados do tempo/frequencia do audio e criar visualização de dados
	//reencaminha a reprodução do audio no grafico de processamento do AudioContext
	source = context.createMediaElementSource(audio);
	source.connect(analyser);
	analyser.connect(context.destination);
	//------------------------------------------------------------------------
	
	fbc_array = new Uint8Array(analyser.frequencyBinCount); //Cria uma matrix com a representação dos dados do som
	
	frameLoop(); //cria animação para a frequencia no audio

}

//func para redimencionar o Global.canvas
function resize_canvas() {
		Global.canvas.width  = window.innerWidth;
		Global.canvas.height = window.innerHeight;
}

function getJSON(url, callback) {
	JSONPThing = document.createElement("script"); //cria um elemento <script>
	JSONPThing.type = "text/javascript"; //define o tipo do elemento criado, como - <script type="text/javascript" src="jogo.js"></script>
	JSONPThing.src = url + "&callback=" + callback.name; //define a rota que será acessada
	document.body.appendChild(JSONPThing); //appendChild linka o JASONPTHING com o body
}

function userJSONCallback(data) {
	document.body.removeChild(JSONPThing); // remove o vinculo entre JSONPThing e body
	JSONPThing = null;
	
	var user_id = data.id;
	
	var tracks = "https://api.soundcloud.com/users/" + user_id + "/tracks.json?client_id=" + client_id + "&limit=200"; //coloca o link como valor de "tracks"

	getJSON(tracks, tracksJSONCallback); //Resto das mod em tracksJSONCallback
}

function tracksJSONCallback(data) {
	document.body.removeChild(JSONPThing); // remove o vinculo entre JSONPThing e body
	JSONPThing = null;
	
	// percorre cada objeto da matriz (cada faixa de audio)
	for(var i = 0; i < data.length; i++) {
		var track = data[i];
		// verifica cada musica com a url de entrada
		if(track.permalink == soundCloudTrackName) {
			inputURL = track.stream_url + "?client_id=" + client_id;
			title = track.title;
			img_url = track.artwork_url;
			
			initMp3Player();
			break;
		}
	}
}

function startMusic()
{
	var inputURL = document.getElementById("input_URL").value;
	if(inputURL.search("soundcloud.com") != -1 && inputURL.search("api.soundcloud.com") == -1) { // vai fazer a busca do link do soundcloud entrado
		var splitBySlash = inputURL.replace(/http:\/\/|https:\/\//gi, "").split("/"); // retira os "http://" / "https://" da url e depois a divide em cortes
		if(splitBySlash.length == 3) { // verifica se realmente há uma musica
			var soundCloudUserURL = "http://" + splitBySlash[0] + "/" + splitBySlash[1];
			soundCloudTrackName = splitBySlash[2];
			var apiResovleURL = "https://api.soundcloud.com/resolve.json?url=" + soundCloudUserURL + "&client_id=" + client_id;
			getJSON(apiResovleURL, userJSONCallback); // chama a func getJason
		}
	}
}

			
function initMp3Player() {

	audio.src = inputURL;
	
	pause = 0;
	
	audio.loop = true;
	audio.play();

}
			
function frameLoop() {
	resize_canvas(); // reescala o Global.canvas
				
	var grd = Global.ctx.createLinearGradient(0, 0, 0, Global.canvas.height); // cria um gradiente q varia entre as
	grd.addColorStop(0, "rgba(24, 21, 42, 1)");
	grd.addColorStop(1, "rgba(48, 66, 83, 1)");

	Global.ctx.fillStyle = grd; //aplica o estilo do gradiente no retangulo
	Global.ctx.fillRect(0, 0, Global.canvas.width, Global.canvas.height); // cria um retangulo do tamanho ta tela do usuário
		
	rot = rot + intensity * 0.000000001;
				
	intensity = 0;
				
	analyser.getByteFrequencyData(fbc_array);
	aux += 1;
	var j = 0;
	var k = 0;
	for (var i = 0; i < bars; i++) {
		rads = Math.PI * 2 / bars; //Seta um valor para que as barras sejam divididas igualmente nos 360 graus do circulo
						
		bar_x = center_x; // define o ponto x iniial da barra
		bar_y = center_y; // define o ponto y inicial da barra

		bar_height = Math.min(99999, Math.max((fbc_array[i] * 3.5 - 200), 0)); //altura das barras
		bar_width = bar_height * 0.02; //largura das barras
						
		bar_x_term = center_x + Math.cos(rads * i + rot) * (radius + bar_height);//posiciona barras dependendo da variação de x
		bar_y_term = center_y + Math.sin(rads * i + rot) * (radius + bar_height);//posiciona barras dependendo da variação de y
						
		Global.ctx.save();//salva em uma pilha o estado atual do Global.canvas
		if(i < bars/2) j+= 2;
		else j-= 2;

		if(aux % 10000) k = Math.floor(Math.random() * 255);

		var lineColor = "rgb(" + (fbc_array[i]).toString() + ", " + 255 + ", " + 255  + ")";//Define as cores das linhas
		//var lineColor = "rgb(" + 0 + ", " + (Math.floor(j)) + ", " + 255  + ")";//Define as cores das linhas
  							
		Global.ctx.strokeStyle = lineColor;//aplica a cor nas linhas que seguem a frequencia
		Global.ctx.lineWidth = bar_width; // largura das linhas
		//define os caminhos
		Global.ctx.beginPath();
		Global.ctx.moveTo(bar_x, bar_y);
		Global.ctx.lineTo(bar_x_term, bar_y_term);
		//---------------------------
		Global.ctx.stroke();//Desenha caminho na tela
				
		intensity += bar_height;
	}
				
	center_x = Global.canvas.width / 2 - 0.007; //centro x do circulo
	center_y = Global.canvas.height / 2 - 0.007;//centro y do circulo

	//Controle da cor do circulo 
	if(circleColor == 150 || decrementCircleColor == true)
	{
		decrementCircleColor = true;
		circleColor--;
	}

	if(circleColor == 40 || decrementCircleColor == false)
	{
		decrementCircleColor = false;
		circleColor++;
	}
	
				
	radius =  250; //tamanho do circulo
	
	Global.ctx.fillStyle = "rgb("+ circleColor +", 255, 255)"; // cor do circulo
	Global.ctx.beginPath(); //define o caminho da circunferencia
	Global.ctx.arc(center_x, center_y, radius + 2, 0, Math.PI * 2, false); //desenha o circulo
	Global.ctx.fill();//preenche o "caminho" do desenhor atual

	//Sombra do nome do Jogo
    Global.ctx.font = "150px Lobster";
    Global.ctx.fillStyle = "rgb(0, 0, 0)";
    Global.ctx.textAlign = "center";
    Global.ctx.fillText("Beat Land", Global.canvas.width/2, Global.canvas.height/2 - 155);

    //Nome do Jogo
    Global.ctx.font = "155px Lobster";
    Global.ctx.fillStyle = "rgb(152, 51, 82)";
    Global.ctx.textAlign = "center";
    Global.ctx.fillText("Beat Land", Global.canvas.width/2, Global.canvas.height/2 - 155);

    //Escrito Play
   	Global.ctx.font = "45px Lobster";
    Global.ctx.fillStyle = "rgb(152, 51, 82)";
    Global.ctx.textAlign = "center";
    Global.ctx.fillText("Play", Global.canvas.width/2, buttonPlay.y + 45);
    //Pega a largura e a altura da palavra "easy"
    playWidth = Global.ctx.measureText("Play").width;

    //Escrito Controls
    Global.ctx.font = "45px Lobster";
    Global.ctx.fillStyle = "rgb(152, 51, 82)";
    Global.ctx.textAlign = "center";
    Global.ctx.fillText("Controls", Global.canvas.width/2, buttonControls.y + 45);
    //Pega a largura e a altura da palavra "easy"
    controlsWidth = Global.ctx.measureText("Controls").width;
  

    //Headphone
    Global.ctx.font = "45px Lobster";
    Global.ctx.fillStyle = "rgb(210, 100, 100)";
    Global.ctx.textAlign = "left";
    Global.ctx.fillText("Recomendado o uso de headphone", 0, Global.canvas.height - Global.canvas.height*0.02);


	if(imageControls.enabled)
		Global.ctx.drawImage(imageControls,Global.canvas.width/2 - imageControls.width/4,Global.canvas.height/2 - imageControls.height/4, imageControls.width/2, imageControls.height/2);

    if(Global.mainMenu)
    {
		window.requestAnimationFrame(frameLoop); //gera o looping do frameLoop
	}
}

//Função para verificar a posição do mouse no Global.canvas e verificar se ele clicou no link
function on_mousemove (ev) {

	var x, y;

	//Pega a posição do mouse na tela
	if (ev.layerX || ev.layerX == 0) //Tratamento para o Firefox
	{ 
	      x = ev.layerX;
	      y = ev.layerY;
	}

	  x -= Global.canvas.offsetLeft;
	 y -= Global.canvas.offsetTop;

	  //Verifica se o mouse está sobre a palavra "Play e se o jogo está no menu inicial"
	 
	  if(buttonPlay.mouseIsOver(x, y) && buttonPlay.isActive)
	  {
	      document.body.style.cursor = "pointer";
	      //Altera a variavel mostrando que o mouse esta em cima do link
	      inLink = true;
	      difAtual = 1;
	  }
	  else
	  {
	      inLink=false;
	      //Verifica se o mouse está sobre a palavra "Controls e se o jogo está no menu inicial"
	      
	      if(buttonControls.mouseIsOver(x, y) && buttonControls.isActive && !imageControls.enabled)
	      {
	          document.body.style.cursor = "pointer";
	          //Altera a variavel mostrando que o mouse esta em cima do link
	          inLink = true;
	          difAtual = 2;
	      }
	      else
	      {
	          document.body.style.cursor = "";
	          inLink=false;

	      }
	  }

}

function on_mouseclick(e)
{
	imageControls.enabled = false;
	if(inLink){

		if(difAtual == 1)
		{
			buttonPlay.clickFunction();
		}

		if(difAtual == 2)
		{
			buttonControls.clickFunction();
		}
	}
}