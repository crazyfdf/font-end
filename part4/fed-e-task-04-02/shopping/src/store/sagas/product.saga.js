import { takeEvery, put } from "redux-saga/effects";
import { loadProducts, saveProducts } from "../actions/product.actions";
import axios from "axios";

// 加载商品列表数据
function* handleLoadProducts() {
  const { data } = yield axios.get("http://localhost:3005/goods");
  yield put(saveProducts(data));
}

export default function* productSaga() {
  // 加载商品列表数据
  yield takeEvery(loadProducts, handleLoadProducts);
}
