<?php namespace App;
$home = new Page([
  'title' => 'Главная',
  'metaDescription' => 'Заполните описание мета',
  'metaKeywords' => 'Заполните ключевые поля мета',
  'url' => '/',
  'view' => 'home',
  'parent' => null,
]);
$catalog = new Page([
  'title' => 'Каталог',
  'metaDescription' => 'Заполните описание мета',
  'metaKeywords' => 'Заполните ключевые поля мета',
  'url' => '/catalog',
  'view' => 'catalog/catalog',
  'parent' => $home,
]);
$product = new Page([
  'title' => 'Product',
  'metaDescription' => 'Заполните описание мета',
  'metaKeywords' => 'Заполните ключевые поля мета',
  'url' => '/catalog/product',
  'view' => 'catalog/product',
  'parent' => $catalog,
]);
$info = new Page([
  'title' => 'Информация',
  'metaDescription' => 'Заполните описание мета',
  'metaKeywords' => 'Заполните ключевые поля мета',
  'url' => '/info',
  'view' => 'info/info',
  'parent' => $home,
]);
$infoReviews = new Page([
  'title' => 'Отзывы',
  'metaDescription' => 'Заполните описание мета',
  'metaKeywords' => 'Заполните ключевые поля мета',
  'url' => '/info/reviews',
  'view' => 'info/reviews',
  'parent' => $home,
]);
$pages = [$home, $catalog, $product, $info, $infoReviews];

$pageNotFound = new Page([
  'title' => 'Страница не найдена',
  'metaDescription' => 'Заполните описание мета',
  'metaKeywords' => 'Заполните ключевые поля мета',
  'url' => null,
  'view' => '404',
  'parent' => $home,
]);
$page = $pageNotFound;
foreach ($pages as $p) {
  if (Router::$currentRoute == $p->url) {
    $page = $p;
  }
}
?>
