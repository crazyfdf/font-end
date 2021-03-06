import ReactDOM from "react-dom";
import App from "./App";
import Counter from "./components/Counter";
import { Provider } from "react-redux";
import { store } from "./store";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
