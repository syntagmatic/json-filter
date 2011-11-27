# JSON Filter
# Copyright 2010 Kai Chang

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

# Stub out sync, pass along model
Backbone.sync = (method, model, options) ->
  options.success(model)

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
