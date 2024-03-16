<?php namespace App;
/** @var string $page */
require_once "app/helpers.php";
require_once "app/Router.php";
require_once "app/routes.php";
require_once "app/Render.php";
?>
<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport"
        content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
  <link rel="stylesheet" href="<?= getFilePathWithHash('/assets/css/main.css'); ?>">
</head>
<body>
<?php Render::component('header') ?>

<?php Render::page($page) ?>

<?php Render::component('footer') ?>
<script src="<?= getFilePathWithHash('/assets/js/main.js'); ?>"></script>
</body>
</html>
