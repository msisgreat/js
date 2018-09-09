jQuery(document).ready(function ($) {
    SP.SOD.executeOrDelayUntilScriptLoaded(Function.createDelegate(this, function () {
        'use strict';
        var taxonomySodLoaded = false;
        if (typeof (_v_dictSod) !== 'undefined' && _v_dictSod['sp.taxonomy.js'] == null) {
            SP.SOD.registerSod('sp.taxonomy.js', SP.Utilities.Utility.getLayoutsPageUrl('sp.taxonomy.js'));
        } else {
            taxonomySodLoaded = _v_dictSod['sp.taxonomy.js'].state === Sods.loaded;
        }
        if (taxonomySodLoaded) {
            loadTaxonomy();
        } else {
            SP.SOD.executeFunc('sp.taxonomy.js', false, Function.createDelegate(this, loadTaxonomy));
        }
    }), 'core.js');
}); // end of document ready

var siteUrl = "/ms";
var termSetName = "Technology";
var locale = 1033; // your locale. Here is English

loadTaxonomy = function () {
    var clientContext = SP.ClientContext.get_current();
    var taxonomySession = SP.Taxonomy.TaxonomySession.getTaxonomySession(clientContext);
    var termStore = taxonomySession.getDefaultSiteCollectionTermStore();
    var termSets = termStore.getTermSetsByName(termSetName, locale);
    var termSet = termSets.getByName(termSetName);
    this.terms = termSet.get_terms();
    clientContext.load(taxonomySession);
    clientContext.load(termStore);
    clientContext.load(termSet);
    clientContext.load(terms);
    clientContext.executeQueryAsync(Function.createDelegate(this, this.onTermSucceeded), Function.createDelegate(this, this.onTermFailed));
};

function onTermSucceeded(sender, args) {
    console.log("term success");
    var enumerator = terms.getEnumerator();
    while (enumerator.moveNext()) {
        var html = "<div style='margin-top:10px;'><a class='btn btn-primary [CSSCLASS]' href='[URL]' aria-label='Settings' target='_blank'> [NAVTXT]</a></div>";
        var spTerm = enumerator.get_current();
        var name = spTerm.get_name();
        var id = spTerm.get_id();
        var url = "/ms/SitePages/home.aspx?taxId={" + id + "}";
        var prop = spTerm.get_localCustomProperties();
        html = html.replace("[NAVTXT]", name);

        if (prop.cssclass) {
            //console.log(name + " Prop css = " + prop.cssclass);
            html = html.replace("[CSSCLASS]", prop.cssclass);
        }
        if (prop.cssfname) {
            url = url + "&cssfname=" + prop.cssfname;

        }
        html = html.replace("[URL]", url);
        $("#Navigation").append(html);
    }
}

function onTermFailed(sender, args) {
    alert('Termset Error: ' + args.get_message());
}
