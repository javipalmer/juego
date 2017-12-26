var app={
		
	inicio: function(){
		
		alto  = document.documentElement.clientHeight;
	    ancho = document.documentElement.clientWidth;
	    app.vigilaSensores();
	    app.iniciajuego();
	   
	    var dado1t;
	    var dado2t;
	    var dado3t;
	    var dado4t;
	    var dado5t;
	    
		var dado1v;
		var dado2v;
		var dado3v;
		var dado4v;
		var dado5v;
		var cubilete;
		var creo;
		var mentir;
		var envio;
		
		var somesa;
		var soagitar;
		var solanzarcu;
	},
	
	iniciajuego: function(){
		
		function preload(){
		//carga juego e imagenes
		game.physics.startSystem(Phaser.Physics.ARCADE);
		game.stage.backgroundColor = '#002233';
		game.load.image('roja', 'image/0.png');
		game.load.image('as', 'image/1.png');
		game.load.image('jota', 'image/2.png');
		game.load.image('ka', 'image/3.png');
		game.load.image('negra', 'image/4.png');
		game.load.image('qu', 'image/5.png');
		game.load.image('cubilete', 'image/cubilete.png');
		game.load.image('enviar', 'image/enviar.png');
		game.load.image('creer', 'image/creer.png');
		game.load.image('mentiroso', 'image/mentiroso.png')
		game.load.audio("dadomesa","music/dadomesa.mp3");
		game.load.audio("agitar","music/agitar.mp3");
		game.load.audio("lanzarcu","music/lanzarcu.mp3");
		
		}
		
		function create(){
			
			posydadov = alto - 70; 
			posxdadov = ancho/5;
			var lienzo = game.add.graphics(0,0);
			lienzo.beginFill(0xfa33aa);
			lienzo.drawRect(0,0,ancho,30); // coordenada X, coordenada Y, ancho y alto
			//Tapete
			lienzo.beginFill(0x154946);
			lienzo.drawRect(0,30,ancho,alto/2);
			//Zona tiro
			lienzo.beginFill(0x804000);
			lienzo.drawRect(0,alto/2,ancho,alto);
			lienzo.beginFill(0x000000);
			lienzo.drawRect(0,alto-100,ancho,alto);
			lienzo.endFill();
			dado1t = true;
			dado2t = true;
			dado3t = true;
			dado4t = true;
			dado5t = true;
			
			messagetext  = game.add.text(5, 5, "hola", { fontSize: '20px', fill: '#000000' });
			
			
			somesa = game.add.audio("dadomesa");
			soagitar = game.add.audio("agitar");
			solanzarcu = game.add.audio("lanzarcu");
			solanzarcu.play();
			
			dado1v = game.add.sprite(0, posydadov, 'roja');
			dado2v = game.add.sprite(posxdadov, posydadov , 'jota');
			dado3v = game.add.sprite(2*posxdadov, posydadov , 'ka');
			dado4v = game.add.sprite(3*posxdadov, posydadov , 'negra');
			dado5v = game.add.sprite(4*posxdadov, posydadov , 'qu');
			cubilete = game.add.sprite(0, 10, 'cubilete'); 
			creo = game.add.sprite(ancho - 60, 100, 'creer');
			mentir = game.add.sprite(10, 100, 'mentiroso');
			envio = game.add.sprite(ancho - 60, 0, 'enviar');
			cubilete.visible = false;
			creo.visible = false;
			mentir.visible = false;
			
			
			dado1v.inputEnabled = true;
			dado2v.inputEnabled = true;
			dado3v.inputEnabled = true;
			dado4v.inputEnabled = true;
			dado5v.inputEnabled = true;
			envio.inputEnabled = true;
			creo.inputEnabled = false;
			mentir.inputEnabled = false;
			cubilete.inputEnabled = true;
			
			
			dado1v.input.enableDrag();
			dado2v.input.enableDrag();
			dado3v.input.enableDrag();
			dado4v.input.enableDrag();
			dado5v.input.enableDrag();
			
			dado1v.events.onDragStart.add(dragstar,this);
			dado1v.events.onDragStop.add(dragstop,this);
			dado1v.events.onDragUpdate.add(dragupdate,this);
			dado2v.events.onDragStart.add(dragstar,this);
			dado2v.events.onDragStop.add(dragstop,this);
			dado2v.events.onDragUpdate.add(dragupdate,this);
			dado3v.events.onDragStart.add(dragstar,this);
			dado3v.events.onDragStop.add(dragstop,this);
			dado3v.events.onDragUpdate.add(dragupdate,this);
			dado4v.events.onDragStart.add(dragstar,this);
			dado4v.events.onDragStop.add(dragstop,this);
			dado4v.events.onDragUpdate.add(dragupdate,this);
			dado5v.events.onDragStart.add(dragstar,this);
			dado5v.events.onDragStop.add(dragstop,this);
			dado5v.events.onDragUpdate.add(dragupdate,this);
			cubilete.events.onInputDown.add(ocultarCubilete,this);
			envio.events.onInputDown.add(enviarDados,this);	
			creo.events.onInputDown.add(creerJugada,this);
			mentir.events.onInputDown.add(mentirJugada,this);
		}

		function update(){
		}
		var estados = { preload: preload, create: create, update: update };
		var game = new Phaser.Game(ancho, alto, Phaser.CANVAS, 'phaser',estados);
		},
		
		vigilaSensores: function(){
			function onError() {
		        console.log('onError!'); 
			}
		    function onSuccess(datosAceleracion){
		        app.detectaAgitacion(datosAceleracion);
		      }

		      navigator.accelerometer.watchAcceleration(onSuccess, onError,{ frequency: 10 });
		    },

		    detectaAgitacion: function(datosAceleracion){
		      var agitacionX = datosAceleracion.x > 15;
		      

		      if (agitacionX){
		        setTimeout(app.recomienza(), 1000);
		      }
			},
		    
			recomienza: function(){
				
				cubilete.visible = true;
				soagitar.play();
				
				// Tirar dados
				
				// dado1 dentro del cubilete
				
			var cara;
			
if(dado1v.y == 100)
	{


	if(dado1t){
	dado1t = false;
	cara = Math.floor(Math.random() * 6);

			 if (cara == 0) {
				 dado1v.loadTexture("negra");
				 }
			 if (cara == 1) {
				 dado1v.loadTexture("roja");
			 }
			 if (cara == 2) {
				 dado1v.loadTexture("jota");	
			 }
			 if (cara == 3) {
				 dado1v.loadTexture("qu");	
			 }
			 if (cara == 4) {
				 dado1v.loadTexture("ka");
			 }
			 if (cara >= 5) {
				 dado1v.loadTexture("as");
			 }
			 
	}	
	}
//tirar dado 2 dentro del cubilete
if(dado2v.y == 100)
{
	if(dado2t){
	dado2t = false;
	cara = Math.floor(Math.random() * 6);
		 if (cara == 0) {
			 dado2v.loadTexture("negra");
			 }
		 if (cara == 1) {
			 dado2v.loadTexture("roja");
		 }
		 if (cara == 2) {
			 dado2v.loadTexture("jota");	
		 }
		 if (cara == 3) {
			 dado2v.loadTexture("qu");	
		 }
		 if (cara == 4) {
			 dado2v.loadTexture("ka");
		 }
		 if (cara >= 5) {
			 dado2v.loadTexture("as");
		 }
	}
}

//Tirar dado 3 dentro del cubilete

if(dado3v.y == 160)
{
	if(dado3t){
	dado3t = false;
	cara = Math.floor(Math.random() * 6);
		 if (cara == 0) {
			 dado3v.loadTexture("negra");
			 }
		 if (cara == 1) {
			 dado3v.loadTexture("roja");
		 }
		 if (cara == 2) {
			 dado3v.loadTexture("jota");	
		 }
		 if (cara == 3) {
			 dado3v.loadTexture("qu");	
		 }
		 if (cara == 4) {
			 dado3v.loadTexture("ka");
		 }
		 if (cara >= 5) {
			 dado3v.loadTexture("as");
		 }
	}
}
//Tirar dado 4 dentro del cubilete
if(dado4v.y == 160)
{
	if(dado4t){
	dado4t = false;
	cara = Math.floor(Math.random() * 6);
		 if (cara == 0) {
			 dado4v.loadTexture("negra");
			 }
		 if (cara == 1) {
			 dado4v.loadTexture("roja");
		 }
		 if (cara == 2) {
			 dado4v.loadTexture("jota");	
		 }
		 if (cara == 3) {
			 dado4v.loadTexture("qu");	
		 }
		 if (cara == 4) {
			 dado4v.loadTexture("ka");
		 }
		 if (cara >= 5) {
			 dado4v.loadTexture("as");
		 }
	}
}
//Tirar dado 5 dentro del cubilete
if(dado5v.y == 220)
{
	if(dado5t){
	dado5t = false;
	cara = Math.floor(Math.random() * 6);
		 if (cara == 0) {
			 dado5v.loadTexture("negra");
			 }
		 if (cara == 1) {
			 dado5v.loadTexture("roja");
		 }
		 if (cara == 2) {
			 dado5v.loadTexture("jota");	
		 }
		 if (cara == 3) {
			 dado5v.loadTexture("qu");	
		 }
		 if (cara == 4) {
			 dado5v.loadTexture("ka");
		 }
		 if (cara >= 5) {
			 dado5v.loadTexture("as");
		 }
	}
}
			  },
};
function dragstar(){
	
}
function dragstop(dado){
	//
	
	
	if(dado == dado1v)
	{
	if(dado.y < alto/2)
		{
	dado.x = 100;
	dado.y = 100;
		}
	else 
		{
		if(dado.y < alto - 100)
		{
			if(dado1t){
				dado1t = false;
		var cara1 = Math.floor(Math.random() * 6);
		somesa.play();
		 if (cara1 == 0) {
			 dado.loadTexture("negra");
			 }
		 if (cara1 == 1) {
			 dado.loadTexture("roja");
		 }
		 if (cara1 == 2) {
			 dado.loadTexture("jota");	
		 }
		 if (cara1 == 3) {
			 dado.loadTexture("qu");	
		 }
		 if (cara1 == 4) {
			 dado.loadTexture("ka");
		 }
		 if (cara1 >= 5) {
			 dado.loadTexture("as");
		 }
			}
		}
		dado.x = 0;
		dado.y = posydadov;
		}
	
	}
	
	if(dado == dado2v)
	{
	if(dado.y < alto/2)
		{
		dado.x = 160;
		dado.y = 100;
		}
	else
		{
		if(dado.y < alto - 100)
		{
			if(dado2t){
				dado2t = false;
		var cara1 = Math.floor(Math.random() * 6);
		somesa.play();
		 if (cara1 == 0) {
			 dado.loadTexture("negra");
			 }
		 if (cara1 == 1) {
			 dado.loadTexture("roja");
		 }
		 if (cara1 == 2) {
			 dado.loadTexture("jota");	
		 }
		 if (cara1 == 3) {
			 dado.loadTexture("qu");	
		 }
		 if (cara1 == 4) {
			 dado.loadTexture("ka");
		 }
		 if (cara1 >= 5) {
			 dado.loadTexture("as");
		 }
			}
		}
		dado.x = posxdadov;
		dado.y = posydadov;
		}
	
	}
	
	if(dado == dado3v)
	{
	if(dado.y < alto/2)
		{
		dado.x = 160;
		dado.y = 160;
		}
	else
		{
		if(dado.y < alto - 100)
		{
			if(dado3t){
				dado3t = false;
		var cara1 = Math.floor(Math.random() * 6);
		somesa.play();
		 if (cara1 == 0) {
			 dado.loadTexture("negra");
			 }
		 if (cara1 == 1) {
			 dado.loadTexture("roja");
		 }
		 if (cara1 == 2) {
			 dado.loadTexture("jota");	
		 }
		 if (cara1 == 3) {
			 dado.loadTexture("qu");	
		 }
		 if (cara1 == 4) {
			 dado.loadTexture("ka");
		 }
		 if (cara1 >= 5) {
			 dado.loadTexture("as");
		 }
			}
		}
		dado.x = 2*posxdadov;
		dado.y = posydadov;
		}
	
	}
	
	if(dado == dado4v)
	{
	if(dado.y < alto/2)
		{
		dado.x = 100;
		dado.y = 160;
		}
	else
		{
		if(dado.y < alto - 100)
		{
			if(dado4t){
				dado4t = false;
		var cara1 = Math.floor(Math.random() * 6);
		somesa.play();
		 if (cara1 == 0) {
			 dado.loadTexture("negra");
			 }
		 if (cara1 == 1) {
			 dado.loadTexture("roja");
		 }
		 if (cara1 == 2) {
			 dado.loadTexture("jota");	
		 }
		 if (cara1 == 3) {
			 dado.loadTexture("qu");	
		 }
		 if (cara1 == 4) {
			 dado.loadTexture("ka");
		 }
		 if (cara1 >= 5) {
			 dado.loadTexture("as");
		 }
			}
		}
		dado.x = 3*posxdadov;
		dado.y = posydadov;
		}
	
	}
	
	if(dado == dado5v)
	{
	if(dado.y < alto/2)
		{
		dado.x = 130;
		dado.y = 220;
		}
	else
		{
		if(dado.y < alto - 100)
		{
			if(dado5t){
				dado5t = false;
		var cara1 = Math.floor(Math.random() * 6);
		somesa.play();
		 if (cara1 == 0) {
			 dado.loadTexture("negra");
			 }
		 if (cara1 == 1) {
			 dado.loadTexture("roja");
		 }
		 if (cara1 == 2) {
			 dado.loadTexture("jota");	
		 }
		 if (cara1 == 3) {
			 dado.loadTexture("qu");	
		 }
		 if (cara1 == 4) {
			 dado.loadTexture("ka");
		 }
		 if (cara1 >= 5) {
			 dado.loadTexture("as");
		 }
			}
		}
		dado.x = 4*posxdadov;
		dado.y = posydadov;
		}
	
	}
	
};
function dragupdate(dado)
{
	if(dado.y < alto/2)
		{
		messagetext.text = "Dejar dado en el cubilete";
		}
	else
		{
		if(dado.y > alto -100)
			{
			messagetext.text = "Dejar sin tirar";
			}
		else {
			messagetext.text = "Tirar dado";
		}
		}
	
	}
 function ocultarCubilete()
 {
	 cubilete.visible = false;
	 
 };
