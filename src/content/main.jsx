import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import {Bookmarker} from '@/components/bookmarker.jsx'
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
    let allBookmarks = [];
    chrome.storage.local.get(["allBookmarks"]).then((result) => {
      if (result === undefined) {
        allBookmarks = [];
      } else {
        allBookmarks = result.allBookmarks;
      }
    });
      let bookmarkerList = [];
      allBookmarks.forEach((bookmark) => {
        bookmarkerList.push(<Bookmarker key={bookmark.xposition} xposition={bookmark.xposition} yposiiton={bookmark.yposition} location={bookmark.location}/>);
      }
      );
  }, []);
  return (
    <div>
      {bookmarkerList}
    </div>
  )
}


// createRoot(document.getElementsByTagName('body')[0]).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )