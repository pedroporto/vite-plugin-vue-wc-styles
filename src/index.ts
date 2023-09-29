import { Plugin, ViteDevServer } from 'vite';

const invalidateModule = (server: ViteDevServer, moduleId: string) => {
  const { moduleGraph, ws } = server;
  const module = moduleGraph.getModuleById(moduleId);
  if (module) {
    moduleGraph.invalidateModule(module);
    if (ws) {
      ws.send({
        type: 'full-reload',
        path: '*',
      });
    }
  }
};

/**
 * Vite Plugin to replace a placeholder with the bundled style of the custom element
 * @returns {Plugin}
 */
const vueWcStyles = (): Plugin => {
  let server: ViteDevServer;
  let virtualStyles = '';
  const moduleIds: string[] = [];

  return {
    name: 'vue-wc-styles',
    enforce: 'post',
    generateBundle: (_, bundle) => {
      let cssStyle = '';

      Object.keys(bundle).forEach((key) => {
        const bundlePart = bundle[key];

        if (bundlePart.type === 'asset' && bundlePart.fileName.includes('.css')) {
          cssStyle += bundlePart.source;
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
    configureServer(_server) {
      server = _server;
    },
    handleHotUpdate() {
      moduleIds.forEach((id) => {
        const module = server.moduleGraph.getModuleById(id);

        if (module) {
          server.reloadModule(module);
        }
      });
    },
    transform(code, id) {
      if (server) {
        if (id.includes('.scss') || id.includes('.css')) {
          const match = code.match(/const __vite__css = [`"]([^`"]*)[`"]/s);
          if (match) {
            const extractedCSS = match[1];
            virtualStyles += extractedCSS;
            if (!moduleIds.includes(id)) {
              moduleIds.push(id);
            }
          }
        }
        if (code.includes('{{ CUSTOM_CSS_PLACEHOLDER }}')) {
          code = code.replace('{{ CUSTOM_CSS_PLACEHOLDER }}', virtualStyles);
          invalidateModule(server, id);
          if (!moduleIds.includes(id)) {
            moduleIds.push(id);
          }
        }
      }

      return code;
    },
  };
};

export default vueWcStyles;
