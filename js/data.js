// Random data in a homogenous map list
var data = _(_.range(100)).map(function(d,i) {
  return {
    a: 100*Math.random(),
    b: 100*Math.random(),
    c: 100*Math.random(),
    d: 100*Math.random(),
    e: 100*Math.random()
  }
});
