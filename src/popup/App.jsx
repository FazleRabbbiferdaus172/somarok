import './App.css';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';

function App() {

  return (
    <Container fixed>
        <Box sx={{ bgcolor: '#cfe8fc', height: '10vh', weidth: '2vw' }}>
            <IconButton>
              <BookmarkAddIcon/>
            </IconButton>
        </Box>
      </Container>
  )
}

export default App
