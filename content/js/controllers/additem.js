$(function() {
  $('#AddNewItem').click(function(e) {
    e.preventDefault();
    localStorage.setItem("collectionID", getParameterByName("collection"));
    window.location.href = '/addAnItem.html';
  });

  $('#AddItem').on('submit', function(e){
    e.preventDefault();
    var itemData = wrap("item", form2object(this));
    console.log(itemData);
    var addItemCallback = function(error, data) {
      if(error) {
        console.log(error);
      } else {
        console.log(data);
      }
    };
    var collectionID = localStorage.getItem("collectionID");
    localStorage.removeItem("collectionID", collectionID);

    var itemID = localStorage.getItem("itemID");
    if (itemID) {
      console.log(itemID);
      localStorage.removeItem("itemID", itemID);
      api.updateItem(localStorage.getItem("token"), collectionID, itemID, itemData, addItemCallback);
    } else {
      api.addItem(localStorage.getItem("token"), collectionID, itemData, addItemCallback);
    }

    window.location.href = '/collection.html?collection=' + collectionID;

  });
})
