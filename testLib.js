function isEquals(a, b) {
    if (a === b) return true;
    if (getType(a) !== getType(b)) return false;
    if (isNaN(a) && isNaN(b)) return true;
    if (isDate(a)) return a.getTime() === b.getTime();
    if (isString(a)) return false;// a !== b
    if (isNumber(a)) return false;
    if (isArray(a)) {
        for (var i = 0, _i = a.length; i < _i; i = 0|i+1) if (!isEquals(a[i], b[i])) return false;
    }
    return true;
}
function isNumber(obj) {return getType(obj) === '[object Number]';};
function isString(obj) {return getType(obj) === '[object String]';};
function isDate(obj) {return getType(obj) === '[object Date]';};
function isArray(arr) {return getType(arr) === '[object Array]';};
function isNaN(obj) {return obj !== obj;};
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
