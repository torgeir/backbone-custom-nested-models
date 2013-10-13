var UserDetailsView = View.extend({

  tagName: 'span',

  initialize: function (options) {
    this.model = options.details;
  },

  bindings: {
    '.js-name': {
      observe: 'name',
      setOptions: Model.silent
    }
  },

  render: function () {
    return this.renderTemplate(
      '<label> Fullname<input class="js-name"></label>');
  }

});

var UserView = View.extend({

  tagName: 'li',

  initialize: function (options) {
    this.model = options.user;
    this.model.on('change', this.render, this);
    this.model.on('destroy', this.remove, this);
  },

  bindings: {
    '.js-user': {
      observe: 'username',
      setOptions: Model.silent
    },
    '.js-age': {
      observe: 'age',
      setOptions: Model.silent,
      onSet: function (val) { return +val; } // as number
    },
    '.js-likes': 'likes'
  },

  render: function () {
    this.renderTemplate(
        '<label> Username<input class="js-user"/></label>' +
        '<label> Age<input class="js-age"/></label>' +
        '<span class="js-likes"></span>'+
        '[<span class="delete" title="Delete">x</span>]');
    this.$el.append(this.renderUserDetailView());
    return this.$el;
  },

  renderUserDetailView: function () {
    var details = this.model.details();
    var view = new UserDetailsView({ details: details });
    return view.render();
  },

  renderLikes: function () {
    return '<p class="js-likes"></p>'
  },

  events: {
    'change input': 'save',
    'click .delete': 'destroy'
  },

  save: function () {
    this.model.save();
  },

  destroy: function () {
    this.model.destroy();
  }

});

var UsersView = View.extend({

  tagName: 'ul',

  initialize: function (options) {
    this.users = options.users;
    this.users.on('add', this.render, this);
  },

  render: function () {
    this.$el.html(
      '<a href="#" class="new-user">Add user</a>');
    this.users.forEach(this.renderUserView, this);
  },

  renderUserView: function (user) {
    var userView = new UserView({ user: user });
    this.$el.append(userView.render());
  },

  events: {
    'click .new-user': 'addUser'
  },

  addUser: function () {
    var users = this.users;
    var user = new User(
        { username: 'User #' + (users.length + 1),
          password: 'test' },
        Model.parse);

    user.save({}, {
      success: function () {
        users.add(user);
      }
    });
  }

});
