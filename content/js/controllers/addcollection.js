$(function() {
  $('#AddNewCollection').click(function(e) {
    e.preventDefault();
    window.location.href = '/addACollection.html';
  });

  $('#AddCollection').on('submit', function(e){
    e.preventDefault();
      // get data from submit form and wrap them
      var collectionData = wrap("collection", form2object(this));
      console.log(collectionData);
      var addCollectionCallback = function(error, data) {
        if (error) {
          console.log(error);
        } else {
          console.log(data);
          window.location.href = '/closet.html';
        }
      };
      api.addCollection(localStorage.getItem("token"), collectionData, addCollectionCallback);
    });
})
