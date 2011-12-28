var chars, data, randomLetter, randomWord;

chars = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

randomLetter = function() {
  return chars[Math.floor(Math.random() * 26)];
};

randomWord = function() {
  var i, word, _ref;
  word = "";
  for (i = 0, _ref = Math.floor(Math.random() * 10); 0 <= _ref ? i <= _ref : i >= _ref; 0 <= _ref ? i++ : i--) {
    word += randomLetter();
  }
  return word;
};

data = _(_.range(100)).map(function(d, i) {
  return {
    a: randomWord(),
    b: 100 * Math.random(),
    c: randomWord(),
    d: randomWord(),
    e: 100 * Math.random()
  };
});