function enviarDados(){
	cubilete.visible = true;
	cubilete.inputEnabled = false;
	creo.visible = true;
	mentir.visible = true;
	creo.inputEnabled = true;
	mentir.inputEnabled = true;
	envio.inputEnabled = false;
	envio.visible = false;
	messagetext.text = "Pasa el movil / Elige si te lo crees o no";
};
function creerJugada(){
	cubilete.visible = false;
	cubilete.inputEnabled = true;
	creo.visible = false;
	mentir.visible = false;
	creo.inputEnabled = false;
	mentir.inputEnabled = false;
	envio.inputEnabled = true;
	envio.visible = true;
	messagetext.text = "Me lo creo...";
	dado1t = true;
	dado2t = true;
	dado3t = true;
	dado4t = true;
	dado5t = true;
};
function mentirJugada(){
	cubilete.visible = false;
	cubilete.inputEnabled = true;
	creo.visible = false;
	mentir.visible = false;
	creo.inputEnabled = false;
	mentir.inputEnabled = false;
	envio.inputEnabled = true;
	envio.visible = true;
	messagetext.text = "MENTIROSO!!!!";
	dado1t = true;
	dado2t = true;
	dado3t = true;
	dado4t = true;
	dado5t = true;
};

if ('addEventListener' in document) {
    document.addEventListener('deviceready', function() {
    	
        app.inicio();
    }, false);
}


