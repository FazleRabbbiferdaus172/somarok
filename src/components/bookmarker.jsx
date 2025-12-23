import { use, useState } from 'react'
import bookmarker from '@/assets/bookmark.svg'

export default function Bookmarker(props) {
    const [color, setColor] = useState('red');
    const [canremove, setCanremove] = useState(false);
  return (
    <>
        <img src={bookmarker} className="logo" alt="Vite logo" style={{'color': color}} width="100" height="100"/>
        {canremove ?
        <button>Remove</button> : <></>
        }
    </>
  )
}
