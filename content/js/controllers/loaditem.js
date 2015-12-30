function generateGrid(jsonData) {
    var html = '';
    for (var i = 0; i < jsonData.length; i++){
      var item = jsonData[i];
      html += '<div class="col-md-4"><div class="item item-collection" style="background-image: url(';
      if (item.photo_url) {
        html += item.photo_url;
      } else {
        html += 'http://sd.keepcalm-o-matic.co.uk/i/keep-calm-and-stay-gorgeous-51.png';
      }
      html += ');">';
      html += '<div class="item-overlay"></div><div class="item-content"><div class="item-top-content"><div class="item-top-content-inner"><div class="item-product"><div class="item-top-title"><h5>';
      html += item.name;
      html += '</h5><p  class="subdescription">';
      html += item.description;
      html += '</p></div></div></div></div><div class="item-add-content"><div class="item-add-content-inner"><div class="section"></div><div class="section"><a href="#" class="btn btn-primary custom-button green-btn" onclick="updateItem(';
        html += item.id;
        html += ')">Update</a><br/><a href="#" class="btn btn-primary custom-button red-btn" onclick="removeItem(';
        html += item.id;
        html += ')">Remove</a></div></div></div></div></div></div>';
    }
    $('#itemRow').append(html);
  }

  $(function() {
    var collectionCallback = function(errors, data){
      if(errors){
        console.log(errors);
      } else {
        console.log(data);
        generateGrid(data.items);
      }
    };
    var collectionID = getParameterByName("collection");
    api.loadCollection(localStorage.getItem("token"), collectionID, collectionCallback);
  });
