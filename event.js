function onMessage(request, sender, sendResponse) {
  chrome.browserAction.setBadgeText({text: "!"});
  sendResponse({});
};

chrome.extension.onMessage.addListener(onMessage);