import { StrictMode, useEffect, useState } from 'react';
import Bookmarker from '@/components/bookmarker.jsx';

export default function App() {
  const [somaroks, setSomaroks] = useState([]);
  const [somarokState, setSomarokState] = useState(0);
  const [location, setLocation] = useState(window.location.href);

  async function handleRemoveBookmark(xposition, yposition, location) {
    const locationSomarok = await chrome.storage.local.get([location]);
    const allBookmarks = locationSomarok[location].filter(bookmark => !(bookmark.xposition === xposition && bookmark.yposition === yposition));
    await chrome.storage.local.set({ [location]: allBookmarks });
  }

  async function loadDataFromStorageByLocation() {
    let currentLocationSomaroks = [];
    const allLocationSomaroks = await chrome.storage.local.get([location]);
    if (allLocationSomaroks[location] === undefined) {
      currentLocationSomaroks = [];
    } else {
      currentLocationSomaroks = allLocationSomaroks[location];
    }
    return currentLocationSomaroks;
  }

  async function loadAndSetCurrentLocationSomaroks() {
    const currentLocationSomaroks = await loadDataFromStorageByLocation();
    setSomaroks(currentLocationSomaroks);
  }

  useEffect(() => {
    const handleStorageChange = (changes, area) => {
      if (area === 'local' && changes[location]) {
        setSomarokState(prev => prev + 1);
      }
    };

    chrome.storage.onChanged.addListener(handleStorageChange);

    return () => {
      chrome.storage.onChanged.removeListener(handleStorageChange);
    };
  }, []);

  useEffect(() => {
    loadAndSetCurrentLocationSomaroks();
  }, [somarokState, location]);

  return (
    <div>
      {somaroks.map(somarok => { return <Bookmarker key={somarok.xposition} xposition={somarok.xposition} yposition={somarok.yposition} location={location} onRemove={handleRemoveBookmark} /> })}
    </div>
  )
}