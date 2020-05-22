<?

if($_GET['tipo']=='cad')
{
	//Criamos uma função que recebe um texto como parâmetro.
	function gravar($texto)
	{
		//Variável arquivo armazena o nome e extensão do arquivo.
		$arquivo = "db/pesonagem".$_GET['p'].".txt";
		 
		//Variável $fp armazena a conexão com o arquivo e o tipo de ação.
		$fp = fopen($arquivo, "w");
	 
		//Escreve no arquivo aberto.
		fwrite($fp, $texto);
		 
		//Fecha o arquivo.
		fclose($fp);
	}
	 
	gravar($_GET['x1']."*".$_GET['z1']."*".$_GET['y1']."*".$_GET['r1']."*".$_GET['game1']."*".$_GET['vida']);
}
else
{
	function ler()
	{
		//Variável arquivo armazena o nome e extensão do arquivo.
		if($_GET['p']==1) $_GET['p'] = 2;
		else $_GET['p'] = 1;
		$arquivo = "db/pesonagem".$_GET['p'].".txt";
		 
		//Variável $fp armazena a conexão com o arquivo e o tipo de ação.
		$fp = fopen($arquivo, "r");
	 
		//Lê o conteúdo do arquivo aberto.
		$conteudo = fread($fp, filesize($arquivo));
		 
		//Fecha o arquivo.
		fclose($fp);
		 
		//retorna o conteúdo.
		return $conteudo;
}
 
echo ler();
}

?>