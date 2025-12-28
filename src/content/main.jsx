import { createRoot, StrictMode } from 'react-dom/client'
import App from '@/content/views/App.jsx'

let operation = null;

const messageListener = (message, sender, sendResponse) => {
  if (message.type === "SetAdd") {
    operation = 'add';
    document.addEventListener("click", async function (ev) {
      const values = { location: window.location.href, xposition: ev.pageX, yposiiton: ev.pageY };
      if (operation === 'add') {
        chrome.storage.local.set({ bookmark1: values });
      }
    })
  }
  else if (message.type === "SetRemove") {
    operation = 'remove';
  }
}

chrome.runtime.onMessage.addListener(messageListener);

const container = document.createElement('div')
container.id = 'somarok-extension-container'
document.body.appendChild(container)

createRoot(container).render(
  <App />
)