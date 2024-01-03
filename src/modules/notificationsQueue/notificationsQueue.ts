import { iQueueItem, iOptions } from './notificationsQueue.types'
import './notificationsQueue.scss'

class NotificationsQueue {
  static defaultOptions: iOptions = {
    maxShown: 3,
    duration: 1500,
  }
  private options: iOptions
  private queue: iQueueItem[]

  constructor(customOptions?: iOptions) {
    this.options = {
      ...NotificationsQueue.defaultOptions,
      ...customOptions,
    }
    this.queue = []
  }

  public add(item: iQueueItem) {
  }

  public remove(item: iQueueItem) {
  }

  private isInQueue(item: iQueueItem): boolean {
    return this.queue.includes(item)
  }
}

export const notificationsQueue = new NotificationsQueue()