if ( window.location.pathname == "/topic.php" ) {
    // Convert FG to IGG.  FIXME configurable ratio.
    $('.bc1>b').each( function( idx ) {
        gold = parseFloat($(this).text().replace(/,/g, ""));
        igg = gold / 15.0;
        if ( igg > 0 ) {
            $(this).append(' (' + Number(igg.toFixed(2)).toLocaleString() + 'm)');
        }
    });

    // Add bnet link for battletags.
    btag = /([a-zA-Z][a-zA-Z0-9]*)#([0-9]{4,})/g
    $('div[id^="tp"],div.sig').each( function( idx ) {
        content = $(this).html();
        newcontent = content;
        while ( tag = btag.exec(content) ) {
            newcontent = newcontent.replace(tag[0], "<a href='http://us.battle.net/d3/en/profile/" + tag[1] + "-" + tag[2] + "/'>" + tag[0] + "</a> (<a href='http://d3up.com/search?search=" + tag[1] + "%23" + tag[2] + "'>d3up</a>)");
        }
        $(this).html(newcontent);
        btag.lastIndex = 0;
    });
}

if ( window.location.pathname == "/forum.php" ) {
    // Remove red/bold from thread titles.
    $('a.ta').removeClass('ta');
    $('a[href^="topic"]').each( function( idx ) {
        $(this).html($(this).text());
    });
}
