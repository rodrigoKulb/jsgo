<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title>Jogo em primeira pessoa three js - Rodrigo Kulb</title>
		<link rel="stylesheet" type="text/css" href="css/style.css">
	</head>
	<body>
			<div id="alertAviso"></div>
			<div class="hit" id="hit"></div>
			<div id="instructions2"></div>
			<div id="github" onClick="location = 'https://github.com/rodrigoKulb';"></div>
	<div id="instructions">
	<img src="img/images.jpg" width="100%" border="0" >
	</div>
		<input type="hidden" id="x1" value="">
		<input type="hidden" id="z1" value="">		
		<input type="hidden" id="y1" value="">				
		<input type="hidden" id="r1" value=""> 
		<div class="placarEsquerdo">VITÓRIAS<br><input type="text"  id="game1" class="placar" value="0"> </div>
		<input type="hidden" id="x2" value="">
		<input type="hidden" id="z2" value="">		
		<input type="hidden" id="y2" value="">	
		<input type="hidden" id="r2" value=""> 
		<div class="placarDireito">DERROTAS<br><input type="text"  id="game2" class="placar" value="0"> </div>
		<div class="placarVida">+ <input type="text"  id="vida" class="placar1" value="100"> <input type="text"  id="vida2" class="placar2" value="100"></div>
	

		
		<script src="js/three.js"></script>
		<script src="js/bloqueia-mouse.js"></script>
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
		<script src="js/index.js"></script>
		<script>
		function atualizaUser() 
		{
  			var xhttp = new XMLHttpRequest();
			 xhttp.onreadystatechange = function() 
			 {
				if(this.readyState == 4 && this.status == 200) 
				{
				 	//document.getElementById("demo").innerHTML = this.responseText;
					setTimeout(function(){  atualizaUser()  },60);
				}
			 };
			  xhttp.open("GET", "ajaxPosit.php?tipo=cad&p=<?= $_GET['p'];?>&x1="+document.getElementById('x1').value+"&z1="+document.getElementById('z1').value+"&y1="+document.getElementById('y1').value+"&r1="+document.getElementById('r1').value+"&game1="+document.getElementById('game1').value+'&vida='+document.getElementById('vida2').value, true);
			  xhttp.send();
		}
		
		atualizaUser();
		
		function pegarUser() 
		{
  			var xhttp2 = new XMLHttpRequest();
			 xhttp2.onreadystatechange = function() 
			 {
				if(this.readyState == 4 && this.status == 200) 
				{
				 	retorno = this.responseText;
					retorno = retorno.split("*");
					x1 = retorno[0];
					z1 = retorno[1];
					y1 = retorno[2];
					r1 = retorno[3];
					game1 = retorno[4];
					vida = retorno[5];
					
					setTimeout(function(){  pegarUser()  },60);		
				}
			 };
			  xhttp2.open("GET", "ajaxPosit.php?tipo=pega&p=<?= $_GET['p'];?>&x1="+document.getElementById('x1').value+"&z1="+document.getElementById('z1').value+"&y1="+document.getElementById('y1').value+"&r1="+document.getElementById('r1').value+"&game1="+document.getElementById('game1').value+'&vida='+document.getElementById('vida2').value, true);
			  xhttp2.send();
		}
		 pegarUser();
		</script>
		<div class="mira">+</div>

		<div class="arma"><img id="armaImg" style="width:100%;" src="img/desert1.png"></div>
	</body>
 </html>