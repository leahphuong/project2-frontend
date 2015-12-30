function generateGrid(jsonData) {
    var html = '';
    for (var i = 0; i < jsonData.length; i++) {
      var collection = jsonData[i];
      html += '<div class="col-lg-4 col-sm-4"><div class="team-member"><figure class="profile-pic"><img src="';
      if (collection.photo_url) {
        html += collection.photo_url;
      } else {
        html += '../images/keepcalm.png';
      }
      html += '" alt=""></figure><div class="member-details"><a href="';
      html += '/collection.html?collection=' + collection.id;
      html += '"><h5 class="dark-text red-border-bottom">';
      html += collection.name;
      html += '</h5></a><div class="position">';
      html += collection.description;
      html += '</div></div><div class="details"><p>Welcome back gorgeous!</p></div></div></div>';
    }
    $("#collectionRow").append(html);
  }

  $(function() {
    var closetCallback = function(errors, data){
      if(errors){
        console.log(errors);
      } else {
        generateGrid(data.collections);
      }
    };
    api.loadCloset(localStorage.getItem("token"), closetCallback);
  });
