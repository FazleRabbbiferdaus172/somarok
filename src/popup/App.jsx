import './App.css';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import BookmarkRemoveIcon from '@mui/icons-material/BookmarkRemove';
function App() {
  const [isBookMarkAddActive, setIsBookMarkAddActive] = useState(false);
  const [isBookMarkRemoveActive, setIsBookMarkRemoveActive] = useState(false);

  function toggleBookmarkAdd() {
    setIsBookMarkAddActive(!isBookMarkAddActive);
  }

  function toggleBookmarkRemove() {
    setIsBookMarkRemoveActive(!isBookMarkRemoveActive);
  }

  function toggleBothBookmarkActions(ev) {
    if (ev.target.id === 'add') {
      toggleBookmarkAdd();
      setIsBookMarkRemoveActive(false);
    }
    else if (ev.target.id === 'remove') {
      toggleBookmarkRemove();
      setIsBookMarkAddActive(false);
    }
  }

  function handleAddBookmark(ev) {
    console.log(`Add bookmark @ ${ev.clientX}, ${ev.clientY}`);
    chrome.storage.local.set({ bookmark1: { x: ev.clientX, y: ev.clientY } }).then(() => {
      console.log("Value is set");
    });
  }

  function handleRemoveBookmark(ev) {
    console.log(`Remove bookmark @ ${ev.clientX}, ${ev.clientY}`);
  }
  return (
    <Container fixed>
      <Box sx={{ bgcolor: '#cfe8fc', height: '10vh', weidth: '2vw' }}>
        <IconButton>
          <div id="add" onClick={(ev) => toggleBothBookmarkActions(ev)}>
            <BookmarkAddIcon />
          </div>
          <div  id="remove" onClick={(ev) => toggleBothBookmarkActions(ev)} >
            <BookmarkRemoveIcon/>
          </div>
        </IconButton>
      </Box>
    </Container>
  )
}

export default App
