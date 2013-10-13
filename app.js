var $el = $('.container');

var users = new Users();
users.fetch(Model.reset);

users.on('reset', function () {
  var usersView = new UsersView({ users: users });
  usersView.setElement($el);
  usersView.render();
});
