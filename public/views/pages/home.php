<?php namespace App; ?>

<?php Render::component('sections/hero') ?>
<section class="promo">
  <div class="promo-container">
    <div class="promo-main">
      <div class="promo-text">
        <h2 class="promo-title">
          <a href="/catalog">
            MOKKO — БРЕНД ОДЕЖДЫ, <br>
            СОЗДАННЫЙ СПЕЦИАЛЬНО <br>
            ДЛЯ ЖЕНЩИН
          </a>
        </h2>
        <div class="promo-description">
          Мы учитываем все особенности фигур наших
          покупательниц. Каждая модель адаптирована для всех
          размеров, вплоть до 54-го
        </div>
      </div>

      <a href="/catalog">
        <picture>
          <source media="(min-width: 1920px)" srcset="/assets/img/promo/promo-1920.jpg">
          <source media="(min-width: 1280px)" srcset="/assets/img/promo/promo-1280.jpg">
          <source media="(min-width: 1024px)" srcset="/assets/img/promo/promo-1024.jpg">
          <source media="(min-width: 768px)" srcset="/assets/img/promo/promo-768.jpg">
          <img alt="img" class="promo-img" loading="lazy"
               src="/assets/img/promo/promo-320.jpg">
        </picture>
      </a>
    </div>

    <div class="section-header">
      <h2 class="section-title">
        <span data-modal-open="stories">Истории</span>
      </h2>
      <div class="section-button">
        <button data-modal-open="stories" type="button">
          <span>Все</span>
          <span class="iconfont icon-arrow-right"></span>
        </button>
      </div>
    </div>
    <div class="swiper slider-small stories-slider">
      <div class="swiper-wrapper">
        <div class="swiper-slide">
          <article class="section-product" data-modal-open="stories">
            <div class="stories-slide-overlay">
              <img alt="img" loading="lazy" src="/assets/img/icons/play.png">
            </div>
            <img alt="img" class="section-product-img" loading="lazy"
                 src="/assets/img/stories/story-1.jpg">
            <div class="swiper-lazy-preloader"></div>
          </article>
        </div>
        <div class="swiper-slide">
          <article class="section-product" data-modal-open="stories">
            <div class="stories-slide-overlay">
              <h2 class="stories-slide-title">
                Волшебная <br>
                ночь
              </h2>
            </div>
            <img alt="img" class="section-product-img" loading="lazy"
                 src="/assets/img/stories/story-2.jpg">
            <div class="swiper-lazy-preloader"></div>
          </article>
        </div>
        <div class="swiper-slide">
          <article class="section-product" data-modal-open="stories">
            <div class="stories-slide-overlay">
              <img alt="img" loading="lazy" src="/assets/img/icons/play.png">
            </div>
            <img alt="img" class="section-product-img" loading="lazy"
                 src="/assets/img/stories/story-3.jpg">
            <div class="swiper-lazy-preloader"></div>
          </article>
        </div>
        <div class="swiper-slide">
          <article class="section-product" data-modal-open="stories">
            <div class="stories-slide-overlay">
              <h2 class="stories-slide-title">
                Волшебная <br>
                ночь
              </h2>
            </div>
            <img alt="img" class="section-product-img" loading="lazy"
                 src="/assets/img/stories/story-4.jpg">
            <div class="swiper-lazy-preloader"></div>
          </article>
        </div>
        <div class="swiper-slide">
          <article class="section-product" data-modal-open="stories">
            <div class="stories-slide-overlay">
              <h2 class="stories-slide-title">
                Элегантность <br>
                чёрного
              </h2>
            </div>
            <img alt="img" class="section-product-img" loading="lazy"
                 src="/assets/img/stories/story-5.jpg">
            <div class="swiper-lazy-preloader"></div>
          </article>
        </div>
        <div class="swiper-slide">
          <article class="section-product" data-modal-open="stories">
            <div class="stories-slide-overlay">
              <h2 class="stories-slide-title">
                Сияй!
              </h2>
            </div>
            <img alt="img" class="section-product-img" loading="lazy"
                 src="/assets/img/stories/story-6.jpg">
            <div class="swiper-lazy-preloader"></div>
          </article>
        </div>
      </div>
      <div class="swiper-button-prev">
        <span class="iconfont icon-arrow-left"></span>
      </div>
      <div class="swiper-button-next">
        <span class="iconfont icon-arrow-right"></span>
      </div>
    </div>
  </div>
