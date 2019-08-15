$(document).on('turbolinks:load', function() {
  function buildHTML(message) {
    var content = (message.content) 
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

  function scrollBottom(){
    var target = $('.message').last();
    var position = target.offset().top + $('.messages').scrollTop();
    $('.messages').animate({
      scrollTop: position
    }, 300, 'swing');
  };

  $('#new_message').on(`submit`,function(e){
    e.preventDefault();
    console.log(this)
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
      scrollBottom();
      $('#new_message')[0].reset();      
    })
    .fail(function(data){
      alert('エラーが発生したためメッセージは送信できませんでした。');
    })
    .always(function(data){
      $('.submit-btn').prop('disabled', false);　//ここで解除している
    })
  })
  
  var reloadMessages = function() {
    if (window.location.href.match(/\/groups\/\d+\/messages/)){
      var last_message_id = $('.message:last').data('id');
      $.ajax({
        url: "api/messages",
        type: 'get',
        dataType: 'json',
        data: {id: last_message_id}
        })

      .done(function(messages) {
        var HTML = '';
        messages.forEach(function(message){
          HTML = buildHTML(message);
          $('.messages').append(HTML);
          scrollBottom();
        })
      })
      .fail(function() {
        alert('error');
      })
    }
  }
  setInterval(reloadMessages, 5000);   
});