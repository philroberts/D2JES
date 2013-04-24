if ( window.location.pathname == "/topic.php" ) {
    // Convert FG to IGG.  FIXME configurable ratio.
    chrome.storage.local.get( { "fgratio" : 15 }, function( result ) {
        fgratio = result[ "fgratio" ];
        $('.bc1>b').each( function( idx ) {
            gold = parseFloat($(this).text().replace(/,/g, ""));
            igg = Math.round( gold / fgratio );
            if ( igg > 1000 ) {
                $(this).append(' (' + ( igg / 1000 ).toFixed( 2 ) + 'b)');
            } else if ( igg > 0 ) {
                $(this).append(' (' + igg + 'm)');
            }
        });
    });

    $('div[id^="tp"]').each( function( idx ) {
        $(this).after($(this).clone().attr("id", "d2jes" + $(this).attr("id")));
        $(this).attr("style", "visibility:collapse;width:0;height:0;");
    });
    // Add bnet link for battletags.
    btag = /([a-zA-Z][a-zA-Z0-9]*)#([0-9]{4,})/g
    $('div[id^="d2jestp"],div.sig').each( function( idx ) {
        content = $(this).html();
        newcontent = content;
        while ( tag = btag.exec(content) ) {
            newcontent = newcontent.replace(tag[0], "<a href='http://us.battle.net/d3/en/profile/" + tag[1] + "-" + tag[2] + "/'>" + tag[0] + "</a> (<a href='http://d3up.com/search?search=" + tag[1] + "%23" + tag[2] + "'>d3up</a>)");
        }
        $(this).html(newcontent);
        btag.lastIndex = 0;
    });

    // Add a PM link after every user link
    $('dt>a[href^="user"]').each( function( idx ) {
        userid = /[0-9]+/.exec( $(this).attr('href') );
        $(this).after( " (<a href='pm.php?c=1&u=" + userid[0] + "'>PM</a>)" );
    });
}

if ( window.location.pathname == "/forum.php" ) {
    // Remove red/bold from thread titles.
    $('a.ta').removeClass('ta');
    $('a[href^="topic"]').each( function( idx ) {
        $(this).html($(this).text());
    });
}
