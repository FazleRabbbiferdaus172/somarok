import { StrictMode, useEffect, useState } from 'react'
import Bookmarker from '@/components/bookmarker.jsx'
export default function App() {
  const [bookmarkerState, setbookmarkerList] = useState([]);


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
        bookmarkerList.push(<Bookmarker key={bookmark.xposition} xposition={bookmark.xposition} yposition={bookmark.yposiiton} location={bookmark.location} />);
      }
      );
      setbookmarkerList(bookmarkerList)
    }
    getDataFromStorage(bookmarkerState);
  }, []);

  return (
    <div>
      {bookmarkerState.length !== 0 ? bookmarkerState : <></>}
    </div>
  )
}