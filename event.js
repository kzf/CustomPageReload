/*chrome.storage.sync.set(
    {reloadrules: [
        {urlfrom: 'reddit',
         urlto: 'about:blank',
         delay: 5,
         enabled: true},
        {urlfrom: 'digg',
         urlto: 'www.reddit.com',
         delay: 1,
         enabled: true},
        {urlfrom: 'bing',
         urlto: 'www.google.com',
         delay: 15,
         enabled: false}]}
);*/

function onMessage(request, sender, sendResponse) {
  chrome.browserAction.setBadgeText({text: "!"});
  sendResponse({});
};

chrome.extension.onMessage.addListener(onMessage);