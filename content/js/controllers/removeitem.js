function removeItem(itemID) {
  // get collection ID from the url
  var collectionID = getParameterByName("collection");
  var reloadPage = function(error, data) {
    if (error) {
      console.log(error);
    } else {
      window.location.reload(true);
    }
  };
  api.removeItem(localStorage.getItem("token"), collectionID, itemID, reloadPage);
}
