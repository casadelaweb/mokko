<?php namespace App; ?>

<div class="breadcrumbs">
  <div class="breadcrumbs-container">
    <a class="breadcrumb" href="/">Главная</a>
    <a class="breadcrumb active" href="<?= Router::current() ?>">
      <?= Router::current() ?>
    </a>
  </div>
</div>
