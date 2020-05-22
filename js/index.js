// JavaScript Document

		let x1 = '';
		let z1 = '';
		let r1 = '';
		let game1 = '';
		let velo = 0.03;
		let veloTiro = 0.4;
		let eventPageX = 0;
		let eventPageY = 0;
		let windowWidth = window.innerWidth;
		let windowHeight = window.innerHeight;
		let anlgo;
		let anlgoTiro = [];
		let canvas, rayCaster,  mousePosition, canvasPosition, originPoint;
		let tiro = [];
		let personagem = [];
		let personagemSangue = [];
		let collidableMeshList = [];
		let ponto = 1;
		let pontoAtual;
		let morteAtual;
		let vidaAtual;
		let vida;
		let pulando = false;
		let gravidade = 0.005;
		let liberado = 1;
		let acertou = 1;
		

		
		(function() {
    document.onmousemove = handleMouseMove;
    function handleMouseMove(event) {
	
		
        var eventDoc, doc, body;

        event = event || window.event; // IE-ism

        // If pageX/Y aren't available and clientX/Y are,
        // calculate pageX/Y - logic taken from jQuery.
        // (This is to support old IE)
        if (event.pageX == null && event.clientX != null) {
            eventDoc = (event.target && event.target.ownerDocument) || document;
            doc = eventDoc.documentElement;
            body = eventDoc.body;

            event.pageX = event.clientX +
              (doc && doc.scrollLeft || body && body.scrollLeft || 0) -
              (doc && doc.clientLeft || body && body.clientLeft || 0);
            event.pageY = event.clientY +
              (doc && doc.scrollTop  || body && body.scrollTop  || 0) -
              (doc && doc.clientTop  || body && body.clientTop  || 0 );
        }

         eventPageX -= event.movementX*0.2;
		 eventPageY -= event.movementY*0.2;
    }
})();
		

		
			let keydown = [];
			var scene = new THREE.Scene();
			scene.background = new THREE.Color(0xe0f4ff);
			var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
		
			var renderer = new THREE.WebGLRenderer( {antialias:true} );
			canvas = renderer.domElement;
			 canvasPosition = $(canvas).position();
			renderer.setSize( window.innerWidth, window.innerHeight );
			document.body.appendChild( renderer.domElement );
			rayCaster = new THREE.Raycaster();
    		mousePosition = new THREE.Vector2();


			//var arrayChave = tiro.length;
			var geometry = new THREE.BoxGeometry( 1, 1, 1);
			var material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
			personagem[1] = new THREE.Mesh( geometry, material );
			personagem[1].rotation.y = 1;
			personagem[1].position.z = Math.floor(Math.random() * 10);
			personagem[1].position.x = Math.floor(Math.random() * 10);
			//var worldAxis = new THREE.AxesHelper(20);
			//personagem[1].add(worldAxis);
			scene.add(personagem[1]);
			

			//var arrayChave = tiro.length;
			var geometry = new THREE.BoxGeometry( 1.05, 1.05, 1.05);
			var material = new THREE.MeshBasicMaterial( {color: 0x8e0000} );
			personagemSangue[1] = new THREE.Mesh( geometry, material );
			personagemSangue[1].rotation.y = 1;
			personagemSangue[1].position.z = Math.floor(Math.random() * 10);
			personagemSangue[1].position.x = Math.floor(Math.random() * 10);
			personagemSangue[1].position.y = -1.05;
			scene.add(personagemSangue[1]);
			
			
			
			var pisoTexture = new THREE.ImageUtils.loadTexture( 'pisoTextura.jpg' );
			pisoTexture.wrapS = pisoTexture.wrapT = THREE.RepeatWrapping; 
			pisoTexture.repeat.set( 20, 20 );
			var pisoMaterial = new THREE.MeshBasicMaterial( { map: pisoTexture, side: THREE.DoubleSide } );
			var pisoGeometry = new THREE.PlaneGeometry(20, 20, 20, 20);
   			piso = new THREE.Mesh(pisoGeometry, pisoMaterial);
			piso.position.x = 2;
			piso.position.y = -0.5;
			piso.position.z = 3;
			piso.rotation.x  = -90 * Math.PI / 180;
			scene.add( piso );
			
			
			// obstaculos
			//var posix = ['1', '1','8','-3','6','5','2','4','6','-2','-5','3','3','1','2','3','5', '-3','4','3','-5','6','7','2','2','3','-3','2','-2','-3','2','2'];
			//var posiy = ['1', '-3','4','3','-5','6','7','2','2','3','-3','2','-2','3','2','2','2', '5','8','-3','-3','5','2','4','6','-2','-5','3','3','1','2','3'];
			let posi = [[1,1,0,1,0,1,0,1,0,1,0,0,1,0,0,1,0,1,0],
							 [0,1,0,1,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0],
							 [0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,1,0,0],	
							 [0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,1,0,0,0],
							 [0,0,0,0,0,1,0,0,0,0,1,0,0,0,0,0,0,1,0],
							 [0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0],	
							 [0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,1,0,0],
							 [0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0],
							 [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1],	
							 [0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0],
							 [0,0,1,0,0,0,0,1,1,0,0,1,1,0,0,0,0,0,0],
							 [0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0],	
							 [0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0],
							 [0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0],
							 [0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0],
							 [0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0],
							 [0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,1,0],
							 [0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0],
							 [0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1]];
		 for (i=0; i < posi.length; i++)
		 {
			var iN = posi[i];
			for (t = 0; t < iN.length; t++)
			{				 
			//var posix = [-7,-7,-7,-6,-6,-6,-5,-5,-5,-4,-4,-4,-3,-3,-3,-2,-2,-2,-1,-1,-1,0,0,0,1,1,1,2,2,2,3,3,3,4,4,4,5,5,5,6,6,6,7,7,7];
			//var posiy = [7,6,5,4,3,2,1,0,-1,-2,-3,-4,-5,-6,-7,-6,-5,-4,-3,-2,-1,0,1,2,3,4,5,6,7,8,9,10,4,6,7,4,3,2,1,2,4,5,3,2,2];
			//for(i = 0 ; i <= posix.length ; i++)
			//{
				if(posi[i][t]==1)
				{
					var texture = new THREE.TextureLoader().load( 'img/caixa.jpg' );
					var geometry = new THREE.BoxBufferGeometry( 1,1,1);
					var material = new THREE.MeshBasicMaterial( { map: texture, transparent: true, overdraw: true } );
					pedra = new THREE.Mesh( geometry, material );
					scene.add(pedra);
					pedra.position.x = i-7;
					pedra.position.y = 0;
					pedra.position.z = t-6;
				}
			}
		}
			//}
			var audio1 = new Audio('som/passos.mp3');
			audio1.loop = true;
			audio1.playbackRate = 2;
			
			var audio2 = new Audio('som/Eyes_of_Glory.mp3');
			audio2.loop = true;
		
			
			window.onkeydown = function(e)
			{
  				keydown[e.key] = true;
				audio2.play();
			}
			window.onkeyup = function(e)
			{
  				keydown[e.key] = false;
				audio1.pause();
			}
			//camera.rotation.y = 1.5;
			
			
		
			
			
			var animate = function () 
			{
		
			
		
			//if(keydown["p"] || keydown["w"]) video.play();
				//eventPageX = eventPageX*-1;
				anlgo = ((eventPageX-windowWidth/2)* Math.PI / 180)
				
				requestAnimationFrame( animate );

				//cube.rotation.x += 0.01;
				//cube.rotation.y += 0.01;
				if(tiro.length)
				{
					for(i=0 ; i<tiro.length ; i++)
					{
						//console.log(i);
						if(tiro[i].position.z >= 200 || tiro[i].position.x>= 200 || tiro[i].position.z<= -200 || tiro[i].position.x <= -200)
						{ 
							tiro = tiro.splice(i);
							anlgoTiro = anlgoTiro.splice(i);
						}
						else
						{
							tiro[i].position.z -= veloTiro*Math.cos(anlgoTiro[i]);
							tiro[i].position.x -= veloTiro*Math.sin(anlgoTiro[i]);
					
							
							
							// colisão
							if(tiro[i].position.x<=parseFloat(personagem[1].position.x)+parseFloat(0.5) && tiro[i].position.x>=parseFloat(personagem[1].position.x)-parseFloat(0.5) && 
							tiro[i].position.y<=parseFloat(personagem[1].position.y)+parseFloat(0.5) && tiro[i].position.y>=parseFloat(personagem[1].position.y)-parseFloat(0.5) &&
								tiro[i].position.z<=parseFloat(personagem[1].position.z)+parseFloat(0.5) && tiro[i].position.z>=parseFloat(personagem[1].position.z)-parseFloat(0.5))
								{ 
							
									if(ponto==1)
									{
										if(acertou)
										{ 
											personagemSangue[1].position.y = personagemSangue[1].position.y+0.25;
											acertou = 0;
											setTimeout(function(){ acertou = 1},500);
										}
										document.getElementById('vida2').value = parseFloat(document.getElementById('vida2').value)-parseFloat(20);
										if(document.getElementById('vida2').value<=0)
										{
											$('#alertAviso').css('display','block');
											$('#alertAviso').html("<h1><span class='aviso'>Você ganhou o round!</span><div id='segundos' style='font-size:40px;'>5</div></h1>");
											setTimeout(function(){avisoSome(5)},1000);
											audio1.pause();
											document.getElementById('vida2').value = 100;
											personagemSangue[1].position.y = -1.05;
											document.getElementById('game1').value = parseFloat(document.getElementById('game1').value)+parseFloat(1);
										}
										ponto = 0;
										
									}
									setTimeout(function(){ ponto = 1; },1000)
								}
							
							//console.log(tiro);
						}
						
					}
				}
				
				
				
				if(keydown["ArrowUp"] || keydown["w"])
				{ 
					if(camera.position.z-velo*Math.cos(anlgo)>=-7 && camera.position.z-velo*Math.cos(anlgo)<=13)
					{
						camera.position.z -= velo*Math.cos(anlgo);
					}
					//carro.position.z -= 0.02*Math.cos(anlgo);
					if(camera.position.x-velo*Math.sin(anlgo)>=-8 && camera.position.x-velo*Math.sin(anlgo)<=12)
					{ 
						camera.position.x -= velo*Math.sin(anlgo);
					}
					//carro.position.x -= 0.02*Math.sin(anlgo)
						audio1.play();
				}
				if(keydown["ArrowDown"] || keydown["s"])
				{
					if(camera.position.z+velo*Math.cos(anlgo)>=-7 && camera.position.z+velo*Math.cos(anlgo)<=13)
					{
						camera.position.z += velo*Math.cos(anlgo);
					}
					//carro.position.z += 0.02*Math.cos(anlgo);
					if(camera.position.x+velo*Math.sin(anlgo)>=-8 && camera.position.x+velo*Math.sin(anlgo)<=12)
					{
						camera.position.x += velo*Math.sin(anlgo);
					}
					//carro.position.x += 0.02*Math.sin(anlgo)
					audio1.play();
				}
				if(keydown["ArrowRight"] || keydown["d"])
				{ 
					if(camera.position.z-velo*Math.cos(anlgo - 90*Math.PI / 180)>=-7 && camera.position.z-velo*Math.cos(anlgo - 90*Math.PI / 180)<=13)
					{ 
						camera.position.z -= velo*Math.cos(anlgo - 90*Math.PI / 180);
					}
					//carro.position.x -= 0.02*Math.sin(anlgo)
					if(camera.position.x-velo*Math.sin(anlgo - 90*Math.PI / 180)>=-8 && camera.position.x-velo*Math.sin(anlgo - 90*Math.PI / 180)<=12)
					{ 
						camera.position.x -= velo*Math.sin(anlgo - 90*Math.PI / 180);
					}
					audio1.play();
				}
				if(keydown["ArrowLeft"] || keydown["a"])
				{
					if(camera.position.z+velo*Math.cos(anlgo - 90*Math.PI / 180)>=-7 && camera.position.z+velo*Math.cos(anlgo - 90*Math.PI / 180)<=13)
					{
						camera.position.z += velo*Math.cos(anlgo - 90*Math.PI / 180);
					}
					//carro.position.x -= 0.02*Math.sin(anlgo)
					if(camera.position.x+velo*Math.sin(anlgo - 90*Math.PI / 180)>=-8 && camera.position.x+velo*Math.sin(anlgo - 90*Math.PI / 180)<=12)
					{ 
						camera.position.x += velo*Math.sin(anlgo - 90*Math.PI / 180);
					}
					audio1.play();
				}
				if(keydown[" "] )
				{
					if(pulando == false)
					{
						pulando = 0.1;
					}
				}
				
				
				if(pulando)
				{
					camera.position.y += pulando;
					if(camera.position.y>=0)	pulando -= gravidade;
					else pulando = false;

				}
				
				if(eventPageX!='undefined') camera.rotation.y = (eventPageX-windowWidth/2) * Math.PI / 180;	
				
				if(morteAtual!=document.getElementById('game2').value)
				{
					if(morteAtual>=1)
					{
						$('#alertAviso').css('display','block');
						$('#alertAviso').html("<h1><span class='aviso'>Você perdeu o round!</span><div id='segundos' style='font-size:40px;'>5</div></h1>");
						setTimeout(function(){avisoSome(5)},1000);
						audio1.pause();
						camera.position.x = Math.floor(Math.random() * 10);
						camera.position.z = Math.floor(Math.random() * 10);
					}
					morteAtual=document.getElementById('game2').value;
				}
				
				if(vidaAtual!=document.getElementById('vida2').value)
				{	
					vidaAtual=document.getElementById('vida2').value;
				}
				
				if(pontoAtual!=document.getElementById('game1').value)
				{
					personagem[1].rotation.y = 0;
					personagem[1].position.x = Math.floor(Math.random() * 10);
					personagem[1].position.z = Math.floor(Math.random() * 10);
					setTimeout(function(){ pontoAtual = document.getElementById('game1').value; }, 2000);
				}
				else
				{
					if(r1.length>4) personagem[1].rotation.y = r1
					if(x1.length>4) personagem[1].position.x = x1;
					if(z1.length>4) personagem[1].position.z = z1;
					if(y1.length>4) personagem[1].position.y = y1;
				}
				document.getElementById('z2').value = z1;
				document.getElementById('x2').value = x1;
				document.getElementById('y2').value = y1;				
				document.getElementById('r2').value =  r1;
				document.getElementById('game2').value = game1;
				if(document.getElementById('vida').value != vida)
				{
					document.getElementById('hit').style.display = 'block';
					setTimeout(function(){ document.getElementById('hit').style.display = 'none'; },200);
					document.getElementById('vida').value = vida;
				}
				
				document.getElementById('z1').value = camera.position.z;
				document.getElementById('x1').value = camera.position.x;
				document.getElementById('y1').value = camera.position.y;				
				document.getElementById('r1').value = camera.rotation.y;
				
				personagemSangue[1].rotation.y = personagem[1].rotation.y;
				personagemSangue[1].position.x = personagem[1].position.x;
				personagemSangue[1].position.z = personagem[1].position.z;

				renderer.render( scene, camera );
			};
			
			function tiroVai()
			{
				if(liberado && $('#alertAviso').css('display')=='none')
				{
					liberado = 0;
					var audio = new Audio('som/Big_Gun_01.mp3');
					audio.play();	
					var arrayChave = tiro.length;
					var geometry = new THREE.BoxGeometry( 0.02, 0.02, 0.1);
					var material = new THREE.MeshBasicMaterial( {color: 0xffef7b} );
					tiro[arrayChave] = new THREE.Mesh( geometry, material );
					tiro[arrayChave].rotation.y = camera.rotation.y;
					tiro[arrayChave].position.y = camera.position.y;
					tiro[arrayChave].position.z = camera.position.z;
					tiro[arrayChave].position.x = camera.position.x;
					anlgoTiro[arrayChave] = anlgo;
					scene.add( tiro[arrayChave] );
					originPoint = tiro[arrayChave].position.clone();
					$("#armaImg").attr("src","img/desert2.png");
					setTimeout(function(){ liberaTiro()},500);
					$( ".arma" ).animate({
					bottom: "-10px" }, 200, function() {
    					$( ".arma" ).animate({
						bottom: "-30px" }, 200, function() {
    					// Animation complete.
						$("#armaImg").attr("src","img/desert1.png");
 						 });
 					 });
				}
			}
			function liberaTiro()
			{
				liberado = 1;	
			}
			animate();
			
			function avisoSome(num)
			{
				num--;
				if(num==0)
				{
					$('#alertAviso').css('display','none');	
				}
				else
				{
					$('#segundos').html(num);
					setTimeout(function(){avisoSome(num)},1000);
				}
			}
			
			document.addEventListener("click", function(){ tiroVai()});