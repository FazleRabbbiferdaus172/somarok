import './App.css';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import BookmarkRemoveIcon from '@mui/icons-material/BookmarkRemove';

function App() {
  const [isBookMarkAddActive, setIsBookMarkAddActive] = useState(false);
  const [isBookMarkRemoveActive, setIsBookMarkRemoveActive] = useState(false);
  const [bookmarkerState, setbookmarkerList] = useState([]);

  function toggleBookmarkAdd() {
    setIsBookMarkAddActive(!isBookMarkAddActive);
  }

  async function getTab() {
    let queryOptions = { active: true, currentWindow: true };
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
  }

  async function sendSetAddMessage(operation) {
    const tab = await getTab();
    chrome.tabs.sendMessage(tab.id, { type: operation });
  }

  function toggleBookmarkRemove() {
    setIsBookMarkRemoveActive(!isBookMarkRemoveActive);
  }

  function lookForOperation(target) {
    let operation = target.id;
    while (operation !== 'add' && operation !== 'remove') {
      if (target.parentElement === null) {
        operation = null;
        break;
      }
      target = target.parentElement;
      operation = target.id;
    }
    return operation;
  }

  function toggleBothBookmarkActions(ev) {
    let target = lookForOperation(ev.target);
    if (target === 'add') {
      toggleBookmarkAdd();
      sendSetAddMessage("SetAdd");
      setIsBookMarkRemoveActive(false);
    }
    else if (target === 'remove') {
      toggleBookmarkRemove();
      sendSetAddMessage("SetRemove");
      setIsBookMarkAddActive(false);
    }
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
          bookmarkerList.push(<Bookmarker key={bookmark.xposition} xposition={bookmark.xposition} yposition={bookmark.yposiiton} location={bookmark.location} onRemove={handleRemoveBookmark} />);
        }
      }
      );
      setbookmarkerList(bookmarkerList)
    }
    getDataFromStorage(bookmarkerState);
  }, []);

  return (
    <Container fixed>
      <Box sx={{ bgcolor: '#cfe8fc', height: '10vh', weidth: '2vw' }}>
        <IconButton>
          <div id="add" onClick={(ev) => toggleBothBookmarkActions(ev)}>
            <BookmarkAddIcon />
          </div>
          <div id="remove" onClick={(ev) => toggleBothBookmarkActions(ev)} >
            <BookmarkRemoveIcon />
          </div>
        </IconButton>
      </Box>
    </Container>
  )
}

export default App
