$("#submit").click(function(e) {
    $("#saving").show().text("saving...");
    chrome.storage.sync.set(
        {'urlfrom':$('#urlfrom').val(),
         'urlto':$('#urlto').val(),
         'delay': parseInt($('#delay').val())},
        function() {
            $("#saving").text("saved").fadeOut(1000);
        });
    e.preventDefault();
});

var enabled = true;
var onoff = $("#onoff");

onoff.click(function(e) {
    if (enabled) {
        chrome.storage.sync.set({enabled:false}, function() {
            onoff.text("Enable");
        });
        enabled = false;
    } else {
        chrome.storage.sync.set({enabled:true}, function() {
            onoff.text("Disable");
        });
        enabled = true;
    }
});

chrome.storage.sync.get(['urlfrom', 'urlto', 'delay', 'enabled'], function(items) {
    $('#urlfrom').attr('value', items.urlfrom);
    $('#urlto').attr('value', items.urlto);
    $('#delay').attr('value', items.delay);
    enabled = items.enabled;
    onoff.text(enabled ? 'Disable' : 'Enable');
    console.log('got items');
});