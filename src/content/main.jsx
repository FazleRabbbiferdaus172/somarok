import { createRoot } from 'react-dom/client'
import App from '@/content/views/App.jsx'

let operation = null;

async function onOperation(ev) {
      const location = window.location.href;
      const cords = { xposition: ev.pageX, yposition: ev.pageY };
      if (operation === 'add') {
        const current_somarok = await chrome.storage.local.get([location]);
        current_somarok[location] = current_somarok[location] || [];
        current_somarok[location].push(cords);
        await chrome.storage.local.set({ [location]: current_somarok[location] });
      }
    }


const messageListener = (message, sender, sendResponse) => {
  if (message.type === "SetAdd") {
    operation = 'add';
  }
  else if (message.type === "SetRemove") {
    operation = 'remove';
  }
}

chrome.runtime.onMessage.addListener(messageListener);

const container = document.createElement('div')
container.id = 'somarok-extension-container'
document.body.appendChild(container);
document.addEventListener("click", onOperation); 

createRoot(container).render(
  <App />
)