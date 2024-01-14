<script lang="ts">
import {defineComponent} from 'vue'
import {iQueueItem, iServerResponse} from "src/modules/notificationsQueue/notificationsQueue.types";

export default defineComponent({
  name: "notificationsQueue.vue",
  data: function () {
    return {
      parameters: {
        duration: 2000 as number,
        selectors: {
          buttonFavourite: '.catalog-card-favourite' as string,
        },
      },
      queue: [] as iQueueItem[]
    }
  },
  mounted() {
    document.addEventListener('serverResponse', this.handleServerResponse, {passive: true,})
  },
  methods: {
    handleServerResponse(event: iServerResponse) {
      const selectors = this.parameters.selectors
      const duration: number = this.parameters.duration
      // console.log(event)

      const button = event.target as HTMLElement
      button.classList.remove('_loading')
      button.classList.remove('_disabled')
      const productId = event.detail.product.id


      if (event.detail.status === 'success') {
        if (event.detail.action.type === 'add') {
          button.classList.add('active')
        } else {
          button.classList.remove('active')
        }

        this.queue.push({
          ...event.detail.product,
          isShown: false
        })
        const item = this.getQueueItemById(productId)
        setTimeout(() => item.isShown = true, duration * 0.1)
        setTimeout(() => this.removeQueueItemById(productId), duration * 5)
      }
    },
    getQueueItemById(id: string | number): iQueueItem | undefined {
      return this.queue.find((item: iQueueItem) => item.id === id)
    },
    removeQueueItemById(id: string | number): void {
      const item = this.getQueueItemById(id)
      if (item) {
        item.isShown = false
        setTimeout(() => {
          this.queue = this.queue.filter((item: iQueueItem) => item.id !== id)
        }, this.parameters.duration)
      }
    },
    clearAll(event: MouseEvent): void {
      const target = event.target as HTMLElement
      const button: HTMLElement = target.closest('.nq-button')
      this.queue.forEach((item: iQueueItem) => item.isShown = false)
      button.classList.remove('_active')
      setTimeout(() => this.queue = [], this.parameters.duration * 0.25)
    }
  }
})
</script>

<template>
  <div class="nq">
    <article v-for="(item, index) in queue" :key="item.id" :class="item.isShown ? '_active': '' "
             :style="`transition-delay: 0.${index}s`" class="nq-item">
      <div class="nq-item-label">добавлено в избранное</div>
      <a :aria-label="item.title" :href="item.url" :title="item.title">
        <img :alt="item.title" :src="item.img.url" class="nq-item-img" loading="lazy">
      </a>
      <div class="nq-item-body">
        <h3 class="nq-item-title">
          <a :aria-label="item.title" :href="item.url" :title="item.title">
            {{ item.title }}
          </a>
        </h3>
        <div class="nq-item-size">{{ item.size }}</div>
        <div :class="item.colorClass" class="nq-item-color"></div>
      </div>
      <button aria-label="Скрыть уведомление" class="nq-item-close" title="Скрыть уведомление"
              type="button" @click="removeQueueItemById(item.id)">
        <span class="iconfont icon-close"></span>
      </button>
    </article>
    <button v-if="queue.length > 0" :class="queue.length > 0 ? '_active' : '' "
            :style="`transition-delay: 0.${queue.length}s`"
            aria-label="Скрыть все уведомления"
            class="nq-button" title="Скрыть все уведомления" v-on:click="clearAll">
      <span>скрыть все</span>
    </button>
  </div>
</template>

<style lang="scss" scoped>
@use 'src/styles/shared' as *;

.nq {
  $size: 13px;
  $sizeImg: 64px;
  $offsetX: 400px;
  $transitionDuration: 0.250s;

  position: fixed;
  z-index: 100;
  top: calc(var(--headerHeight) + 14px);
  right: calc(var(--scrollbarWidth) + 14px);
  font-size: $size;
  line-height: 1.1;
  color: #80756e;
  width: fit-content;
  @include mediaTablet {
    top: calc(var(--headerHeight) + 40px);
    right: calc(var(--scrollbarWidth) + 40px);
  }

  &-item {
    position: relative;
    z-index: 0;
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
    // transition: opacity $transitionDuration, transform $transitionDuration;
    transition: $transitionDuration;
    pointer-events: none;
    transform: translate($offsetX, 0);
    opacity: 0;
    width: 240px;
    @include mediaTablet {
      width: 320px;
    }
    //position: absolute;

    &._active {
      //position: relative;
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
      @include lineClamp(3);
      font-weight: 500;
      width: 100%;
      @include mediaTablet {
        @include lineClamp(2);
      }
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

    &-close {
      position: absolute;
      z-index: 1;
      top: $size * 0.5;
      right: $size * 0.5;
      color: #505050;
      font-size: $size;
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
    transition: opacity $transitionDuration, transform $transitionDuration;

    &._active {
      opacity: 1;
      pointer-events: auto;
      transform: none;
    }
  }
}
</style>