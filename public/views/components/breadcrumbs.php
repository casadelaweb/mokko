<?php namespace App;
global $page;
?>

<div class="breadcrumbs">
  <div class="breadcrumbs-container">
    <a class="breadcrumb" href="/">Главная</a>
    <a class="breadcrumb active" href="<?= $page->url ?>" title="<?= $page->title ?>">
      <?= $page->title ?>
    </a>
  </div>
</div>
