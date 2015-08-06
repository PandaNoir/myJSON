function isEquals(a, b) {
    if (a === b) return true;
    if (getType(a) !== getType(b)) return false;
    if (isNaN(a) && isNaN(b)) return true;
    if (isDate(a)) return a.getTime() === b.getTime();
    if (isString(a)) return false;// a !== b
    if (isNumber(a)) return false;
    if (isRegExp(a)) return a.toString() === b.toString();
    if (isArray(a)) {
        for (var i = 0, _i = a.length; i < _i; i = 0|i+1) if (!isEquals(a[i], b[i])) return false;
    }
    if (isObject(a)) {
        for (var key in a) if(!isEquals(a[key], b[key])) return false;
        // B can have a property A don't have. So loop below is necessary.
        for (var key in b) if(!isEquals(a[key], b[key])) return false;
    }
    return true;
}
function isArray(arr) {return getType(arr) === '[object Array]';};
function isBoolean(obj) {return getType(obj) === '[object Boolean]'};
function isDate(obj) {return getType(obj) === '[object Date]';};
function isFunction(obj) {return getType(obj) === '[object Function]'};
function isNaN(obj) {return obj !== obj;};
function isNumber(obj) {return getType(obj) === '[object Number]';};
function isObject(obj) {return getType(obj) === '[object Object]'};
function isRegExp(obj) {return getType(obj) === '[object RegExp]'};
function isString(obj) {return getType(obj) === '[object String]';};
function isNull(obj) {return getType(obj) === '[object Null]'};
function isUndefined(obj) {return getType(obj) === '[object Undefined]'}

function getType(obj) {return Object.prototype.toString.apply(obj);};
function install() {
    global.isEquals = isEquals;
    global.xtest = function() {};
    global.test = function(name, f) {
        f();
    };
};
module.exports = {
    install:install
};
