import { StrictMode, useEffect, useState } from 'react';
import Bookmarker from '@/components/bookmarker.jsx';

export default function App() {
  const [bookmarkerState, setbookmarkerList] = useState([]);
  const [somarokState, setSomarokState] = useState(0);

  async function handleRemoveBookmark(xposition, yposiiton, location) {
    console.log("Removing bookmark at ", xposition, yposiiton, location);
    const storageKey_location = location || window.location.href;
    const location_somarok = await chrome.storage.local.get([storageKey_location]);
    const allBookmarks = location_somarok[storageKey_location].filter(bookmark => !(bookmark.xposition === xposition && bookmark.yposiiton === yposiiton));
    await chrome.storage.local.set({[storageKey_location]: allBookmarks });
  }

  useEffect(() => {
    const getDataFromStorage = async function () {
      let allBookmarks = [];
      let bookmarkerList = [];
      const storageKey = "bookmark1";
      const result = await chrome.storage.local.get([storageKey]);
      const storageKey_location = window.location.href;
      const location_somarok = await chrome.storage.local.get([storageKey_location]);
      console.log("Location somarok: ", location_somarok);
      if (location_somarok[storageKey_location] === undefined) {
        allBookmarks = [];
      } else {
        allBookmarks = location_somarok[storageKey_location];
      }
      allBookmarks.forEach((bookmark) => {
        // Todo: fix "yposiiton" typo issue later
        // if (window.location.href === bookmark.location) {
        bookmarkerList.push(<Bookmarker key={bookmark.xposition} xposition={bookmark.xposition} yposition={bookmark.yposiiton} location={storageKey_location} onRemove={handleRemoveBookmark} />);
        // }
      }
      );
      setbookmarkerList(bookmarkerList)
    }
    getDataFromStorage(bookmarkerState);
  }, [somarokState]);

  useEffect(() => {
    const handleStorageChange = (changes, area) => {
      const storageKey_location = window.location.href;
      if (area === 'local' && changes[storageKey_location]) {
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