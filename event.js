function onRequest(request, sender, sendResponse) {
  chrome.browserAction.setBadgeText({text: "!"});
  sendResponse({});
};

chrome.extension.onRequest.addListener(onRequest);