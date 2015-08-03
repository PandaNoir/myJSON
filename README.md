myJSON
====
myJSON is JSON library which supports Date, Function and other JavaScript Objects.

##Description
myJSON uses unique JSON format, so it cannot be parsed by original JSON.
This JSON format cannot be used in other languages. So it's no use makeing json file with string created by myJSON.

(NOTE: myJSON supports only Date Object yet.)

##Demo
Object below can be stringified and the stringified string can be parsed.
For example, `new Date(2000,0,1);` will be changed into `'Date(1999-12-31T15:00:00.000Z)'`.

##Usage
You can use myJSON as if it is JSON. For instance, myJSON.stringify() behaves as JSON.stringify(). myJSON also has .parse() method.