</section>

<!-- todo: доделать модальное окно историй
<div class="modal stories" data-modal="stories">
  <button class="stories-slider-button-prev" data-stories="slider-button-prev" type="button">
    <span class="iconfont icon-arrow-left"></span>
  </button>
  <button class="stories-slider-button-next" data-stories="slider-button-next" type="button">
    <span class="iconfont icon-arrow-right"></span>
  </button>

  <button class="stories-volume" title="Выключить звук" type="button">
    <span class="iconfont icon-mute"></span>
  </button>
  <button class="modal-close stories-close" data-modal-close title="Закрыть окно" type="button">
    <span class="iconfont icon-close"></span>
  </button>

  <div class="modal-content stories-content">
    <div class="stories-slider-pagination" data-stories="slider-pagination"></div>
    <div class="swiper stories-slider" data-stories="slider">
      <div class="swiper-wrapper stories-slides">
        repeat 3 times:
        <div class="swiper-slide stories-slide">
          <picture>
            <source media="(min-width: 768px)" srcset="/assets/img/placeholder-product-3.jpeg" type="image/jpeg">
            <img alt="img" class="story-img" loading="lazy" src="/assets/img/placeholder-product-3.jpeg">
          </picture>
          <div class="swiper-lazy-preloader"></div>
        </div>
        <div class="swiper-slide stories-slide">
          <picture>
            <source media="(min-width: 768px)" srcset="/assets/img/placeholder-product-3.jpeg" type="image/jpeg">
            <img alt="img" class="story-img" loading="lazy" src="/assets/img/placeholder-product-3.jpeg">
          </picture>
          <div class="swiper-lazy-preloader"></div>
        </div>
        end;
      </div>
      <div class="autoplay-progress">
        <span></span>
      </div>
    </div>
  </div>
</div>
-->

<?php Render::component('catalog/banner', [
  'url' => '/catalog',
  'images' => [
    'image' => ['url' => '/assets/img/banners/banner-1-320.jpg',],
    'sources' => [
      [
        'media' => '(min-width: 1920px)',
        'url' => '/assets/img/banners/banner-1-1920.jpg',
      ],
      [
        'media' => '(min-width: 1280px)',
        'url' => '/assets/img/banners/banner-1-1280.jpg',
      ],
      [
        'media' => '(min-width: 1024px)',
        'url' => '/assets/img/banners/banner-1-1024.jpg',
      ],
      [
        'media' => '(min-width: 768px)',
        'url' => '/assets/img/banners/banner-1-768.jpg',
      ],
    ],
  ],
]) ?>
<?php Render::component('catalog/catalogSection') ?>
<?php Render::component('catalog/banner', [
  'url' => '/catalog',
  'images' => [
    'image' => ['url' => '/assets/img/banners/banner-2-320.jpg',],
    'sources' => [
      [
        'media' => '(min-width: 1920px)',
        'url' => '/assets/img/banners/banner-2-1920.jpg',
      ],
      [
        'media' => '(min-width: 1280px)',
        'url' => '/assets/img/banners/banner-2-1280.jpg',
      ],
      [
        'media' => '(min-width: 1024px)',
        'url' => '/assets/img/banners/banner-2-1024.jpg',
      ],
      [
        'media' => '(min-width: 768px)',
        'url' => '/assets/img/banners/banner-2-768.jpg',
      ],
    ],
  ],
]) ?>
<?php Render::component('catalog/catalogSection') ?>
<?php Render::component('catalog/banner', [
  'url' => '/catalog',
  'images' => [
    'image' => ['url' => '/assets/img/banners/banner-3-320.jpg',],
    'sources' => [
      [
        'media' => '(min-width: 1920px)',
        'url' => '/assets/img/banners/banner-3-1920.jpg',
      ],
      [
        'media' => '(min-width: 1280px)',
        'url' => '/assets/img/banners/banner-3-1280.jpg',
      ],
      [
        'media' => '(min-width: 1024px)',
        'url' => '/assets/img/banners/banner-3-1024.jpg',
      ],
      [
        'media' => '(min-width: 768px)',
        'url' => '/assets/img/banners/banner-3-768.jpg',
      ],
    ],
  ],
]) ?>

