"use strict";
const invalidateModule = (server, moduleId) => {
  const { moduleGraph, ws } = server;
  const module2 = moduleGraph.getModuleById(moduleId);
  if (module2) {
    moduleGraph.invalidateModule(module2);
    if (ws) {
      ws.send({
        type: "full-reload",
        path: "*"
      });
    }
  }
};
const vueWcStyles = () => {
  let server;
  let virtualStyles = "";
  const moduleIds = [];
  return {
    name: "vue-wc-styles",
    enforce: "post",
    generateBundle: (_, bundle) => {
      let cssStyle = "";
      Object.keys(bundle).forEach((key) => {
        const bundlePart = bundle[key];
        if (bundlePart.type === "asset" && bundlePart.fileName.includes(".css")) {
          cssStyle += bundlePart.source;
        }
      });
      Object.keys(bundle).forEach((key) => {
        const bundlePart = bundle[key];
        if (bundlePart.type === "chunk") {
          if (bundlePart.code.includes("{{ CUSTOM_CSS_PLACEHOLDER }}")) {
            const injectedStyleCode = bundlePart.code.replace(
              '"{{ CUSTOM_CSS_PLACEHOLDER }}"',
              JSON.stringify(cssStyle)
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
        const module2 = server.moduleGraph.getModuleById(id);
        if (module2) {
          server.reloadModule(module2);
        }
      });
    },
    transform(code, id) {
      if (server) {
        if (id.includes(".scss")) {
          const match = code.match(/const __vite__css = [`"]([^`"]*)[`"]/s);
          if (match) {
            const extractedCSS = match[1];
            virtualStyles += extractedCSS;
            if (!moduleIds.includes(id)) {
              moduleIds.push(id);
            }
          }
        }
        if (code.includes("{{ CUSTOM_CSS_PLACEHOLDER }}")) {
          code = code.replace("{{ CUSTOM_CSS_PLACEHOLDER }}", virtualStyles);
          invalidateModule(server, id);
          if (!moduleIds.includes(id)) {
            moduleIds.push(id);
          }
        }
      }
      return code;
    }
  };
};
module.exports = vueWcStyles;
