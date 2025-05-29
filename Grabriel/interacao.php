<?php
//Importação de arquivo Produto.php
require_once "src/Classes/Produto.php";

//Instancia do Produto
$prod1 = new Produt;
$prod1 -> titulo = "Gol";
$prod1 -> descrição = "O Renault Sandero 2007 marcou a chegada de um hatchback compacto e prático ao mercado brasileiro. Priorizando o espaço interno generoso e um porta-malas amplo para a sua categoria, o modelo oferecia robustez e manutenção acessível. Disponível inicialmente com motores 1.4L e 1.6L, o Sandero se posicionou como uma opção funcional, embora pudesse apresentar um acabamento mais simples e isolamento acústico limitado. Ideal para quem buscava um carro espaçoso e confiável com bom custo-benefício";
$prod1 -> preco = 54.500;

foreach ($prod1 as $nome => $valor) {
    echo "$nome: $valor <br>";
}