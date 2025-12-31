import { use, useState } from 'react'
import bookmarker from '@/assets/bookmark.svg'

export default function Bookmarker(props) {
    const [color, setColor] = useState('red');
    const [canremove, setCanremove] = useState(false);
    function handleRemoveSomarok(){
        if(canremove){
            props.onRemove();
        }
    }
  return (
    <div className="somarok-bookmark" style={{position: 'absolute', top: props.yposition + 'px', left: props.xposition + 'px', zIndex: 1000, transform: 'translate(-25%, -50%)'}}
      onClick={handleRemoveSomarok()}
    >
        <img src={bookmarker} className="logo" alt="Vite logo" style={{'color': color}} width="100" height="100"/>
    </div>
  )
}
