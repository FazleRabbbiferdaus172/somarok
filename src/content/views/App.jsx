import {Bookmarker} from '@/components/bookmarker.jsx'
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