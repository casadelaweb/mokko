<?php namespace App;

// todo: вынести регистрацию страниц в отдельную middleware

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
  'url' => '/catalog/',
  'view' => 'catalog/catalog',
  'parent' => $home,
]);
$product = new Page([
  'title' => 'Товар',
  'metaDescription' => 'Заполните описание мета',
  'metaKeywords' => 'Заполните ключевые поля мета',
  'url' => '/catalog/product/',
  'view' => 'catalog/product',
  'parent' => $catalog,
]);

// раздел личный кабинет
$personal = new Page([
  'title' => 'Личный кабинет',
  'metaDescription' => 'Заполните описание мета',
  'metaKeywords' => 'Заполните ключевые поля мета',
  'url' => '/personal/',
  'view' => 'personal/personal',
  'parent' => $home,
]);
$personalCart = new Page([
  'title' => 'Корзина',
  'metaDescription' => 'Заполните описание мета',
  'metaKeywords' => 'Заполните ключевые поля мета',
  'url' => '/personal/cart/',
  'view' => 'personal/cart',
  'parent' => $personal,
]);

// раздел информация
$info = new Page([
  'title' => 'Информация',
  'metaDescription' => 'Заполните описание мета',
  'metaKeywords' => 'Заполните ключевые поля мета',
  'url' => '/info/',
  'view' => 'info/info',
  'parent' => $home,
]);
$infoAppointment = new Page([
  'title' => 'Записаться к стилисту',
  'metaDescription' => 'Заполните описание мета',
  'metaKeywords' => 'Заполните ключевые поля мета',
  'url' => '/info/appointment/',
  'view' => 'info/appointment',
  'parent' => $info,
]);
$infoDelivery = new Page([
  'title' => 'Доставка',
  'metaDescription' => 'Заполните описание мета',
  'metaKeywords' => 'Заполните ключевые поля мета',
  'url' => '/info/delivery/',
  'view' => 'info/delivery',
  'parent' => $info,
]);
$infoOferta = new Page([
  'title' => 'Договор-оферта',
  'metaDescription' => 'Заполните описание мета',
  'metaKeywords' => 'Заполните ключевые поля мета',
  'url' => '/info/oferta/',
  'view' => 'info/oferta',
  'parent' => $info,
]);
$infoPolicy = new Page([
  'title' => 'Политика конфиденциальности',
  'metaDescription' => 'Заполните описание мета',
  'metaKeywords' => 'Заполните ключевые поля мета',
  'url' => '/info/policy/',
  'view' => 'info/policy',
  'parent' => $info,
]);
$infoReturn = new Page([
  'title' => 'Возврат и обмен',
  'metaDescription' => 'Заполните описание мета',
  'metaKeywords' => 'Заполните ключевые поля мета',
  'url' => '/info/return/',
  'view' => 'info/return',
  'parent' => $info,
]);
$infoPayment = new Page([
  'title' => 'Оплата',
  'metaDescription' => 'Заполните описание мета',
  'metaKeywords' => 'Заполните ключевые поля мета',
  'url' => '/info/payment/',
  'view' => 'info/payment',
  'parent' => $info,
]);
$infoReviews = new Page([
  'title' => 'Отзывы',
  'metaDescription' => 'Заполните описание мета',
  'metaKeywords' => 'Заполните ключевые поля мета',
  'url' => '/info/reviews/',
  'view' => 'info/reviews',
  'parent' => $info,
]);
$infoSizeguide = new Page([
  'title' => 'Таблица размеров',
  'metaDescription' => 'Заполните описание мета',
  'metaKeywords' => 'Заполните ключевые поля мета',
  'url' => '/info/sizeguide/',
  'view' => 'info/sizeguide',
  'parent' => $info,
]);

$pages = [
  $home, $catalog, $product,
  $personal, $personalCart,
  //
  $info, $infoAppointment, $infoDelivery, $infoOferta, $infoPolicy,
  $infoPayment, $infoReturn, $infoReviews, $infoSizeguide,
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
