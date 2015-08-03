var myJSON = require('./main.js');
var tests = require('./testLib.js');
var prefix = myJSON.__PREFIX__;
tests.install();
xtest('.stringify()', function() {
    console.log(isEquals(myJSON.stringify([1,2,3]), prefix + '[1,2,3]'));
    console.log(isEquals(myJSON.stringify([1.0,2.1,3.2]), prefix + '[1,2.1,3.2]'));
    console.log(isEquals(myJSON.stringify([NaN,Infinity]), prefix + '[NaN,Infinity]'));
    console.log(isEquals(myJSON.stringify(['hoge','fuga']), prefix + '["hoge","fuga"]'));
    console.log(isEquals(myJSON.stringify(3), prefix + '3'));
    console.log(isEquals(myJSON.stringify(3.1415), prefix + '3.1415'));
    console.log(isEquals(myJSON.stringify(Infinity), prefix + 'Infinity'));
    console.log(isEquals(myJSON.stringify(NaN), prefix + 'NaN'));
    console.log(isEquals(myJSON.stringify('hoge'), prefix + '"hoge"'));
    console.log(isEquals(myJSON.stringify([new Date(2000,0,1)]), prefix + '[Date(1999-12-31T15:00:00.000Z)]'));
    console.log(isEquals(myJSON.stringify(new Date(2000,0,1)), prefix + 'Date(1999-12-31T15:00:00.000Z)'));
});

xtest('.parse()', function() {
    console.log(isEquals(myJSON.parse(prefix + '"hoge"'), 'hoge'));
    console.log(isEquals(myJSON.parse(prefix + '3.14'), 3.14));
    console.log(isEquals(myJSON.parse(prefix + '3'), 3));
    console.log(isEquals(myJSON.parse(prefix + '3.0'), 3));
    console.log(isEquals(myJSON.parse(prefix + '0.3'), 0.3));
    console.log(isEquals(myJSON.parse(prefix + 'Infinity'), Infinity));
    console.log(isEquals(myJSON.parse(prefix + 'NaN'), NaN));
});



// console.log(isEquals(myJSON.parse('[]'), []));
// console.log(isEquals(myJSON.parse('[1]'), [1]));
// console.log(isEquals(myJSON.parse('[1,2,3]'), [1, 2, 3]));
// console.log(isEquals(myJSON.parse('[[1,2],[3,4]]'), [[1, 2], [3, 4]]));
// console.log(isEquals(myJSON.parse('[[[1],[2]],[3,4]]'), [[[1], [2]], [3, 4]]));

xtest('Identify', function() {
    console.log(isEquals(myJSON.parse(myJSON.stringify(3)), 3));
    console.log(isEquals(myJSON.parse(myJSON.stringify(10000)), 10000));
    console.log(isEquals(myJSON.parse(myJSON.stringify(3.14)), 3.14));
    console.log(isEquals(myJSON.parse(myJSON.stringify(Infinity)), Infinity));
    console.log(isEquals(myJSON.parse(myJSON.stringify(NaN)),NaN));
    console.log(isEquals(myJSON.parse(myJSON.stringify('hoge')), 'hoge'));
    console.log(isEquals(myJSON.parse(myJSON.stringify([])), []));
    console.log(isEquals(myJSON.parse(myJSON.stringify([1])), [1]));
    console.log(isEquals(myJSON.parse(myJSON.stringify([1,2,3])), [1,2,3]));
    console.log(isEquals(myJSON.parse(myJSON.stringify([[1,2],[3,4]])), [[1,2],[3,4]]));
    console.log(isEquals(myJSON.parse(myJSON.stringify([[[1],[2]],[3,4]])), [[[1],[2]],[3,4]]));

    console.log(isEquals(myJSON.parse(myJSON.stringify(new Date(2000,0,1))), new Date(2000,0,1)));
    console.log(isEquals(myJSON.parse(myJSON.stringify([new Date(2000,0,1)])), [new Date(2000,0,1)]));
});
