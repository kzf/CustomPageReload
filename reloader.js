function beginReloading(params) {
    if (!params.enabled) return;

    var loc = window.location.href;
    var pattern = new RegExp(params.urlfrom, 'gi');
    //All%20work%20is/gi;

    matches = loc.match(pattern);
    if (matches) {
      chrome.extension.sendMessage({}, function(response) {});
      setTimeout(function() {
        window.location.href = params.urlto;
      }, params.delay * 1000)
    }

}

chrome.storage.sync.get(['urlfrom', 'urlto', 'delay', 'enabled'], function(items) {
    beginReloading(items);
    console.log('started reloading');
});