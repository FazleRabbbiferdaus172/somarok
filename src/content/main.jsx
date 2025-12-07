chrome.storage.local.get(["bookmark1"]).then((result) => {
  console.log("Value is " + JSON.stringify(result.bookmark1));
});

document.addEventListener("click", function (ev) {
  const values = {location: window.location.href, xposition: ev.clientX, yposiiton: ev.clientY};
  chrome.storage.local.set({ bookmark1: values });
});

