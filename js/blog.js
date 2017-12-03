/*
Until I figure out how to get medium API to respond with more than 10 posts, I can't get an accurate word count :(
PyMedium Flask API is an option but seems unnecessarily heavyweight for one span lol
https://github.com/enginebai/PyMedium

wordcount: https://stackoverflow.com/questions/9864644/jquery-character-and-word-count/9864680

$( function(){
    var txt = $('.content')[0].text()
      , charCount = txt.length
      , wordCount = txt.replace( /[^\w ]/g, "" ).split( /\s+/ ).length
      ;
    $( '#somwhereInYourDocument' ).text( "The text had " + charCount + " characters and " + wordCount +" words" );
});
*/

const PREVIEW_LENGTH = 120;

$(document).ready(function() {
    const $content = $("#jsonContent");
    const data = { rss_url: "https://medium.com/feed/arthurs-blog" };
    $.get("https://api.rss2json.com/v1/api.json", data, function(response) {
        if (response.status == "ok") {
            var output = "";
            $.each(response.items, function(k, item) {
                let visibleSm = "";
                if (k >= 3) { visibleSm = " visible-sm"; }

                output += '<div class="col-sm-6 col-md-4 cell' + visibleSm + '">';
                output += '<div class="blog-post"><header>';
                output += '<h4 class="date">' + $.format.date(item.pubDate, "dd<br>MMM") + "</h4>";

                const tagIndex = item.description.indexOf("<img"); // Find where the img tag starts
                const srcIndex = item.description.substring(tagIndex).indexOf("src=") + tagIndex; // Find where the src attribute starts
                const srcStart = srcIndex + 5; // Find where the actual image URL starts; 5 for the length of 'src="'
                const srcEnd = item.description.substring(srcStart).indexOf('"') + srcStart; // Find where the URL ends
                const src = item.description.substring(srcStart, srcEnd); // Extract just the URL

                //TODO: enforce image sizing
                output += '<div class="blog-element"><img class="img-responsive" src="' + src + '" style="width:360px; height:240px !important;"></div></header>';
                output += '<div class="blog-content"><h4><em><a href="' + item.link + '">' + item.title + "</a></em></h4>";
                output += '<div class="post-meta"><em><span>By ' + item.author + "</span></em></div>";

                //remove imgs from text string
                const blogBody = item.description.replace(/<img[^>]*>/g, "");

                let trimmedString = blogBody.substr(0, PREVIEW_LENGTH);
                //re-trim if cut off in the middle of a word
                trimmedString = trimmedString.substr(0, Math.min(trimmedString.length, trimmedString.lastIndexOf(" ")));
                output += "<p>" + trimmedString + "...</p>";
                output += "</div></div></div>";
                
                return k < 3;
            });

            $content.html(output);
        } else { //response.status != "ok"
            $content.html("Sorry! There was an rss2json API error and my blogs couldn't be loaded.")
        }
    });
});
