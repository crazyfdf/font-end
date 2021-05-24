import mountNativeElement from "./mountNativeElement.js";
import isFunction from "./isFunction";
import mountComponent from "./mountComponent.js";
export default function mountElement(virtualDOM, container, oldDOM) {
  if (isFunction(virtualDOM)) {
    // Component
    mountComponent(virtualDOM, container, oldDOM);
  } else {
    // NativeElement
    mountNativeElement(virtualDOM, container, oldDOM);
  }
}
