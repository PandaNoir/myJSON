var myJSON = {};
var prefix = 'MYJSON';
var Parsimmon = require('Parsimmon');
Parsimmon.Parser.prototype.optional = function() {
    return this.times(0,1);
};
var string = Parsimmon.string;
var seq = Parsimmon.seq;
var alt = Parsimmon.alt;
var regex = Parsimmon.regex;
myJSON.stringify = function(obj, nest) {
    nest = nest || 0;
    var res = '';
    if (isNumber(obj)){
        res = obj.toString(10);
    }else if (isString(obj)){
        res = '"' + obj + '"';
    }else if (isDate(obj)){
        res = 'Date(' + obj.toISOString() + ')';
    }else if (isArray(obj)) {
        for (var i = 0, _i = obj.length, string = new Array(_i); i < _i; i = 0|i+1) {
            string[i] = myJSON.stringify(obj[i], nest + 1);
        }
        res = '[' + string.join(',') + ']';
    }
    if (nest === 0){
        return prefix + res;
    }else{
        return res;
    }
};
myJSON.parse = function(s) {
    s = s.slice(prefix.length);
    var join = function(_) {return _.join('')};
    var Any = Parsimmon.lazy(function(){
        return alt(_Array, _Object, _Number, _String, _Date);
    });
    var _Array = seq(
            string('['), seq(
                Any,
                seq(string(','), Any).map(function(_){
                    return _[1];
                }).many()
            ).optional(), string(']')
        ).map(function(_) {
            if (_[1].length === 0) {
                return [];
            }
            return [_[1][0][0]].concat(_[1][0][1]);
        });
    var _Object = seq(string('{'), seq(_String,string(':'), Any).many(), string('}'));
    var _Number = alt(
            string('Infinity').result(Infinity),
            string('NaN').result(NaN),
            seq(
                alt(string('0'),regex(/[1-9][0-9]*/)),
                seq(string('.'), Parsimmon.digit.many().map(join)).map(function(_){return _[1]}).optional()
            ).map(function(_){
                var n = parseInt(_[0], 10);
                if (_[1].length > 0) {
                    n += parseFloat('0.' + _[1][0], 10);
                }
                return n;
            })
        );
    var _String = alt(seq(string('"'),regex(/(?:\\.|[^"])*/),string('"'))).map(function(_){return _[1];});
    var YYYY = Parsimmon.digit.times(4).map(join);
    var MM = regex(/0[1-9]|1[12]/);
    var DD = regex(/[012][1-9]|[123]0|31/);
    var HH = regex(/[01]\d|2[1-4]/);
    var mm = regex(/[0-5]\d/);
    var ss = mm;
    var sss = Parsimmon.digit.times(3).map(join);
    var Z = alt(string('Z'), seq(Parsimmon.oneOf('+-'), HH, string(':'), mm));
    var _Date = seq(string('Date'), string('('), YYYY, string('-'), MM, string('-'), DD, string('T'), HH, string(':'), mm, string(':'), ss, string('.'), sss, Z, string(')')).map(function(_){
        var date = new Date(_.slice(2,-1).join(''));
        return date;
    });//YYYY-MM-DDTHH:mm:ss.sssZ
    // console.log(JSON.stringify(_String.parse('"hoge"').value === 'hoge'));
    // console.log(JSON.stringify(_Number.parse('3.14').value === 3.14));
    // console.log(JSON.stringify(_Number.parse('3').value === 3));
    // console.log(JSON.stringify(_Number.parse('3.0').value === 3));
    // console.log(JSON.stringify(_Number.parse('0.3').value === 0.3));
    // console.log(JSON.stringify(_Number.parse('Infinity').value === Infinity));
    // console.log(JSON.stringify(isNaN(_Number.parse('NaN').value)));
    // console.log(JSON.stringify(_Array.parse('[]').value));
    // console.log(JSON.stringify(_Array.parse('[1]').value));
    // console.log(JSON.stringify(_Array.parse('[1,2,3]').value));
    // console.log(JSON.stringify(_Array.parse('[[1,2],[3,4]]').value));
    // console.log(JSON.stringify(_Array.parse('[[[1],[2]],[3,4]]').value));
    return Any.parse(s).value;
};
function isNumber(obj) {return getType(obj) === '[object Number]';};
function isString(obj) {return getType(obj) === '[object String]';};
function isDate(obj) {return getType(obj) === '[object Date]';};
function isArray(arr) {return getType(arr) === '[object Array]';};
function isNaN(obj) {return obj !== obj;};
function getType(obj) {return Object.prototype.toString.apply(obj);};
module.exports = myJSON;
module.exports.__PREFIX__ = prefix;
