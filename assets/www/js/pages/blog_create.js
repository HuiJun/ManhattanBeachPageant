$(document).delegate("#page_blog_create", "pageshow", function() {
  $('input').textinput();
  $('textarea').textinput();
  $('#page_blog_create_submit').bind('click',function(){
    var title = $('#page_blog_name').val();
    if (!title) { alert('Please enter a title.'); return false; }
    var body = $('#page_blog_body').val();
    if (!body) { alert('Please enter a body.'); return false; }
    $.ajax({
      beforeSend: function() { $.mobile.showPageLoadingMsg(); },
      complete: function() { $.mobile.hidePageLoadingMsg() },
      url: restdomain + "/?q=api/rest/node.json",
      type: 'POST',
      data: 'node[type]=blog&node[title]=' + encodeURIComponent(title) + '&node[language]=und&node[body][und][0][value]=' + encodeURIComponent(body),
      dataType: 'json',
      error: function(XMLHttpRequest, textStatus, errorThrown) {
        alert('Failed to Login');
        console.log(JSON.stringify(XMLHttpRequest));
        console.log(JSON.stringify(textStatus));
        console.log(JSON.stringify(errorThrown));
      },
      success: function (data) {
       nid = data.nid;
       $.mobile.changePage("#page_node_view", "slideup");
      }
    });
    return false;
  });
});