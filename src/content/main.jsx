import { createRoot, StrictMode } from 'react-dom/client'
import App from '@/content/views/App.jsx'

var allBookmarks = [];
let operation = null;

const messageListener = (message, sender, sendResponse) => {
  if (message.type === "SetAdd") {
    operation = 'add';
    document.addEventListener("click", async function (ev) {
      const values = { location: window.location.href, xposition: ev.pageX, yposiiton: ev.pageY };
      if (operation === 'add') {
        // allBookmarks.push(values);
        chrome.storage.local.set({ bookmark1: values });
        operation = null;
      }
    })
  }
  else if (message.type === "SetRemove") {
    operation = 'remove';
  }
}
chrome.runtime.onMessage.addListener(messageListener);

chrome.storage.local.get(["bookmark1"]).then((result) => {
  console.log("Value is " + JSON.stringify(result.bookmark1));
});

chrome.storage.local.get(["allBookmarks"]).then((result) => {
  if (result === undefined) {
    allBookmarks = [];
  } else {
    allBookmarks = result.allBookmarks;
  }
});

let isBookMarkAddActive = false;
let isBookMarkRemoveActive = false;

// document.addEventListener("click", function (ev) {
//   const values = { location: window.location.href, xposition: ev.clientX, yposiiton: ev.clientY };
//   if (isBookMarkAddActive) {
//     chrome.storage.local.set({ bookmark1: values });
//   }
//   else if (isBookMarkRemoveActive) {
//     chrome.storage.local.remove("bookmark1");
//   }
// });

const container = document.createElement('div')
container.id = 'somarok-extension-container'
document.body.appendChild(container)

createRoot(container).render(
  <App />
)