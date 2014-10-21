var rrtemplate = $("#reloadrules-template").html();
var reloadrules;

$("#saving").hide();

var reloadeditor = $("#reloadeditor");
reloadeditor.form = reloadeditor.find('form');
reloadeditor.form.hide();

var editing = null;

$("#submit").click(function(e) {
    var rules = { urlfrom: $("#urlfrom").val(),
                  urlto: $("#urlto").val(),
                  delay: parseInt($("#delay").val()),
                  enabled: true };
    var reloadrule = reloadeditor.prev();
    console.log(reloadrule);
    console.log(rules.urlfrom);
    reloadrules[reloadrule.data('ruleid')] = rules;
    $("#saving").text("saving...").slideDown(200);
    chrome.storage.sync.set(
        {reloadrules: reloadrules,
         enabled: enabled},
        function() {
            $("#saving").text("saved").fadeOut(1000);
            reloadrule.find(".urlfrom").text(rules.urlfrom);
            reloadrule.find(".urlto").text(rules.urlto);
            reloadrule.find(".delay").text(rules.delay);
            reloadrule.show();
            reloadeditor.form.hide();
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

chrome.storage.sync.get(['reloadrules', 'enabled'], function(items) {
    // TODO: if no rules, set it to blank
    reloadrules = items.reloadrules;
    for (var i = 0; i < reloadrules.length; i++) {
        var rules = reloadrules[i];
        var newrule = rrtemplate
                      .replace('{{ruleid}}', i)
                      .replace('{{urlfrom}}', rules.urlfrom)
                      .replace('{{urlto}}', rules.urlto)
                      .replace('{{delay}}', rules.delay);
        $("#settings").append(
            $(newrule)
        );
    }
    $(".editrule").click(function(e) {
        var reloadrule = $(this).parent().parent();
        reloadrule.after(reloadeditor);
        reloadrule.hide();
        reloadeditor.form.show();
        reloadeditor.find("#urlfrom").val(reloadrule.find(".urlfrom").text());
        reloadeditor.find("#urlto").val(reloadrule.find(".urlto").text());
        reloadeditor.find("#delay").val(reloadrule.find(".delay").text());
    });
    enabled = items.enabled;
    onoff.text(enabled ? 'Disable' : 'Enable');
    console.log('got items');
});