var FilterCollection, FilterModel, filters;
var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
Backbone.sync = function(method, model, options) {
  return options.success(model);
};
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
      if (!model.check(val)) {
        return ret = false;
      }
    });
    return ret;
  },
  filter: function(list) {
    return _(list).filter(__bind(function(val) {
      return this.check(val);
    }, this));
  }
});
filters = {
  range: function(min, max, inclusive) {
    if (inclusive == null) {
      inclusive = "both";
    }
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