var Like = Model.extend({
  post: function () { return this.get('post'); }
});
Like.asPost = function (like) {
  return like.post();
};

var Likes = Collection.extend({

  model: Like,

  toString: function () {
    return this.map(Like.asPost).join(', ');
  }
});

var UserDetails = Model.extend({

});

var User = Model.extend({

  nest: {
    details: UserDetails,
    likes: Likes
  },

  urlRoot: 'users',

  initialize: function () {
    this.proxyEvent('change', this.details());
  },

  details: function () { return this.get('details'); },
  likes:   function () { return this.get('likes'); }

});

var Users = Collection.extend({
  model: User,
  url: 'users'
});

