
$(function() {

  $('#register-form-link').on("click", function(e) {
    $("#register-form").delay(100).fadeIn(100);
    $("#login-form").fadeOut(100);
    $('#login-form-link').removeClass('active');
    $(this).addClass('active');
    e.preventDefault();


  });
  //take the form and read the input text with the name
  //property, then form a data object {name: value}
  // data = {email: xxx, password: xxx,
  // password_confirmation: xxx}
  var form2object = function(form) {
    var data = {};
    $(form).find("input").each(function(index, element) {
      var type = $(this).attr('type');
      if ($(this).attr('name') && type !== 'submit' && type !== 'hidden') {
        data[$(this).attr('name')] = $(this).val();
      }
    });
    return data;
  };

  // {"credentials": {email: xxx, password: xxx, password_confirmation: xxx} }
  var wrap = function wrap(root, formData) {
    var wrapper = {};
    wrapper[root] = formData;
    return wrapper;
  };
  $('#register-form').on('submit',function(e){
    e.preventDefault();
    var credentials = wrap("credentials", form2object(this));
    console.log(credentials);
    var displayMsg = function(errors, data){
      if(errors){
        console.log(errors);
      } else {
        console.log('success');
        console.log(data);
      }
    };
    api.register(credentials, displayMsg);

  });
  $('#login-form-link').on("click", function(e) {
    $("#login-form").delay(100).fadeIn(100);
    $("#register-form").fadeOut(100);
    $('#register-form-link').removeClass('active');
    $(this).addClass('active');
    e.preventDefault();
  });

  $('#login-form').on('submit',function(e){
    e.preventDefault();
    var credentials = wrap("credentials", form2object(this));

    var loginCallback = function(error, data){
      if(error){
        console.log(error);
      } else {
        console.log('success');
          // retrieve token after login successfully and
          // assign it to token.
          localStorage.setItem("token", data.user.token);
          localStorage.setItem("userID", data.user.id);
          // load closet page after user login succeeded.
          window.location.href = '/closet.html';
        }
      };
      api.login(credentials, loginCallback);

    });

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
});

function updateItem(itemID) {
  localStorage.setItem("collectionID", getParameterByName("collection"));
  localStorage.setItem("itemID", itemID);
  window.location.href = '/addAnItem.html';
}

function removeItem(itemID) {
  var collectionID = localStorage.getItem("collectionID", getParameterByName("collection"));
  var reloadPage = function(error, data) {
    if (error) {
      console.log(error);
    } else {
      window.location.reload(true);
    }
  };
  api.removeItem(localStorage.getItem("token"), collectionID, itemID, reloadPage);
}

function logOut() {
  var logOut = function(error, data){
    if(error){
      console.log(error);
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("userID");
      window.location.href = 'index.html';
    }
  }
  api.logout(localStorage.getItem("token"),localStorage.getItem("userID"), logOut);

}

function getParameterByName(name) {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
  results = regex.exec(location.search);
  return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
