$(document).ready(function() {

  var csrf = $($("input[type='hidden']")[0]).attr('value');

  $.ajax({
    method: 'POST',
    url: 'http://localhost:8082/new',
    data: { body: 'asdf'},
    headers: {
      'csrf-token': csrf
    }
  });
})
