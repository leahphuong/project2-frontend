var api = {
  url: 'http://localhost:3000',
  //url: 'http://ttt.wdibos.com',
  ajax: function(config, cb) {
    $.ajax(config).done(function(data, textStatus, jqxhr) {
      cb(null, data);
    }).fail(function(jqxhr, status, error) {
      cb({jqxher: jqxhr, status: status, error: error});
    });
  },

  register: function(credentials, callback) {
    this.ajax({
      method: 'POST',
      url: this.url + '/register',
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify(credentials),
      dataType: 'json'
    }, callback);
  }
}

// curl --include --request POST --header "Content-Type: application/json" -d '{
//   "credentials": {
//     "email": "an@example.email",
//     "password": "an example password",
//     "password_confirmation": "an example password"
//   }
// }' http://localhost:3000/register

