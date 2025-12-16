import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
let allBookmarks = [];
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

document.addEventListener("click", function (ev) {
  const values = { location: window.location.href, xposition: ev.clientX, yposiiton: ev.clientY };
  if (isBookMarkAddActive) {
    chrome.storage.local.set({ bookmark1: values });
  }
  else if (isBookMarkRemoveActive) {
    chrome.storage.local.remove("bookmark1");
  }
});


export default function App() {
  useEffect(() => {
    chrome.storage.local.get(["allBookmarks"]).then((result) => {
      if (result === undefined) {
        allBookmarks = [];
      } else {
        allBookmarks = result.allBookmarks;
      }
    });
  }, []);
  return (
    <div>
      <h1>Content Script Active</h1>
    </div>
  )
}


// createRoot(document.getElementsByTagName('body')[0]).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )