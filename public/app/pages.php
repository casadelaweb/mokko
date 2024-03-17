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

// раздел информация
$info = new Page([
  'title' => 'Информация',
  'metaDescription' => 'Заполните описание мета',
  'metaKeywords' => 'Заполните ключевые поля мета',
  'url' => '/info',
  'view' => 'info/info',
  'parent' => $home,
]);
$infoAppointment = new Page([
  'title' => 'Записаться к стилисту',
  'metaDescription' => 'Заполните описание мета',
  'metaKeywords' => 'Заполните ключевые поля мета',
  'url' => '/info/appointment',
  'view' => 'info/appointment',
  'parent' => $info,
]);
$infoDelivery = new Page([
  'title' => 'Доставка',
  'metaDescription' => 'Заполните описание мета',
  'metaKeywords' => 'Заполните ключевые поля мета',
  'url' => '/info/delivery',
  'view' => 'info/delivery',
  'parent' => $info,
]);
$infoOferta = new Page([
  'title' => 'Договор-оферта',
  'metaDescription' => 'Заполните описание мета',
  'metaKeywords' => 'Заполните ключевые поля мета',
  'url' => '/info/oferta',
  'view' => 'info/oferta',
  'parent' => $info,
]);
$infoReviews = new Page([
  'title' => 'Отзывы',
  'metaDescription' => 'Заполните описание мета',
  'metaKeywords' => 'Заполните ключевые поля мета',
  'url' => '/info/reviews',
  'view' => 'info/reviews',
  'parent' => $info,
]);
$pages = [
  $home, $catalog, $product,
  $info, $infoAppointment, $infoDelivery, $infoOferta, $infoReviews,
];

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
