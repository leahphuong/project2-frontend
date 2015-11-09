// function loginVisibility(type) {
//   if (type == "forgot") {
//     $("#LoginForm").css("display", "none");
//     $("#RegistrationForm").css("display", "none");
//     $("#ForgotPasswordForm").css("display", "block");
//   } else if (type == "register") {
//     $("#LoginForm").css("display", "none");
//     $("#RegistrationForm").css("display", "block");
//     $("#ForgotPasswordForm").css("display", "none");
//   } else {
//     $("#LoginForm").css("display", "block");
//     $("#RegistrationForm").css("display", "none");
//     $("#ForgotPasswordForm").css("display", "none");
//   }
// }
$(function() {

  $('#login-form-link').on("click", function(e) {
    $("#login-form").delay(100).fadeIn(100);
    $("#register-form").fadeOut(100);
    $('#register-form-link').removeClass('active');
    $(this).addClass('active');
    e.preventDefault();
  });

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

  $('#register-form').on('submit',function(){

    var credentials = wrap("credentials", form2object(this));


    var displayMsg = function(errors){
      if(errors){
        console.log(errors);
      } else {
        console.log('success');
      }
    };
    api.register(credentials, displayMsg);

  });
});

