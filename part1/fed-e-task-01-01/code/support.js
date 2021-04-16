/*
 * @Author: 祸灵
 * @Date: 2021-04-04 12:19:14
 * @LastEditTime: 2021-04-16 13:24:25
 * @LastEditors: 祸灵
 * @Description: 函子
 * @FilePath: \UC-font\components\uct\libs\lodash\functor.js
 */
/**
 * 函子是一个特殊的容器，通过一个普通的对象来实现，该对象具有map方法，map方法可以运行一个函数对值进行处理(变形关系)
 * let r = Container.of(5).map(x => x + 1).map(x => x * x)//36
 * 副作用 单传入null时可能会变得不纯
 * @description: 函子
 * @param {*}
 * @return {*}
 */
class Container {
  static of(value) {
    return new Container(value);
  }
  constructor(value) {
    this._value = value;
  }

  map(fn) {
    return Container.of(fn(this._value));
  }
}

/**
 * 我们在编程的过程中可能会遇到很多错误，需要对这些错误做对应的处理
 * Maybe函子的作用就是可以对外部的控制情况做处理（控制副作用在允许的范围）
 * let r = Maybe.of(undefined).map(x => x.toUpperCase())//null
 * 可以处理空值，但不知道哪里出了问题
 * @description: Maybe函子
 * @param {*}
 * @return {*}
 */
class Maybe {
  static of(value) {
    return new Maybe(value);
  }
  constructor(value) {
    this._value = value;
  }
  map(fn) {
    return this.isNothing() ? Maybe.of(this._value) : Maybe.of(fn(this._value));
  }
  isNothing() {
    return [null, undefined].includes(this._value);
  }
}

module.exports = {
  Container,
  Maybe,
};
