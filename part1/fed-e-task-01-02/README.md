# Part1-2 作业

( 请在当前文件直接作答 )

## 简答题

### 1. 请说出下列最终执行结果，并解释为什么?

```javascript
var a = [];
for(var i = 0; i < 10; i++) {
  a[i] = function() {
    console.log(i)
  }
}
a[6]()
```
结果：10
解答：i被var声明到全局在循环结束后变成了10，当a[6]函数调用时得到的i为10

　

　

### 2. 请说出此案列最终执行结果，并解释为什么?

```javascript
var tmp = 123;
if (true) {
  console.log(tmp);
  let tmp;
}
```
结果：报错tmp在声明前无法访问。
解答：let存在块级作用域。console.log(tmp);会先在该作用域内找tmp。但是let tmp不存在变量提升。所以会报错

　

　

### 3. 结合ES6语法，用最简单的方式找出数组中的最小值

```javascript
var arr = [12, 34, 32, 89, 4]
```

let min = arr[0];
for (const item of arr) {
  if (item <= min) {
    min = item;
  }
}

　

### 4. 请详细说明var、let、const三种声明变量的方式之间的具体差别

ES2015以前只有函数作用域和全局作用域，之后又新加了块级作用域。
var没有块级作用域,有函数作用域，存在变量提升，会声明到全局。
let有块级作用域，不存在变量提升。
const常量有块级作用域，常量的值不能通过重新赋值来改变，并且不能重新声明。

　

### 5. 请说出下列代码最终输出结果，并解释为什么？

```javascript
var a = 10;
var obj = {
  a: 20,
  fn() {
    setTimeout(() => {
      console.log(this.a)
    })
  }
}
obj.fn()
```
结果：20
解答：箭头函数中的this为当前环境的this。当前环境fn为obj调用的，this指向obj。所以为20

　

　

### 6. 简述Symbol类型的用途

Symbol作为对象属性名可以防止属性名重复被替换
Symbol定义类的私有属性或者方法
Symbol.iterator将普通对象变为可迭代对象
Symbol.for方法维护了一个全局的注册表，可以获取全局symbol值
　

### 7. 说说什么是浅拷贝，什么是深拷贝？
浅拷贝深拷贝只是针对Array，Object复制对象的。
浅拷贝只是拷贝了一层对象的属性，拷贝的是对象的属性的引用，而不是对象本身，修改对象
例如Object.assign({},obj)
深拷贝是递归拷贝的对象的所有层级属性。
例如
// 判断arr是否为一个数组，返回一个bool值
function isArray (arr) {
    return Object.prototype.toString.call(arr) === '[object Array]';
}
// 深度克隆
function deepClone (obj) {
	// 对常见的“非”值，直接返回原来值
	if([null, undefined, NaN, false].includes(obj)) return obj;
    if(typeof obj !== "object" && typeof obj !== 'function') {
		//原始类型直接返回
        return obj;
    }
    var o = isArray(obj) ? [] : {};
    for(let i in obj) {
        if(obj.hasOwnProperty(i)){
            o[i] = typeof obj[i] === "object" ? deepClone(obj[i]) : obj[i];
        }
    }
    return o;
}
　 

　

### 8. 请简述TypeScript与JavaScript之间的关系？
TypeScript是 JavaScript 的超集，包含了 JavaScript 的所有元素，在TypeScript中可以运行JavaScript代码，并扩展了 JavaScript的语法，如类、接口、继承、泛型等。

　

### 9. 请谈谈你所认为的typescript优缺点
优点：
1. TypeScript在编译时提供类型检查。在代码运行前就进行错误提示。有助于快速查找错误。
2. 增强了编译器和IDE的功能，包括代码补全、接口提示、跳转到定义、重构等。
缺点：
1. 短期项目增加了开发成本，如一些类型的定义。但对于长期维护的项目能减少一些维护成本。
2. 使用第三方库时，需要有第三方库的定义文件。否则编译器会报错。

　

　

### 10. 描述引用计数的工作原理和优缺点
工作原理：
设置引用数，判断当前引用数是否为0
引用关系改变时修改引用数字
引用数字为0时立即回收

例如
function fn(){
  const name='a'
}
fn()//执行完后，name找不到。被回收

优点：
发现垃圾时立即回收
最大限度减少程序暂停

缺点：
无法回收循环引用的对象
时间开销大

例子：
function fn(){
  const obj1={}
  const obj2={}
  <!-- obj1和obj2由于互相的引用数字并不为0，无法回收 -->
  obj1.name=obj2
  obj2.name=obj1
  return ''lg is a coder
}
fn()



　

　

### 11. 描述标记整理算法的工作流程

遍历所有的对象找到标记活动对象

遍历所有没有的标记对象，移动对象位置，清除对象


　

### 12.描述V8中新生代存储区垃圾回收的流程

新生代存储区
回收过程采用复制算法+标记整理
新生代内存去分为两个等大小的空间
使用空间为From，空闲空间为To
将活动对象存储于From空间
采用标记整理将活动对象拷贝到To
将From空间释放后，将From和To空间进行交换

　

### 13. 描述增量标记算法在何时使用及工作原理
工作时间：
程序执行后会停下来执行回收操作。增量标识将一整块的垃圾回收操作拆分分一小步组合去完成当前整个垃圾回收来代替一次完成一整块垃圾回收操作。这样可以让程序在执行与回收交替进行。

工作原理：
遍历对象进行标记，先找到第一层的可达对象后让程序继续执行，然后标记第二层可达对象后让程序继续执行，直到标记完成后，执行回收操作。