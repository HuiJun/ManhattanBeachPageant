$(document).delegate("#page_dashboard", "pageshow", function() {
  $('.disabled').click(function() {
    return false;
  });
  $('#button_login').hide();
  try {
    $.ajax({
      url: restdomain + "/?q=api/rest/system/connect.json",
      type: 'post',
      dataType: 'json',
      error: function (XMLHttpRequest, textStatus, errorThrown) {
        alert('page_dashboard - failed to system connect');
        console.log(JSON.stringify(XMLHttpRequest));
        console.log(JSON.stringify(textStatus));
        console.log(JSON.stringify(errorThrown));
      },
      success: function (data) {
        drupal_user = data.user;
        if (drupal_user.uid == 0) { // user is not logged in, show the login button, hide the logout button
          $('.authenticated').hide();
          $('#button_login').show();
        }
        else { // user is logged in, hide the login button, show the logout button
          $('#button_login').hide();
          $('.authenticated').show();
          if(initialized != 1) {
            get_lists();
            initialized = 1;
          }
        }
      }
    });
  }
  catch (error) { alert("page_dashboard - " + error); }
      
  $('#button_logout').bind("click",function(){
    try {
      $.ajax({
        beforeSend: function() { $.mobile.showPageLoadingMsg(); },
        complete: function() { $.mobile.hidePageLoadingMsg() },
        url: "https://itgirls.com/?q=api/rest/user/logout.json",
        type: 'post',
        dataType: 'json',
        error: function (XMLHttpRequest, textStatus, errorThrown) {
          alert('Failed to Logout');
          console.log(JSON.stringify(XMLHttpRequest));
          console.log(JSON.stringify(textStatus));
          console.log(JSON.stringify(errorThrown));
        },
        success: function (data) {
          alert("You have been logged out.");
          $.mobile.changePage("index.html",{reloadPage:true},{allowSamePageTranstion:true},{transition:'none'});
        }
      });
    }
    catch (error) { alert(error); }
    return false;
  });
});

function get_lists() {
  try {
    $.ajax({
      beforeSend: function() { $.mobile.showPageLoadingMsg(); },
      complete: function() { $.mobile.hidePageLoadingMsg() },
      url: restdomain + "/?q=featured-list",
      type: 'GET',
      dataType: 'json',
      error: function (XMLHttpRequest, textStatus, errorThrown) {
        alert('Failed to Retrieve Pages');
        console.log(JSON.stringify(XMLHttpRequest));
        console.log(JSON.stringify(textStatus));
        console.log(JSON.stringify(errorThrown));
      },
      success: function (data) {
        if(featured_list != data) {
          featured_list = data;
        }
      }
    });
  }
  catch (error) { alert(error); }
  
  try {
    $.ajax({
      beforeSend: function() { $.mobile.showPageLoadingMsg(); },
      complete: function() { $.mobile.hidePageLoadingMsg() },
      url: restdomain + "/?q=event-list",
      type: 'GET',
      dataType: 'json',
      error: function (XMLHttpRequest, textStatus, errorThrown) {
        alert('Failed to Retrieve Pages');
        console.log(JSON.stringify(XMLHttpRequest));
        console.log(JSON.stringify(textStatus));
        console.log(JSON.stringify(errorThrown));
      },
      success: function (data) {
        if(event_list != data) {
          event_list = data;
        }
      }
    });
  }
  catch (error) { alert(error); }
  
  try {
    $.ajax({
      beforeSend: function() { $.mobile.showPageLoadingMsg(); },
      complete: function() { $.mobile.hidePageLoadingMsg() },
      url: restdomain + "/?q=node-list",
      type: 'GET',
      dataType: 'json',
      error: function (XMLHttpRequest, textStatus, errorThrown) {
        alert('Failed to Retrieve Pages');
        console.log(JSON.stringify(XMLHttpRequest));
        console.log(JSON.stringify(textStatus));
        console.log(JSON.stringify(errorThrown));
      },
      success: function (data) {
        if(node_list != data) {
          node_list = data;
        }
      }
    });
  }
  catch (error) { alert(error); }  
}