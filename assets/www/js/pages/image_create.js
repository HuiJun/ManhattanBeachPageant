$(document).delegate("#page_image_create", "pageshow", function() {
  $('#page_image')[0].reset();
  $('#upload-picture').show();
  $('#select-picture').show();
  $('#page_image_create_submit').bind('click',function(){
    var title = $('#page_image_name').val();
    if (!title) { alert('Please enter a title.'); return false; }
    
    var img = $('#fid').val();
    if (!img) { alert('Please enter select an image.'); return false; }
        $.ajax({
          beforeSend: function() { $.mobile.showPageLoadingMsg(); },
          complete: function() { $.mobile.hidePageLoadingMsg() },
          url: restdomain + "/?q=api/rest/node.json",
          type: 'POST',
          data: 'node[type]=image&node[title]=' + encodeURIComponent(title) + '&node[language]=und&node[field_image][und][0][fid]=' + encodeURIComponent(img),
          dataType: 'json',
          error: function(XMLHttpRequest, textStatus, errorThrown) {
            alert('page_node_create_submit - failed node create');
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

function takePicture() {
  navigator.camera.getPicture( function(uri) {
    var img = document.getElementById('camera_image');
    img.style.visibility = "visible";
    img.style.display = "block";
    img.src = "data:image/jpeg;base64, " + uri;
	var datafile = {
		"file": uri,
		"filename": "mobile.jpg",
		"filepath": "public://" + drupal_user.uid + "/mobile/"
	};
    $.ajax({
      beforeSend: function() { $.mobile.showPageLoadingMsg(); },
      complete: function() { $.mobile.hidePageLoadingMsg() },
      url: restdomain + "/?q=api/rest/file.json",
      type: 'POST',
      data: datafile,
      success: function (data) {
        document.getElementById('fid').value = data.fid;
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) {
        console.log(JSON.stringify(XMLHttpRequest));
        console.log(JSON.stringify(textStatus));
        console.log(JSON.stringify(errorThrown));
      }
    });
  },
  function(e) {
    console.log("Error getting picture: " + e);
    document.getElementById('camera_status').innerHTML = "";
  },
  {
    quality: 50,
    destinationType: navigator.camera.DestinationType.DATA_URL
  });
}

function selectPicture() {
  navigator.camera.getPicture( function(uri) {
    var img = document.getElementById('camera_image');
    img.style.visibility = "visible";
    img.style.display = "block";
    img.src = "data:image/jpeg;base64, " + uri;
	var datafile = {
		"file": uri,
		"filename": "mobile.jpg",
		"filepath": "public://" + drupal_user.uid + "/mobile/"
	};
    $.ajax({
      beforeSend: function() { $.mobile.showPageLoadingMsg(); },
      complete: function() { $.mobile.hidePageLoadingMsg() },
      url: restdomain + "/?q=api/rest/file.json",
      type: 'POST',
      data: datafile,
      success: function (data) {
        document.getElementById('fid').value = data.fid;
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) {
        console.log(JSON.stringify(XMLHttpRequest));
        console.log(JSON.stringify(textStatus));
        console.log(JSON.stringify(errorThrown));
      }
    });
  },
  function(e) {
    console.log("Error getting picture: " + e);
    document.getElementById('camera_status').innerHTML = "";
  },
  {
    quality: 50, 
    destinationType: navigator.camera.DestinationType.DATA_URL, 
    sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY
  });
}