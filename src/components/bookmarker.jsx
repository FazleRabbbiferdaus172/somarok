import { use, useState } from 'react'
import bookmarker from '@/assets/bookmark.svg'

export default function Bookmarker(props) {
    const [color, setColor] = useState('red');
    const [canremove, setCanremove] = useState(false);
  return (
    <>
        <img src={bookmarker} className="logo" alt="Vite logo" style={{'color': color}}/>
        {canremove ?
        <button>Remove</button> : <></>
        }
    </>
  )
}
