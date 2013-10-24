$(document).delegate("#page_event_view", "pageshow", function() {
  $('#map_canvas').height($('#map_canvas').width());
  try {
    $.ajax({
      beforeSend: function() { $.mobile.showPageLoadingMsg(); },
      complete: function() { $.mobile.hidePageLoadingMsg() },
      url: restdomain + "/?q=api/rest/node/" + encodeURIComponent(nid) + ".json",
      type: 'get',
      dataType: 'json',
      error: function (XMLHttpRequest, textStatus, errorThrown) {
        console.log(JSON.stringify(XMLHttpRequest));
        console.log(JSON.stringify(textStatus));
        console.log(JSON.stringify(errorThrown));
      },
      success: function (data) {
        console.log(JSON.stringify(data));
        if(data.field_logo.und) {
          var logo = data.field_logo.und[0].uri;
        } else {
          var logo = '';
        }
        if(data.field_venue_name.und) {
          $.ajax({
            url: restdomain + "/?q=api/rest/taxonomy_term/" + encodeURIComponent(data.field_venue_name.und[0].tid) + ".json",
            type: 'get',
            dataType: 'json',
            success: function (term) {
              var venue = term.name;
              if(venue != data.field_address.und[0].thoroughfare) {
                $('.address-field').append(venue);
              }
            }
          });
        }
        if(data.field_address.und) {
          var address = '<p><h4>Address: </h4><div class="address-field"></div><div>' + data.field_address.und[0].thoroughfare + '</div><div>' + data.field_address.und[0].premise + '</div><div>' + data.field_address.und[0].locality + ', ' + data.field_address.und[0].administrative_area + ' ' + data.field_address.und[0].postal_code + '</div></p>';
        } else {
          var address = '';
        }
        if(data.field_date.und) {
          var datetime = '<p><h4>Time: </h4><div>' + moment(data.field_date.und[0].value + ' +0000').format("dddd, MMMM Do YYYY, h:mm:ss a") + '</div></p>';
        } else {
          var datetime = '';
        }
        if(data.field_geo.und) {
          var mapdata = { destination: new google.maps.LatLng(data.field_geo.und[0].lat, data.field_geo.und[0].lon) };
          $('#map_canvas').gmap({
            'zoom' : 14,
            'mapTypeControl' : false,
            'navigationControl' : false,
            'streetViewControl' : false,
            'zoomControl': true,
            'zoomControlOptions': {
              'position': google.maps.ControlPosition.TL,
              'style': google.maps.ZoomControlStyle.SMALL
            }
          });
          $('#map_canvas').gmap('get', 'map').setCenter(mapdata.destination); 
          $('#map_canvas').gmap('addMarker', { 'position':  mapdata.destination, 'bounds': false }).click(function() {
            $('#map_canvas').gmap('openInfoWindow', { 'content': 'You are about here now ..' }, this);
          });
          
        } else {
          $('#map_canvas').empty();
        }
        $('#page_event_view h1').html(data.title); // set the header title
        $('#page_event_view .inner-content').html('<p><img src="' + restdomain + '/sites/' + domainname + '/files/'+ logo.substring(9) + '" style="width: 30%; float:left; margin: 5px 10px 5px 0px" />' + data.body.und[0].safe_value + '</p>' + datetime + address); // display the body in the content div
      }
    });
  }
  catch (error) { alert(error); }
});