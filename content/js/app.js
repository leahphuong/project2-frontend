var form2object = function(form) {
    //take the form and read the input text with the name
    //property, then form a data object {name: value}
    // data = {email: xxx, password: xxx,
   // password_confirmation: xxx}
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

$(function() {

  $('#register-form-link').on("click", function(e) {
    $("#register-form").delay(100).fadeIn(100);
    $("#login-form").fadeOut(100);
    $('#login-form-link').removeClass('active');
    $(this).addClass('active');
    e.preventDefault();


  });

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
});


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
