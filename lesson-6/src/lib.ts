import {Toast} from './types/Toast.js';

export function renderBlock (elementId: string, html: string) {
  const element = document.getElementById(elementId) as HTMLElement
  if (element) {
    element.innerHTML = html
  }
}

export function renderToast (toast: Toast) {
  let messageText = ''
  
  if (toast.text !== '') {
    messageText = `
      <div id="info-block" class="info-block ${toast.type}">
        <p>${toast.text}</p>
        <button id="toast-main-action">${toast?.actionName || 'Закрыть'}</button>
      </div>
    `
  }
  
  renderBlock(
    'toast-block',
    messageText
  )

  const button = document.getElementById('toast-main-action')
  if (button != null) {
    button.onclick = function() {
      toast.handler()
      const nullToastBlock = new Toast('', 'success')
      renderToast(nullToastBlock)
    }
  }
}
