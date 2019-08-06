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
    search_list.append(html);
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

  
});