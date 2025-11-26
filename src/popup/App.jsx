import './App.css';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import BookmarkRemoveIcon from '@mui/icons-material/BookmarkRemove';
function App() {
  function handleAddBookmark(ev) {
    console.log('Add bookmark');
  }

  function handleRemoveBookmark(ev) {
     console.log('Remove bookmark');    
  }
  return (
    <Container fixed>
        <Box sx={{ bgcolor: '#cfe8fc', height: '10vh', weidth: '2vw' }}>
            <IconButton>
              <BookmarkAddIcon onClick={(ev) => handleAddBookmark(ev)}/>
              <BookmarkRemoveIcon onClick={(ev) => handleRemoveBookmark(ev)}/>
            </IconButton>
        </Box>
      </Container>
  )
}

export default App
