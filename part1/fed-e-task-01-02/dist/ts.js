"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var hello1 = function (name) {
    console.log("Hello," + name);
};
hello1('TypeScript');
// 基本类型
var a = 'foobar';
var b = 100; //Nan Infinity
var c = true; //false
var e = undefined;
var f = null;
var g = undefined;
// ts.config "lib": ["ES2015", "DOM"]
var h = Symbol();
// 对象
var foo = function () { }; //[]//{}
var obj = { foo: 123, bar: 'string' };
// 数组
var arr1 = [1, 2, 3];
var arr2 = [1, 2, 3];
// 元组：固定长度和类型
var tuple = [18, 'zce'];
var post = {
    title: 'Hello TypeScript',
    content: 'TypeScript is a typed superset of JavaScript',
    status: 0 /* Draft */ //0|1|2
};
// 函数类型
function func1(a, b) {
    if (b === void 0) { b = 10; }
    var rest = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        rest[_i - 2] = arguments[_i];
    }
    return 'func1';
}
func1(100, 200, 300);
var func2 = function (a, b) {
    return 'func2';
};
// any 默认类型(弱类型，动态类型:不做类型检查)
function stringify(value) {
    return JSON.stringify(value);
}
stringify('string');
stringify(100);
stringify(true);
//类型断言
var nums = [110, 120, 119, 112];
var res = nums.find(function (i) { return i > 0; });
var num1 = res;
var num2 = res; //JSX下不能使用
function printPost(post) {
    console.log(post.title);
    console.log(post.content);
}
printPost({
    title: 'Hello TypeScript',
    content: 'TypeScript is a typed superset of JavaScript',
    summary: 'A'
});
var cache = {};
cache.foo = 'value1';
cache.var = 'value2';
// class
var Person = /** @class */ (function () {
    function Person(name, age) {
        this.name = name;
        this.age = age;
        this.gender = true;
    }
    Person.prototype.sayHi = function (msg) {
        console.log("I am " + this.name + "," + msg);
    };
    return Person;
}());
var Student = /** @class */ (function (_super) {
    __extends(Student, _super);
    function Student(name, age) {
        var _this = _super.call(this, name, age) || this;
        console.log(_this.gender);
        return _this;
    }
    return Student;
}(Person));
//# sourceMappingURL=ts.js.map