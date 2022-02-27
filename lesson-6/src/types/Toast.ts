import {ToastType} from './ToastType.js';
import {ToastHandler} from './ToastHandler.js';

export class Toast {
  text: string
  type: ToastType
  actionName: string
  handler: ToastHandler
  constructor(text: string, type: ToastType, actionName?: string, handler?: ToastHandler) {
    this.text = text
    this.type = type
    this.actionName = actionName ?? ''
    if (handler) {
      this.handler = handler
    } else {
      this.handler = () => { return true}
    }
  }
}
