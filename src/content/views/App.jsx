import { StrictMode, useEffect, useState } from 'react';
import Bookmarker from '@/components/bookmarker.jsx';

export default function App() {
  const [bookmarkerState, setbookmarkerList] = useState([]);
  const [somarokState, setSomarokState] = useState(0);

  async function handleRemoveBookmark(xposition, yposition, location) {
    console.log("Removing bookmark at ", xposition, yposition, location);
    const storageKey_location = location || window.location.href;
    const location_somarok = await chrome.storage.local.get([storageKey_location]);
    const allBookmarks = location_somarok[storageKey_location].filter(bookmark => !(bookmark.xposition === xposition && bookmark.yposition === yposition));
    await chrome.storage.local.set({ [storageKey_location]: allBookmarks });
  }

  async function getDataFromStorage() {
    let allBookmarks = [];
    let bookmarkerList = [];
    const storageKey_location = window.location.href;
    const location_somarok = await chrome.storage.local.get([storageKey_location]);
    if (location_somarok[storageKey_location] === undefined) {
      allBookmarks = [];
    } else {
      allBookmarks = location_somarok[storageKey_location];
    }
    allBookmarks.forEach((bookmark) => {
      bookmarkerList.push(<Bookmarker key={bookmark.xposition} xposition={bookmark.xposition} yposition={bookmark.yposition} location={storageKey_location} onRemove={handleRemoveBookmark} />);
    }
    );
    return bookmarkerList;
  }

  useEffect(() => {
    const bookmarkerList = getDataFromStorage(bookmarkerState);
    setbookmarkerList(bookmarkerList);
  }, [somarokState]);

  useEffect(() => {
    const handleStorageChange = (changes, area) => {
      const storageKey_location = window.location.href;
      if (area === 'local' && changes[storageKey_location]) {
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