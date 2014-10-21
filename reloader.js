function redirectTo(URL, delay) {
    setTimeout(function() {
        window.location.href = URL;
      }, delay * 1000)
}

function beginReloading(params) {
console.log(params);
    if (!params.enabled || !params.reloadrules) return;
    
    var loc = window.location.href;
    
    for (var i = 0; i < params.reloadrules.length; i++) {
        var rules = params.reloadrules[i];
        console.log(rules);
        var pattern = new RegExp(rules.urlfrom, 'gi');
        //All%20work%20is/gi;

        matches = loc.match(pattern);
        if (matches) {
          chrome.extension.sendMessage({}, function(response) {});
          redirectTo(rules.urlto, rules.delay);
        }
    }

}

chrome.storage.sync.get(['reloadrules', 'enabled'], function(items) {
    beginReloading(items);
    console.log('started reloading');
});