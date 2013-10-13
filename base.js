var View = Backbone.View.extend({

  renderTemplate: function (html) {
    this.$el.html(html);
    this.stickit();
    return this.$el;
  }

});

var Model = Backbone.Model.extend({

  parse: function (data) {
    this.parseNestedModels(data);
    return data;
  },

  /** Parse each property of this.nest as a nested Model */
  parseNestedModels: function (data) {
    var nest = this.nest;
    for (var attr in nest)
      if (nest.hasOwnProperty(attr))
        this.initOrUpdateNestedModel(attr, nest[attr], data);
  },

  /** Initializes or updates existing Model with new data,
   *  calling parse if the model again requires parsing */
  initOrUpdateNestedModel: function (attr, Model, data) {
    var modelData = data[attr],
        existingModel = this.get(attr);

    if (existingModel) {
      var submodel = existingModel.parse(modelData);
      existingModel.set(submodel);
      delete data[attr];
    }
    else {
      data[attr] = new Model(modelData, { parse: true });
    }
  },

  /** toJSON handling nested models */
  toJSON: function () {
    var json = Backbone.Model.prototype.toJSON.call(this);

    for (var attr in json)
      if (typeof json[attr].toJSON == 'function')
        json[attr] = json[attr].toJSON();

    return json;
  },


  /** proxy/bubble events from submodel */
  proxyEvent: function (event, model) {
    model.on(event, function (model) { this.trigger(event, model); }, this);
  }

});
Model.silent = { silent: true };
Model.reset  = { reset: true };
Model.parse  = { parse: true };

var Collection = Backbone.Collection.extend({});
