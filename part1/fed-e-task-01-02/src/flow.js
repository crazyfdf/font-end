/**
 * 类型注解
 * @flow
 */
function sum(a: number, b: number): number {
  return a + b;
}
sum(100, 50);

// 无返回值的函数类型为void
function foo2(): void {}

const a: string = "foobar";
const b: number = Infinity; // NaN //100
const c: boolean = false; //true
const d: null = null;
const e: void = undefined;
const f: symbol = Symbol();

const arr1: Array<number> = [1, 2, 3];
const arr2: number[] = [1, 2, 3];
// 元组
const foo: [string, number] = ["foo", 100];

const obj1: { foo: string, bar: number } = { foo: "string", bar: 100 };
const obj2: { foo?: string, bar: number } = { bar: 100 };
const obj3: { [string]: string } = {};

obj3.key1 = "value1";
obj3.key2 = "123";

function foo3(callback: (string, number) => void) {
  callback("string", 100);
}
foo3(function (str, n) {});

const foo4: "foo4" = "foo4";
const type: "success" | "warning" | "danger" = "success";

type StringOrNumber = string | number;
const r: StringOrNumber = "string";

const gender: ?number = undefined;
// const gender: number | null | void = undefined;

// mixed为强类型。在编译时会报错
function passMixed(value: mixed) {
  if (typeof value === "string") {
    value.substr(1);
  }
  if (typeof value === "number") {
    value * value;
  }
}
passMixed("string");
passMixed(100);

// any为弱类型。在运行时会报错
function passAny(value: any) {
  value.substr(1);
  value * value;
}
passAny("string");
passAny(100);
