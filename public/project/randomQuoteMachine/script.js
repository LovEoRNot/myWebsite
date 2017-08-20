$(function() {
  getString();
  changeColor();

  function getString() {
    $.getJSON("./quote.json", function(data) {
      i = Math.round(Math.random() * (data.length - 1));
        if(data[i]) {
          $('.sentence').animate({
              opacity: 0
            },
            function() {
              $(this).animate({
                opacity: 1
              });
              $('#quote').text(data[i].content);
            });
          $('.author').animate({
              opacity: 0
            },
            function() {
              $(this).animate({
                opacity: 1
              });
              $('#author').text(data[i].author);
            });
        }
    })
    // $.ajax({
    //   type: "get",
    //   dataType : "jsonp",
    //   jsonp: "jsonpCallback",
    //   url: "quote.json",
    //   success: function(data) {
    //     i = Math.round(Math.random() * (data.length - 1));
    //     if(data[i]) {
    //       $('.sentence').animate({
    //           opacity: 0
    //         },
    //         function() {
    //           $(this).animate({
    //             opacity: 1
    //           });
    //           $('#quote').text(data[i].content);
    //         });
    //       $('.author').animate({
    //           opacity: 0
    //         },
    //         function() {
    //           $(this).animate({
    //             opacity: 1
    //           });
    //           $('#author').text(data[i].author);
    //         });
    //     }
    //   }
    // });
  }

  function changeColor() {
    var colors = ["#ff3", "#36f", "#3f9", "#ec84d5", "#f06535", "#879bef", "#a4b1e9", "#e3d579", "#9a977f"];
    var i = Math.round(Math.random() * (colors.length - 1));
    $('.wrap, .oprator a').animate({
        backgroundColor: colors[i]
    });
    $('.sentence, .author').animate({
        color: colors[i]
    });
  }
  
  $('#next').on('click', function() {
    getString();
    changeColor();
  })
  $('#tumblr').on('click', function() {
    $(this).attr('href', 'https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,freecodecamp&caption=' + encodeURIComponent($('#author').text()) +
      '&content=' + encodeURIComponent(encodeURIComponent('"' + $('#quote').text()) +
        '&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button'));
  })
  $('#twitter').on('click', function() {
    $(this).attr('href', 'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' +
      encodeURIComponent('"' + $('#quote').text() + '" ' + $('#author').text()));
  })
})