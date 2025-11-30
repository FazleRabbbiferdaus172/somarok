chrome.storage.local.get(["bookmark1"]).then((result) => {
  console.log("Value is " + JSON.stringify(result.bookmark1));
});

