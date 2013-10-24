$(document).delegate("#page_login", "pageshow", function() {
  $('#page_login_submit').bind('click',function(){
    var name = $('#page_login_name').val();
    if (!name) { alert('Please enter your user name.'); return false; }
    var pass = $('#page_login_pass').val();
    if (!pass) { alert('Please enter your password.'); return false; }
  
    // BEGIN: drupal services user login (warning: don't use https if you don't have ssl setup)
    $.ajax({
      beforeSend: function() { $.mobile.showPageLoadingMsg(); },
      complete: function() { $.mobile.hidePageLoadingMsg() },
      url: restdomain + "/?q=api/rest/user/login.json",
      type: 'post',
      data: 'username=' + encodeURIComponent(name) + '&password=' + encodeURIComponent(pass),
      dataType: 'json',
      error: function(XMLHttpRequest, textStatus, errorThrown) {
        alert('Failed to login');
        console.log(JSON.stringify(XMLHttpRequest));
        console.log(JSON.stringify(textStatus));
        console.log(JSON.stringify(errorThrown));
        $('.authenticated').hide();
      },
      success: function (data) {
       $.mobile.changePage("index.html", "slideup");
      }
    });
    // END: drupal services user login
    return false;
  });
});