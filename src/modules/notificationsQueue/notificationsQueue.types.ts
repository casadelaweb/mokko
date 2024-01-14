export interface iOptions {
  maxShown?: number,
  duration?: number,
}

export interface iQueueItem {
  id: string | number,
  url: string,
  title: string,
  img: {
    url: string,
    alt?: string,
  },
  size?: string,
  colorClass?: string,
  isShown: boolean,
}

export interface iServerResponse extends Event {
  detail: {
    status: 'success' | 'error',
    successMessage?: string,
    errorMessage?: string,
    action: {
      type: 'add' | 'remove',
      destination: 'cart' | 'favourite',
    },
    product: {
      id: string | number,
      url: string,
      title: string,
      img: {
        url: string,
        alt?: string,
      },
      size?: string,
      colorClass?: string,
    },
  },
}