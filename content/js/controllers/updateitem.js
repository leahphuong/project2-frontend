function updateItem(itemID) {
  localStorage.setItem("collectionID", getParameterByName("collection"));
  localStorage.setItem("itemID", itemID);
  window.location.href = '/addAnItem.html';
}
