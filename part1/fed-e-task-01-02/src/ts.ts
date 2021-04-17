const hello1=(name:string):void=>{
  console.log(`Hello,${name}`);
}
hello1('TypeScript')

// 基本类型
const a:string='foobar'
const b:number=100//Nan Infinity
const c:boolean=true//false
const e:void=undefined
const f:null=null
const g:undefined=undefined
// ts.config "lib": ["ES2015", "DOM"]
const h:symbol=Symbol()

// 对象
const foo :object=function(){}//[]//{}
const obj:{foo:number,bar:string}={foo:123,bar:'string'}

// 数组
const arr1: Array<number> = [1, 2, 3];
const arr2: number[] = [1, 2, 3];

// 元组：固定长度和类型
const tuple:[number,string]=[18,'zce']

// 枚举（Enum）
// const PostStatus={
//   Draft:0,
//   Unpublished:1,
//   Published:2
// }
// 加const后转换es5不会产生枚举代码
const enum PostStatus{
  Draft=0,
  Unpublished,//1
  Published//2
}

const post={
  title:'Hello TypeScript',
  content:'TypeScript is a typed superset of JavaScript',
  status:PostStatus.Draft//0|1|2
}


// 函数类型
function func1(a:number,b:number=10,...rest:number[]):string {
  return 'func1'
}
func1(100,200,300)

const func2:(a: number, b: number) => string=function(a:number,b:number):string{
  return 'func2'
}

// any 默认类型(弱类型，动态类型:不做类型检查)
function stringify(value:any) {
  return JSON.stringify(value)
}
stringify('string')
stringify(100)
stringify(true)


//类型断言
const nums=[110,120,119,112] 
const res=nums.find(i=>i>0)
const num1=res as number
const num2=<number>res//JSX下不能使用

// 接口
interface Post{
  title:string,
  content:string,
  subtitle?:string,
  readonly summary:string
}

function printPost(post:Post){
  console.log(post.title);
  console.log(post.content);
}
printPost({
  title:'Hello TypeScript',
  content:'TypeScript is a typed superset of JavaScript',
  summary:'A'
})

interface Cache1{
  [prop:string]:string
}
const cache:Cache1={}
cache.foo='value1'
cache.var='value2'


// class
class Person{
  public name:string//='init name'
  private age:number
  protected readonly gender:boolean
  constructor(name:string,age:number){
    this.name=name
    this.age=age
    this.gender=true
  }
  sayHi(msg:string):void{
    console.log(`I am ${this.name},${msg}`);
  }
}
class Student extends Person {
  constructor(name:string,age:number) {
    super(name,age)
    console.log(this.gender);
  }
}
const tom=new Person('tom',18)
// console.log(tom.name);
// console.log(tom.age);
// console.log(tom.gender);


// 类与接口
interface Eat{
  eat (food:string):void
}
interface Run{
  run (distance:number):void
}
// 抽象类，只能被继承
abstract class Animal implements Eat,Run{
  eat(food:string):void{
    console.log(`吃${food}`);
  }
  // 抽象方法，继承的子类一定要实现的方法
  abstract run(distance:number):void
}
class Dog extends Animal {
  run(distance:number):void{
    console.log(`爬${distance}`);
  }
}


// 泛型

function createArray<T>(length:number,value:T):T[]{
  const arr=Array<T>(length).fill(value)
  return arr
}
const res1=createArray<string>(3,'foo')

import {camelCase} from 'lodash'

// declare function camelCase(input:string):string
const res2=camelCase('hello typed')