/**
 * Method to add the CSS placeholder for the vite plugin to replace with the component CSS.
 * @param CustomElement {CustomElementConstructor}
 * @returns {CustomElementConstructor}
 */
export const webComponentCustomElement = (CustomElement: CustomElementConstructor): CustomElementConstructor => {
  class WebComponentElement extends CustomElement {
    constructor() {
      super();

      const styleElement = document.createElement('style');

      styleElement.textContent = '{{ CUSTOM_CSS_PLACEHOLDER }}';

      this.shadowRoot?.prepend(styleElement);
    }
  }

  return WebComponentElement;
};
