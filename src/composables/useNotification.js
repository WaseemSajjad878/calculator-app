import { Notify } from 'quasar'

let optionsObj

export const useNotification = (options) => {
  const notifyHtml = `
     <h6 class='font-16 ${options.titleClass || 'text-active'} q-mt-none q-mb-xs'> ${
       options.title || 'Title here'
     } </h6>
     <p class='q-my-none'> ${options.message || ''}</p>
`
  optionsObj = {
    type: options.type || 'my-notif',
    message: notifyHtml,
    html: options.html || true,
    color: options.color || 'positive',
    timeout: options.timeout || 1000,
    icon: options.icon || 'done_all',
    iconSize: options.iconSize || '30px',
    iconColor: options.iconColor || 'positive',
    textColor: options.textColor || 'black',
    position: options.position || 'top-right',
    classes: `custom-notify border-l-8-positive ${options.classes} q-py-md q-mr-xl`,
    actions: [{ icon: 'close', color: options.closeColoe || 'black', round: true, handler: options.onClose }],
  }
  Notify.create({
    ...optionsObj
  })
}

export const errorNotify = (title, message)=> {
  useNotification({
    title: title,
    color: 'red-2',
    iconColor: 'negative',
    message: message,
    timeout: 1500,
    icon: 'warning',
    classes: 'border-l-8-negative'
  })
}

export const successNotify = (title, message) => {
  useNotification({
    title: title,
    color: 'green-2',
    iconColor: 'positive',
    message: message,
  })
}