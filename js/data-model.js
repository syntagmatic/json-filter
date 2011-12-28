var DataModel, detectCols, detectTypes;

Backbone.sync = function(method, model, options) {
  return options.success(model);
};

DataModel = Backbone.Model.extend({
  defaults: {
    data: [],
    cols: [],
    types: []
  },
  initialize: function(x) {
    var cols, data, types;
    data = x.data, cols = x.cols, types = x.types;
    if (data.length > 0) {
      if (_.isEmpty(cols)) {
        cols = detectCols(data);
        this.set({
          cols: cols
        });
      }
      if (_.isEmpty(types)) {
        types = detectTypes(data);
        return this.set({
          types: types
        });
      }
    }
  }
});

detectCols = function(data) {
  return _(data[0]).keys();
};

detectTypes = function(data) {
  return _(data[0]).map(function(v, k) {
    return typeof v;
  });
};
