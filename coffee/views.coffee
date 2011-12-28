GridView = Backbone.View.extend
  template: _.template("<tr><td><%= a %></td><td><%= b %></td><td><%= c %></td><td><%= d %></td><td><%= e %></td></tr>")
  initialize: ->
    @model.bind('all', @render, @)
  render: ->
    html = ""
    _.each(@model.get('data'), (d, i) =>
      html += @template(d)
    )
    @el.html(html)
    return @ 
