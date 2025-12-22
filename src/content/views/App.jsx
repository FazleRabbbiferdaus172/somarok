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
      debugger;
      allBookmarks.forEach((bookmark) => {
        bookmarkerList.push(<Bookmarker key={bookmark.xposition} xposition={bookmark.xposition} yposiiton={bookmark.yposition} location={bookmark.location} />);
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