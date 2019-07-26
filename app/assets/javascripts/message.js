$(document).on('turbolinks:load', function() {
  $('#new_message').on(`submit`,function(e){
    e.preventDefault();
    var message =new FormData(this);
    // console.log(this)
    var url = $(this).attr('action')
    $.ajax({
      url:url,
      type:'POST',
      data: message,
      dataType:`json`,
      processData: false,
      contentType: false
    })
   })
 });
