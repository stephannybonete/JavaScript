<?php
//importação de arquivo produto.php
require_once "src/classes/produto.php";
//importação de arquivo Cliente.php
require_once "src/classes/Cliente.php";


//intancia de produto
$prod1 = new produto;
$prod1 -> titulo = "Gol";
$prod1 -> descricao = "1980";
$prod1 -> modelo = "G1";
$prod1-> motor = "1.3";
$prod1 -> potencia = "46 cv";
$prod1 -> transmissão = "Manual de 4 marchas";
$prod1 -> descricao1 = "O Renault Sandero 2007 marcou a chegada de um hatchback compacto e prático ao mercado brasileiro. Priorizando o espaço interno generoso e um porta-malas amplo para a sua categoria, o modelo oferecia robustez e manutenção acessível. Disponível inicialmente com motores 1.4L e 1.6L, o Sandero se posicionou como uma opção funcional, embora pudesse apresentar um acabamento mais simples e isolamento acústico limitado. Ideal para quem buscava um carro espaçoso e confiável com bom custo-benefício.";
$prod1 -> preco = 54.500;

$prod2 = new produto;
$prod2 = clone $prod2;
$prod2 -> preco = 54.500;

function alterarProduto($produto)
{
    $produto -> titulo = "Sandeiro";
    return $produto;
}
$prod3 = alter(clone $prod1);

var_dump($prod1);
var_dump($prod2);
var_dump($prod3);