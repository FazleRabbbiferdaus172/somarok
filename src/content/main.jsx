chrome.storage.local.get(["bookmark1"]).then((result) => {
  console.log("Value is " + JSON.stringify(result.bookmark1));
});

let isBookMarkAddActive = false;
let isBookMarkRemoveActive = false;

document.addEventListener("click", function (ev) {
  const values = {location: window.location.href, xposition: ev.clientX, yposiiton: ev.clientY};
  if (isBookMarkAddActive) {
    chrome.storage.local.set({ bookmark1: values });
  }
  else if (isBookMarkRemoveActive) {
    chrome.storage.local.remove("bookmark1");
  }
});

