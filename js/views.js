var GridView;

GridView = Backbone.View.extend({
  template: _.template("<tr><td><%= a %></td><td><%= b %></td><td><%= c %></td><td><%= d %></td><td><%= e %></td></tr>"),
  initialize: function() {
    return this.model.bind('all', this.render, this);
  },
  render: function() {
    var html,
      _this = this;
    html = "";
    _.each(this.model.get('data'), function(d, i) {
      return html += _this.template(d);
    });
    this.el.html(html);
    return this;
  }
});
