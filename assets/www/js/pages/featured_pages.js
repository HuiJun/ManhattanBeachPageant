$(document).delegate("#page_featured_pages", "pageshow", function() {
  if(!featured_list) {
    $.mobile.showPageLoadingMsg();
  }
  try {
    $.ajax({
      complete: function() { $.mobile.hidePageLoadingMsg() },
      url: restdomain + "/?q=featured-list",
      type: 'get',
      dataType: 'json',
      error: function (XMLHttpRequest, textStatus, errorThrown) {
        alert('Failed to Retrieve Pages');
        console.log(JSON.stringify(XMLHttpRequest));
        console.log(JSON.stringify(textStatus));
        console.log(JSON.stringify(errorThrown));
      },
      success: function (data) {
        //if(featured_list != data) {
          featured_list = data;
          $("#page_featured_pages_list").html("");
          $.each(data.nodes,function (node_index,node_value) {
            console.log(JSON.stringify(node_value));
            $("#page_featured_pages_list").append($("<li></li>",{"html":"<a href='#page_nodel_view' id='" + node_value.node.nid + "' class='page_featured_pages_list_title' data-transition='slide'>" + node_value.node.title + "</a>"}));
          });
          
        //}
        $("#page_featured_pages_list").listview("refresh");
      }
    });
  }
  catch (error) { alert(error); }
});
$(document).delegate("a.page_featured_pages_list_title", "click", function() {
  nid = $(this).attr('id'); // set the global nid to the node that was just clicked
});