<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  name: "notificationsQueue.vue",
  data: function () {
    return {
      queue: [
        {
          id: 'bsdun',
          title: 'Платье с длинным названием для тестирования',
          img: {
            url: '/assets/img/placeholder.jpg',
          },
          size: '44 / M',
          colorClass: '_yellow',
          isShown: true,
        },
        {
          id: '234523',
          title: 'Сапоги Гучи Дрючи',
          img: {
            url: '/assets/img/placeholder.jpg',
          },
          size: '38 / M',
          colorClass: '_color',
          isShown: true,
        },
      ]
    }
  },
  mounted() {
    // document.addEventListener('click', (event:MouseEvent) => {
    //   if (event.target.closest(''))
    // })
  },
  methods: {
    clearAll(event: MouseEvent) {
      const button: HTMLElement = event.target.closest('.notifications-queue-button')
      this.queue.forEach((item) => item.isShown = false)
      button.classList.remove('_active')
      setTimeout(() => this.queue = [], 1000)
    }
  }
})
</script>

<template>
  <div class="notifications-queue">
    <article v-for="(item, index) in queue" :key="item.id" :class="item.isShown ? '_active': '' "
             :style="`transition-delay: 0.${index}s`" class="notifications-queue-item">
      <div class="notifications-queue-item-label">добавлено в избранное</div>
      <img :alt="item.title" :src="item.img.url" class="notifications-queue-item-img"
           loading="lazy">
      <div class="notifications-queue-item-body">
        <h3 class="notifications-queue-item-title">{{ item.title }}</h3>
        <div class="notifications-queue-item-size">{{ item.size }}</div>
        <div :class="item.colorClass" class="notifications-queue-item-color"></div>
      </div>
    </article>
    <button v-if="queue.length > 0" :class="queue.length > 0 ? '_active' : '' "
            :style="`transition-delay: 0.${queue.length}s`" aria-label="скрыть все"
            class="notifications-queue-button" title="скрыть все" v-on:click="clearAll">
      <span>скрыть все</span>
    </button>
  </div>
</template>

<style lang="scss" scoped>
@use 'src/styles/shared' as *;

.notifications-queue {
  $size: 14px;
  $sizeImg: 64px;
  $offsetX: 400px;

  position: fixed;
  z-index: 10;
  top: calc(var(--headerHeight) + 40px);
  right: calc(var(--scrollbarWidth) + 40px);
  font-size: $size;
  line-height: 1.1;
  color: #80756e;

  &-item {
    padding: ($size * 0.5) $size;
    background: white;
    border: 2px solid #e9e9e9;
    border-radius: ($size * 0.5);
    box-shadow: ($size * 0.5) ($size * 0.5) $size 0 rgba(black, 0.1);
    margin-bottom: $size;
    display: flex;
    flex-wrap: wrap;
    column-gap: $size;
    row-gap: ($size * 0.5);
    width: 320px;
    transition: opacity 0.5s, transform 0.5s;
    pointer-events: none;
    transform: translate($offsetX, 0);
    opacity: 0;

    &._active {
      transform: none;
      opacity: 1;
      pointer-events: auto;
    }

    &-label {
      width: 100%;
      flex: 0 0 auto;
      color: #ada49e;
    }

    &-img {
      width: $sizeImg;
      height: $sizeImg;
      flex: 0 0 auto;
      object-fit: cover;
      object-position: center;
    }

    &-body {
      @include flex($w: wrap);
      column-gap: $size * 0.5;
      row-gap: $size * 0.5;
      flex: 0 0 auto;
      width: calc(100% - $sizeImg - $size);
    }

    &-title {
      @include lineClamp(2);
      font-weight: 500;
      width: 100%;
    }

    &-size {
      display: flex;
      align-items: center;
      justify-content: center;
      flex: 0 0 auto;
      background: #e9e9e9;
      width: $size * 4;
      height: $size * 2;
      border-radius: 4px;
    }

    &-color {
      flex: 0 0 auto;
      width: $size * 2;
      height: $size * 2;
      border-radius: 50%;
    }
  }

  &-button {
    background: white;
    border-radius: 6px;
    margin: 0 auto;
    font-size: 14px;
    width: fit-content;
    text-align: center;
    letter-spacing: 0.02em;
    padding: ($size * 0.5) $size;
    border: 2px solid #e9e9e9;
    box-shadow: ($size * 0.5) ($size * 0.5) $size 0 rgba(black, 0.1);
    opacity: 0;
    pointer-events: none;
    transform: translate($offsetX, 0);
    transition: opacity 0.5s, transform 0.5s;

    &._active {
      opacity: 1;
      pointer-events: auto;
      transform: none;
    }
  }
}
</style>