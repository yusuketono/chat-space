$(document).on('turbolinks:load', function() {
  $('#new_message').on(`submit`,function(e){
    e.preventDefault();
    var message =new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url:url,
      type:'POST',
      datatype:`json`,
      processData:false,
      contentType:false
    })
  })
});