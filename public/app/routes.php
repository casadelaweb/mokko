<?php namespace App;

// регистрируем пути
Router::register('/', 'home');
// раздел каталог
Router::register('catalog', 'catalog/catalog');
Router::register('catalog/product', 'catalog/product');
// раздел информация
Router::register('info', 'info/info');
Router::register('info/shops', 'info/shops');
Router::register('info/reviews', 'info/reviews');
Router::register('info/appointment', 'info/appointment');

$page = Router::enable();
