var loc = window.location.href;
var pattern = /All%20work%20is/gi;

matches = loc.match(pattern);
if (matches) {
  chrome.extension.sendRequest({}, function(response) {});
  setTimeout(function() {
    window.location.href = 'http://workhub.transcribeme.com/Session/QACheck';
  }, 5000)
}
