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

    // Copy each post so it can be converted to bbcode without our
    // additions by the quote function.  Don't render the original
    // copy.
    $('div[id^="tp"]').each( function( idx ) {
        $(this).after($(this).clone().attr("id", "d2jes" + $(this).attr("id")));
        $(this).attr("style", "display:none;");
    });
    // Add bnet link for battletags.
    btag = /([a-zA-Z][a-zA-Z0-9]*)#([0-9]{4,})/g
    $('div[id^="d2jestp"],div.sig').each( function( idx ) {
        content = $(this).html();
        newcontent = content;
        offset = 0;
        while ( tag = btag.exec(content) ) {
            startidx = btag.lastIndex - tag[0].length + offset;
            linkstr = "<a href='http://us.battle.net/d3/en/profile/" + tag[1] + "-" + tag[2] + "/'>" + tag[0] + "</a> (<a href='http://d3up.com/search?search=" + tag[1] + "%23" + tag[2] + "'>d3up</a>)";
            newcontent = newcontent.slice(0, startidx) + linkstr + newcontent.slice(startidx + tag[0].length);
            offset += linkstr.length - tag[0].length;
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
