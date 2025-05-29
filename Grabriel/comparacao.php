<?php
//Importancia do arquivo Produto.php
require_once "src/Classes/Clientes.php";

//Instancia do produto
$prod1 = new Produto;
$prod1 -> titulo = "Gol";
$prod1 -> descricao = "Resumo para Descrição: Volkswagen Gol 1980";
"O Volkswagen Gol 1980 marcou o lançamento de um carro icônico no Brasil, projetado para substituir o Brasília e modernizar a linha da Volkswagen. Inicialmente com um design inovador e mecânica simples, destacou-se pela estabilidade e bons freios, apesar do motor 1.3L refrigerado a ar ser considerado subpotente. Este modelo pioneiro, disponível nas versões N e L, pavimentou o caminho para uma família de veículos de sucesso e se tornou um dos carros mais vendidos do país por muitos anos. O Gol 1980 representa o início de uma era para a Volkswagen no Brasil.";
$prod1 -> preco = 54.500;

$prod2 = new Produto;
$prod2 -> titulo = "Sandeiro";
$prod2 -> descricao = "O Renault Sandero 2007 marcou a chegada de um hatchback compacto e prático ao mercado brasileiro. Priorizando o espaço interno generoso e um porta-malas amplo para a sua categoria, o modelo oferecia robustez e manutenção acessível. Disponível inicialmente com motores 1.4L e 1.6L, o Sandero se posicionou como uma opção funcional, embora pudesse apresentar um acabamento mais simples e isolamento acústico limitado. Ideal para quem buscava um carro espaçoso e confiável com bom custo-benefício.";
$prod2 -> preco = 1.90;

var_dump($prod1 == $prod2); //tipo e propriedade !=
var_dump($prod1 == $prod2); //Referência !==

$prod3 = new Produto;
$prod3 -> titulo = "manutenção";
$prod3 -> descricao = "Faca a manutencão do seu carro com a gente";
$prod3 -> preco = "500.00";

var_dump($prod1 == $prod3); //(true)

$prod4 = $prod1;

var_dump($prod1 === $prod4); //(true)
echo "<br>";
var_dump($prod1);
echo "<br>";
var_dump($prod2);
echo "<br>";
var_dump($prod4);
