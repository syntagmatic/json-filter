# JSON Filter
# Copyright 2010 Kai Chang and Mary Becica

# Stub out sync, pass along model
Backbone.sync = (method, model, options) ->
  options.success(model)

# Highlight Model

# Filtered Data Model
TransformedModel = Backbone.Model.extend
  defaults:
    data: []
  initialize: (x) ->
    @update()
    @get('funcModel').bind("all", @update, @)
  update: ->
    @set data: @get('funcModel')[@get('func')](@get('dataModel').get('data'))
    
# Filter Model
FilterModel = Backbone.Model.extend
  defaults:
    check: -> true
  check: (val) ->
    # shortcut to apply filter
    @get('check')(val)

FilterCollection = Backbone.Collection.extend
  model: FilterModel
  check: (val) ->
    ret = true
    @.each (model) ->
      if not model.check(val)
        ret = false
    ret
  filter: (list) ->
    _(list).filter (val) =>
      @.check(val)

# Example filters
filters =
  range: (min, max, inclusive = "both") ->
    if inclusive is "both"
      (val) -> min <= val <= max
    else if inclusive is "right"
      (val) -> min < val <= max
    else if inclusive is "left"
      (val) -> min <= val < max
    else
      (val) -> min < val < max
  include: (list) ->
    (val) -> _.contains(list, val)
  exclude: (list) ->
    (val) -> not _.contains(list, val)

