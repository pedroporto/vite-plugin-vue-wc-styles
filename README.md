# vite plugin vue webcomponent styles

## Introduction
Using web components, the styles with `Vite` + `Vue 3` / `Vue 2` were not being correctly addressed when bundling the web component.

> This plugin is meant to manipulate the styles and inject them into the web component bundle on build time

The idea with this vite plugin is to create a solution for that while `vue` core team releases a more proper fix.

## How to use it

### Installation

```
  npm install --save-dev vite-plugin-vue-wc-styles
```

### Vue 3

> When using this plugin, [`@vitejs/plugin-vue` `customElement`](https://github.com/vitejs/vite-plugin-vue/tree/main/packages/plugin-vue#using-vue-sfcs-as-custom-elements) property shouldn't be set as `true`

```typescript
// main.ts example
import { defineCustomElement } from 'vue';
import { webComponentCustomElement } from 'vite-plugin-vue-wc-styles/custom-element';
import SomeComponent from './components/SomeComponent.ce.vue'

const VueCustomElement = defineCustomElement(MyComponent);
const CustomElement = webComponentCustomElement(VueCustomElement);

customElements.define('my-component', CustomElement);
```

```typescript
// vue.config.ts example
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueWcStyles from 'vite-plugin-vue-wc-styles';

// https://vitejs.dev/config/
export default defineConfig({
  // vite vue plugin must not have the customElement as true.
  plugins: [vue(), vueWcStyles()],
});
```

### Vue 2

> For `Vue 2` you might need to use the [vuejs/vue-web-component-wrapper](https://github.com/vuejs/vue-web-component-wrapper).

```typescript
// main.ts example
import Vue from 'vue';
import wrap from '@vue/web-component-wrapper'
import { webComponentCustomElement } from 'vite-plugin-vue-wc-styles/custom-element';
import SomeComponent from './components/SomeComponent.vue'

const VueCustomElement = wrap(Vue, MyComponent) as unknown as CustomElementConstructor;
const CustomElement = webComponentCustomElement(VueCustomElement);

customElements.define('some-web-component', CustomElement);
```

> This was tested with [vite-plugin-vue2](https://github.com/underfin/vite-plugin-vue2)

```typescript
// vue.config.ts example
import { defineConfig } from 'vite';
import { createVuePlugin } from 'vite-plugin-vue2';
import vueWcStyles from 'vite-plugin-vue-wc-styles';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [createVuePlugin(), vueWcStyles()],
});
```

### HMR
HMR is enabled since `v0.3.0`. It makes usage of `vite` plugin hooks to inject styles in the web component.

> A reload might be need when bootstrapping the server.
