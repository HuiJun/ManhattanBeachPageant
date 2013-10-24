$(document).delegate("#page_nodel_view", "pageshow", function() {
  try {
    $.ajax({
      beforeSend: function() { $.mobile.showPageLoadingMsg(); },
      complete: function() { $.mobile.hidePageLoadingMsg() },
      url: restdomain + "/?q=api/rest/node/" + encodeURIComponent(nid) + ".json",
      type: 'get',
      dataType: 'json',
      error: function (XMLHttpRequest, textStatus, errorThrown) {
        //console.log(JSON.stringify(XMLHttpRequest));
        //console.log(JSON.stringify(textStatus));
        //console.log(JSON.stringify(errorThrown));
      },
      success: function (data) {
        //console.log(JSON.stringify(data));
        $('#page_nodel_view h1').html(data.title); // set the header title
        if(data.type == 'image') {
          var filepath = data.field_image.und[0].uri;
          $('#page_nodel_view .inner-content').html('<a href="#popup' + data.field_image.und[0].uid + '" data-rel="popup" data-position-to="window" data-transition="fade"><img src="https://itgirls.com/sites/default/files/styles/mobile/public/' + filepath.substring(9) + '" /></a>'); // display the body in the content div
        } else if(data.type == 'blog') {
          $('#page_nodel_view .inner-content').html('<p>' + data.body.und[0].safe_value + '</p>'); // display the body in the content div
        }
      }
    });
  }
  catch (error) { alert(error); }
});