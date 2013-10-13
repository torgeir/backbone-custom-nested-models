backbone-custom-nested-models
=============================

An example project showing how little is required to have backbone support nested models and collections.

How do I use it?
---

With a REST-endpoint returning data similar to 

```
[
  {
    "age":29,
    "details": { "name":"Person 1", "email":"email-1@gmail.com" }, 
    "likes": [{ "post": 1 }, { "post": 2 }, { "post": 3 }], 
    "username": "person-1", 
    "id":"9779bf3e14f3a84a"
  },
  {
    "age":29,
    "details": { "name":"Person 2", "email":"email-2@gmail.com" }, 
    "likes": [{ "post": 2 }, { "post": 3 }, { "post": 4 }], 
    "username": "person-2", 
    "id":"9779bf3e14f3a84b"
  },
  ..
]
```

..supporting a nested model UserDetails for `details` and a nested collection Likes for `likes` is as easy as


```
var Like = Model.extend({});

var Likes = Collection.extend({
  model: Like
});

var UserDetails = Model.extend({});

var User = Model.extend({

  nest: {
    details: UserDetails,
    likes: Likes
  }
  
});
```

How?
---

A couple of methods in your base model. These ~8 lines is what makes it work: https://github.com/torgeir/backbone-custom-nested-models/blob/master/base.js#L32-L39
