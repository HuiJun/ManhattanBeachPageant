$(document).delegate("a#page_delete_confirm_submit", "click", function() {
  try {
    $.ajax({
      beforeSend: function() { $.mobile.showPageLoadingMsg(); },
      complete: function() { $.mobile.hidePageLoadingMsg() },
      url: restdomain + "/?q=api/rest/node/" + encodeURIComponent(nid) + ".json",
      type: 'DELETE',
      dataType: 'json',
      error: function (XMLHttpRequest, textStatus, errorThrown) {
        console.log(JSON.stringify(XMLHttpRequest));
        console.log(JSON.stringify(textStatus));
        console.log(JSON.stringify(errorThrown));
      },
      success: function (data) {
        console.log(JSON.stringify(data));
        $.mobile.changePage("#page_node_pages", "slideup");
        alert('Deleted Successfully');
      }
    });
  }
  catch (error) { alert(error); }
});