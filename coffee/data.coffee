# Random data in a homogenous map list
chars = [
  "a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"
]

randomLetter = ->
  return chars[Math.floor(Math.random()*26)] 

randomWord = ->
  word = ""
  for i in [0..Math.floor(Math.random()*10)] 
    word += randomLetter()
  return word

data = _(_.range(100)).map (d,i) -> 
  return {
    a: randomWord(), 
    b: 100*Math.random(),
    c: randomWord(),
    d: randomWord(),
    e: 100*Math.random(),
  }
