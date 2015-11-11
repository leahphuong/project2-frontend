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
  },
  login: function(credentials,callback) {
    this.ajax({
      method: 'PATCH',
      url: this.url + '/login',
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify(credentials),
      dataType: 'json'
    }, callback);
  },
  loadCloset: function(token, callback) {
    this.ajax({
      method: 'GET',
      url: this.url + '/collections',
      contentType: 'application/json',
      headers: {
        'Authorization': 'Token token="' + token + '"'
      },
      dataType: 'json'
    }, callback);
  },
  loadCollection: function(token, collectionID, callback) {
    this.ajax({
      method: 'GET',
      url: this.url + '/collections/' + collectionID + '/items',
      contentType: 'application/json',
      headers: {
        'Authorization': 'Token token="' + token + '"'
      },
      dataType: 'json'
    }, callback);
  },

  addItem: function(token, collectionID, itemData, callback) {
    this.ajax({
      method: 'POST',
      url: this.url + '/collections/' + collectionID + '/items',
      contentType: 'application/json; charset=utf-8',
      headers: {
        'Authorization': 'Token token="' + token + '"'
      },
      data: JSON.stringify(itemData),
      dataType: 'json'
    }, callback);
  },
  updateItem: function(token, collectionID, itemID,itemData, callback) {
    this.ajax({
      method: 'POST',
      url: this.url + '/collections/' + collectionID + '/items',
      contentType: 'application/json; charset=utf-8',
      headers: {
        'Authorization': 'Token token="' + token + '"'
      },
      data: JSON.stringify(itemData),
      dataType: 'json'
    }, callback);
  },


};
