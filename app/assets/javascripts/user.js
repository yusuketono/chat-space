$(document).on('turbolinks:load', function() { 
  var search = $("#user-search-result");

  function appendUser(user) {
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user.name}</p>
                  <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
                </div>`
    search.append(html);
  }

  function appendNoUser(user){
    var html = `<div class = "chat-group-user clearfix">${user}</div>`
    search.append(html);
  }

  function addUser(name,user_id) {
    var html = `<div class='chat-group-user clearfix js-chat-member' id="chat-group-user-${user_id}">
                  <input name="group[user_ids][]" type="hidden" value="${user_id}">
                  <p class="chat-group-user__name">${name}</p>
                  <a class="user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn data-user-id=${user_id} data-user-name=${name}"> 削除</a>
                </div>`
    $("#chat-group-users").append(html);
  }

  $('#user-search-field').on('input',function(e){
    e.preventDefault(); 
    var input = $('#user-search-field').val();
    $.ajax({
      url: '/users',
      type: 'GET',
      data: { keyword: input },
      dataType: 'json',
    })
    .done(function(users) {    
      search.empty();
       if (users.length !== 0) {
        users.forEach(function(user){
          appendUser(user);
        });
      }
      else {
        appendNoUser("一致するユーザーはいません");
      }
    })
    .fail(function() {
      alert('ユーザー検索に失敗しました');
    })
  }); 

  $("#user-search-result").on("click", ".chat-group-user__btn--add", function(e){
    var name = $(this).data("user-name");
    var user_id = $(this).data("user-id");
    addUser(name,user_id);
    $(this).parent().remove();
  });

  $("#chat-group-users").on("click", ".js-remove-btn", function(e){
    $(this).parent().remove();
  });
});