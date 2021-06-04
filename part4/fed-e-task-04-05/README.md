1.通过该项目，请简要说明 typescript 比 javascript 的优势在哪？

优点：

1. TypeScript在编译时提供类型检查。在代码运行前就进行错误提示。有助于快速查找错误。
2. 增强了编译器和IDE的功能，包括代码补全、接口提示、跳转到定义、重构等：
3. 虽然短期项目增加了开发成本，如一些类型的定义。但对于长期维护的项目能减少一些维护成本。

2.请简述一下支付流程

1. 用户提交订单，向服务器端发送请求，服务端返回支付地址。
2. 跳转支付地址，输入支付信息，完成支付。
3. 支付完成后支付宝向服务端发送post请求，用来告诉服务端支付的状态是成功还是失败。同时重定向到提前设置好的支付结果页，告诉用户支付的结果。


3.react-redux 的主要作用是什么，常用的 api 有哪些，什么作用？

1. 主要作用
- react-redux配合redux使用，将redux定义的store数据注入到组件中，可以使组件轻松的拿到全局状态，方便组件间的通信。


2. 常用API
- Provider组件，其原理是通过React组件的context 属性实现store 的传递， 进而拿到整个应用的state。
- connect 函数 connect函数是把 redux 的 dispatch 和 state 映射为 react 组件的 props中，将页面里的组件与应用的状态state真正连接起来。
- useSelector方法：与connect获取数据的作用一样，即获取组件所需的store中的数据
- useDispatch方法：与connect获取数据更新方法的作用一样，即获取dispatch方法，用于发送action来更新store中的数据。
- applyMiddleware applyMiddleware(…middlewares) 引入中间件，比如我们经常使用的用于处理异步action的redux-thunk 中间件。实际上，中间件是一个函数，对store.dispatch函数进行了改造，在发出action和执行reducer之间，增加了一些其他的功能。
- compose compose是一个返回依次执行参数里面的方法的函数， 其内部是通过Array.prototype.reduceRight 函数实现的，一般redux项目使用多个中间件时会用到。
- mapStateToProps() mapStateToProps是一个函数，它接受state作为参数，返回一个对象。这个对象有一个todos属性，代表 UI 组件的同名参数，后面的getVisibleTodos也是一个函数，可以从state算出 todos 的值。

4.redux 中的异步如何处理？

1. 在actionType中添加异步数据需要的action类型
```
export const SIGNUP="SIGNUP"
export const SIGNUP_SUCCESS="SIGNUP_SUCCESS"
export const SIGNUP_FAIL="SIGNUP_FAIL"
```

2. 在actionCreator中添加生成action的函数
```
export const signUp=(payload:SignUpPayload):SignUpAction=>({
  type:SIGNUP,
  payload
})

export const signUpSuccess=():SignUpSuccessAction=>({
  type:SIGNUP_SUCCESS
})
export const signUpFail=(message:string):SignUpFailAction=>({
  type:SIGNUP_FAIL,
  message
})
```

3. 在reducer中添加处理action的方法
```
export default function authReducer(state = intialState, action: AuthUnionType) {
  switch (action.type) {
    case SIGNUP:
      return {
        ...state,
        signUp: {
          loaded: false,
          success: false,
        },
      };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        signUp: {
          loaded: true,
          success: true,
        },
      };
    case SIGNUP_FAIL:
      return {
        ...state,
        signUp: {
          loaded: true,
          success: false,
          message: action.message,
        },
      };
  }
}
```

4. 将异步请求放在在sagas.js文件中
```
function* hanleSignUp(action: SignUpAction) {
  try {
    yield axios.post(`${API}/signup`, action.payload);
    yield put(signUpSuccess());
  } catch (error) {
    yield put(signUpFail(error.response.data.error));
  }
}

export default function* authSaga() {
  yield takeEvery(SIGNUP, hanleSignUp);
}
```
