"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const webComponentCustomElement = (CustomElement) => {
  class WebComponentElement extends CustomElement {
    constructor() {
      var _a;
      super();
      const styleElement = document.createElement("style");
      styleElement.textContent = "{{ CUSTOM_CSS_PLACEHOLDER }}";
      (_a = this.shadowRoot) == null ? void 0 : _a.prepend(styleElement);
    }
  }
  return WebComponentElement;
};
exports.webComponentCustomElement = webComponentCustomElement;
