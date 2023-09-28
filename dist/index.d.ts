import { Plugin } from 'vite';
/**
 * Vite Plugin to replace a placeholder with the bundled style of the custom element
 * @returns {Plugin}
 */
declare const vueWcStyles: () => Plugin;
export default vueWcStyles;
