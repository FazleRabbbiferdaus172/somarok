import { createRoot, StrictMode } from 'react-dom/client'
import App from '@/content/views/App.jsx'

let operation = null;

const messageListener = (message, sender, sendResponse) => {
  if (message.type === "SetAdd") {
    operation = 'add';
    document.addEventListener("click", async function (ev) {
      const location = window.location.href;
      const cords = { xposition: ev.pageX, yposiiton: ev.pageY };
      const values = { location: location, xposition: ev.pageX, yposiiton: ev.pageY };
      if (operation === 'add') {
        await chrome.storage.local.set({ bookmark1: values });
        const current_somarok = await chrome.storage.local.get([location]);
        current_somarok[location] = current_somarok[location] || [];
        current_somarok[location].push(cords);
        await chrome.storage.local.set({ [location]: current_somarok[location] });
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