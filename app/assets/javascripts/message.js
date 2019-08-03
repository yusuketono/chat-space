$(document).on('turbolinks:load', function() {
  function buildHTML(message) {
    var content = message.content
    var image = message.image ? `<img src= ${ message.image }>` : "";
    var html = `<div class="message" data-id="${message.id}">
                  <div class="message__upper">
                    <p class="message__upper__talker">
                      ${message.user_name}
                    </p>
                    <p class="message__upper__date">
                      ${message.date}
                    </p>
                  </div>
                  <div class="message__text">
                    <p class="lower-massage__content">
                    ${content}
                    </p>
                    ${image}
                  </div>
                </div>`
  return html;
  }
  $('#new_message').on(`submit`,function(e){
    e.preventDefault();
    var message = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url:url,
      type:'POST',
      data: message,
      dataType:`json`,
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html);
      $('#new_message')[0].reset();  
      var target = $('.message').last();
      var position = target.offset().top + $('.messages').scrollTop();
      $('.messages').animate({
        scrollTop: position
      }, 300, 'swing');
      })
    .fail(function(data){
      alert('エラーが発生したためメッセージは送信できませんでした。');
    })
    .always(function(data){
      $('.submit-btn').prop('disabled', false);　//ここで解除している
    })
  })   
});
