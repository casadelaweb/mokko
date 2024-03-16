<?php namespace App;

Router::register('', 'home');
Router::register('catalog', 'catalog');
Router::register('product', 'product');

$page = Router::enable();
