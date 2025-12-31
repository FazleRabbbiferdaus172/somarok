import { StrictMode, useEffect, useState } from 'react'
import Bookmarker from '@/components/bookmarker.jsx'
export default function App() {
  const [bookmarkerState, setbookmarkerList] = useState([]);
  const [somarokState, setSomarokState] = useState(0);

  function handleRemoveBookmark(xposition, yposiiton, location) {
    console.log("Removing bookmark at ", xposition, yposiiton, location);
  }

  useEffect(() => {
    const getDataFromStorage = async function () {
      let allBookmarks = [];
      let bookmarkerList = [];
      const storageKey = "bookmark1";
      const result = await chrome.storage.local.get([storageKey]);
      if (result[storageKey] === undefined) {
        allBookmarks = [];
      } else {
        allBookmarks.push(result[storageKey]);
      }
      allBookmarks.forEach((bookmark) => {
        // Todo: fix "yposiiton" typo issue later
        if (window.location.href === bookmark.location) { 
          bookmarkerList.push(<Bookmarker key={bookmark.xposition} xposition={bookmark.xposition} yposition={bookmark.yposiiton} location={bookmark.location} onRemove={handleRemoveBookmark}/>); 
        }
      }
      );
      setbookmarkerList(bookmarkerList)
    }
    getDataFromStorage(bookmarkerState);
  }, [somarokState]);

  useEffect(() => {
    const handleStorageChange = (changes, area) => {
      if (area === 'local' && changes.bookmark1) {
        // changes.bookmark1.newValue contains the data you just saved
        setSomarokState(prev => prev + 1);
      }
    };

    chrome.storage.onChanged.addListener(handleStorageChange);

    return () => {
      chrome.storage.onChanged.removeListener(handleStorageChange);
    };
  }, []);

  return (
    <div>
      {bookmarkerState.length !== 0 ? bookmarkerState : <></>}
    </div>
  )
}