var accessToken;

$(document).on('submit', 'form', function(event) {

  event.preventDefault();

  var token = $($("input[type='hidden']")[0]).attr('value');
  var username = $('#username').val();
  var password = $('#password').val()

  // Base64 encode for basic auth.
  oAuthClientCredentials = btoa('1234:sekret');

  // Request a token using ROPC.
  // NOTE: This would normally NOT happen client-side. Just used as an example of a ROPC POST request.
  $.ajax({
    method: 'POST',
    url: 'oauth/access-token',
    data: { username: username, password: password, grant_type: 'password'},
    beforeSend: function (xhr){
      xhr.setRequestHeader('Authorization', "Basic " + oAuthClientCredentials);
    },
    success: function(res) {
      console.log(res);
      accessToken = res.access_token;
    },
    error: function(res) {
      console.log(res);
    }
  });
});

// Example of requesting a protected resource using Bearer token.
$(document).on('click', '#resource', function() {
  $.ajax({
    method: 'GET',
    url: 'protected',
    success: function (res) {
      console.log(res);
    },
    error: function(res) {
      console.log(res);
    },
    beforeSend: function (xhr){
      accessToken ? xhr.setRequestHeader('Authorization', "Bearer " + accessToken) : null;
    },
  })
});
