import crxLogo from '@/assets/crx.svg'
import reactLogo from '@/assets/react.svg'
import viteLogo from '@/assets/vite.svg'
import HelloWorld from '@/components/HelloWorld'
import './App.css'

export default function App() {
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
    }, []);
  return (
    <div>
      <a href="https://vite.dev" target="_blank" rel="noreferrer">
        <img src={viteLogo} className="logo" alt="Vite logo" />
      </a>
      <a href="https://reactjs.org/" target="_blank" rel="noreferrer">
        <img src={reactLogo} className="logo react" alt="React logo" />
      </a>
      <a href="https://crxjs.dev/vite-plugin" target="_blank" rel="noreferrer">
        <img src={crxLogo} className="logo crx" alt="crx logo" />
      </a>
      <HelloWorld msg="Vite + React + CRXJS" />
    </div>
  )
}
