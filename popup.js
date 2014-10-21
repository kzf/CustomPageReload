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

chrome.storage.sync.get(['urlfrom', 'urlto', 'delay'], function(items) {
    $('#urlfrom').attr('value', items.urlfrom);
    $('#urlto').attr('value', items.urlto);
    $('#delay').attr('value', items.delay);
    console.log('got items');
});