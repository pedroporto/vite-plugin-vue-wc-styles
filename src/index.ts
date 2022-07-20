import { Plugin } from 'vite';

/**
 * Vite Plugin to replace a placeholder with the bundled style of the custom element
 * @returns {Plugin}
 */
const vueWcStyles = (): Plugin => {
  return {
    name: 'vue-wc-styles',
    enforce: 'post',
    apply: 'build',
    generateBundle: (_, bundle) => {
      let cssStyle = '';

      Object.keys(bundle).forEach((key) => {
        const bundlePart = bundle[key];

        if (bundlePart.type === 'asset' && bundlePart.fileName.includes('.css')) {
          cssStyle += bundlePart.source;
          delete bundle[key];
        }
      });

      Object.keys(bundle).forEach((key) => {
        const bundlePart = bundle[key];

        if (bundlePart.type === 'chunk') {
          if (bundlePart.code.includes('{{ CUSTOM_CSS_PLACEHOLDER }}')) {
            const injectedStyleCode = bundlePart.code.replace(
              '"{{ CUSTOM_CSS_PLACEHOLDER }}"',
              JSON.stringify(cssStyle),
            );
            bundlePart.code = injectedStyleCode;
          }
        }
      });
    },
  };
};

export default vueWcStyles;
