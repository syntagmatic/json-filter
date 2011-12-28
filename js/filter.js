var FilterCollection, FilterModel, TransformedModel, filters;

Backbone.sync = function(method, model, options) {
  return options.success(model);
};

TransformedModel = Backbone.Model.extend({
  defaults: {
    data: []
  },
  initialize: function(x) {
    this.update();
    return this.get('funcModel').bind("all", this.update, this);
  },
  update: function() {
    return this.set({
      data: this.get('funcModel')[this.get('func')](this.get('dataModel').get('data'))
    });
  }
});

FilterModel = Backbone.Model.extend({
  defaults: {
    check: function() {
      return true;
    }
  },
  check: function(val) {
    return this.get('check')(val);
  }
});

FilterCollection = Backbone.Collection.extend({
  model: FilterModel,
  check: function(val) {
    var ret;
    ret = true;
    this.each(function(model) {
      if (!model.check(val)) return ret = false;
    });
    return ret;
  },
  filter: function(list) {
    var _this = this;
    return _(list).filter(function(val) {
      return _this.check(val);
    });
  }
});

filters = {
  range: function(min, max, inclusive) {
    if (inclusive == null) inclusive = "both";
    if (inclusive === "both") {
      return function(val) {
        return (min <= val && val <= max);
      };
    } else if (inclusive === "right") {
      return function(val) {
        return (min < val && val <= max);
      };
    } else if (inclusive === "left") {
      return function(val) {
        return (min <= val && val < max);
      };
    } else {
      return function(val) {
        return (min < val && val < max);
      };
    }
  },
  include: function(list) {
    return function(val) {
      return _.contains(list, val);
    };
  },
  exclude: function(list) {
    return function(val) {
      return !_.contains(list, val);
    };
  }
};
