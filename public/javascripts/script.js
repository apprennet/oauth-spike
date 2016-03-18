$(document).on('submit', 'form', function(event) {

  event.preventDefault();

  var token = $($("input[type='hidden']")[0]).attr('value');
  var username = $('#username').val();
  var password = $('#password').val()

  $.ajax({
    method: 'POST',
    url: 'http://localhost:8082/login',
    data: { username: username, password: password, clientToken: token},
  });
});
