# Data Model
# Copyright 2010 Kai Chang

# Stub out sync, pass along model
Backbone.sync = (method, model, options) ->
  options.success(model)

DataModel = Backbone.Model.extend
  defaults:
    data: [],
    cols: [],
    types: []
  initialize: (x) ->
    {data, cols, types} = x
    if data.length > 0
      if _.isEmpty cols
        cols = detectCols data
        @set cols: cols
      if _.isEmpty types
        types = detectTypes data
        @set types: types

# col names from first data point
detectCols = (data) ->
  _(data[0]).keys()

# col types from first data point
detectTypes = (data) ->
  _(data[0]).map (v,k) -> typeof v
