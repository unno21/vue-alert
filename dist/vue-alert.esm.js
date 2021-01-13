//
//
//
//
//
//
//
//
//
//
//


var script = {
  name: 'vue-alert',
  props: {
    title: {
      type: String,
      default: 'Alert'
    },
    message: {
      type: String,
      default: 'Alert message'
    },
    titleClass: {
      type: Array,
      default: []
    },
    messageClass: {
      type: Array,
      default: []
    },
  }
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
    }
    // Vue.extend constructor export interop.
    var options = typeof script === 'function' ? script.options : script;
    // render functions
    if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true;
        // functional template
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    // scopedId
    if (scopeId) {
        options._scopeId = scopeId;
    }
    var hook;
    if (moduleIdentifier) {
        // server build
        hook = function (context) {
            // 2.3 injection
            context =
                context || // cached call
                    (this.$vnode && this.$vnode.ssrContext) || // stateful
                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (style) {
                style.call(this, createInjectorSSR(context));
            }
            // register component module identifier for async chunk inference
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        options._ssrRegister = hook;
    }
    else if (style) {
        hook = shadowMode
            ? function (context) {
                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
            }
            : function (context) {
                style.call(this, createInjector(context));
            };
    }
    if (hook) {
        if (options.functional) {
            // register for functional component in vue file
            var originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            var existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}

var isOldIE = typeof navigator !== 'undefined' &&
    /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
function createInjector(context) {
    return function (id, style) { return addStyle(id, style); };
}
var HEAD;
var styles = {};
function addStyle(id, css) {
    var group = isOldIE ? css.media || 'default' : id;
    var style = styles[group] || (styles[group] = { ids: new Set(), styles: [] });
    if (!style.ids.has(id)) {
        style.ids.add(id);
        var code = css.source;
        if (css.map) {
            // https://developer.chrome.com/devtools/docs/javascript-debugging
            // this makes source maps inside style tags work properly in Chrome
            code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
            // http://stackoverflow.com/a/26603875
            code +=
                '\n/*# sourceMappingURL=data:application/json;base64,' +
                    btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) +
                    ' */';
        }
        if (!style.element) {
            style.element = document.createElement('style');
            style.element.type = 'text/css';
            if (css.media)
                { style.element.setAttribute('media', css.media); }
            if (HEAD === undefined) {
                HEAD = document.head || document.getElementsByTagName('head')[0];
            }
            HEAD.appendChild(style.element);
        }
        if ('styleSheet' in style.element) {
            style.styles.push(code);
            style.element.styleSheet.cssText = style.styles
                .filter(Boolean)
                .join('\n');
        }
        else {
            var index = style.ids.size - 1;
            var textNode = document.createTextNode(code);
            var nodes = style.element.childNodes;
            if (nodes[index])
                { style.element.removeChild(nodes[index]); }
            if (nodes.length)
                { style.element.insertBefore(textNode, nodes[index]); }
            else
                { style.element.appendChild(textNode); }
        }
    }
}

/* script */
var __vue_script__ = script;

/* template */
var __vue_render__ = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    { staticClass: "alert-wrapper" },
    [
      _vm._t("title", [
        _c("h1", { staticClass: "title", class: _vm.titleClass }, [
          _vm._v(_vm._s(_vm.title))
        ])
      ]),
      _vm._v(" "),
      _vm._t("message", [
        _c("p", { staticClass: "message", class: _vm.messageClass }, [
          _vm._v(_vm._s(_vm.message))
        ])
      ])
    ],
    2
  )
};
var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;

  /* style */
  var __vue_inject_styles__ = function (inject) {
    if (!inject) { return }
    inject("data-v-edcac234_0", { source: "\n.alert-wrapper[data-v-edcac234] {\n  position: absolute;\n  bottom: 20px;\n  right: 20px;\n}\n.title[data-v-edcac234] {\n  color: darkgray;\n}\n.message[data-v-edcac234] {\n  color: dimgray;\n}\n", map: {"version":3,"sources":["E:\\projects\\packages\\VueAlert\\src\\vue-alert.vue"],"names":[],"mappings":";AAsCA;EACA,kBAAA;EACA,YAAA;EACA,WAAA;AACA;AAEA;EACA,eAAA;AACA;AAEA;EACA,cAAA;AACA","file":"vue-alert.vue","sourcesContent":["<template>\r\n  <div class=\"alert-wrapper\">\r\n      <slot name=\"title\">\r\n        <h1 class=\"title\" :class=\"titleClass\">{{ title }}</h1>\r\n      </slot>\r\n      <slot name=\"message\">\r\n        <p class=\"message\" :class=\"messageClass\">{{ message }}</p>\r\n      </slot>\r\n  </div>\r\n</template>\r\n\r\n<script>\r\n\r\nexport default {\r\n  name: 'vue-alert',\r\n  props: {\r\n    title: {\r\n      type: String,\r\n      default: 'Alert'\r\n    },\r\n    message: {\r\n      type: String,\r\n      default: 'Alert message'\r\n    },\r\n    titleClass: {\r\n      type: Array,\r\n      default: []\r\n    },\r\n    messageClass: {\r\n      type: Array,\r\n      default: []\r\n    },\r\n  }\r\n}\r\n\r\n</script>\r\n\r\n<style scoped>\r\n  .alert-wrapper {\r\n    position: absolute;\r\n    bottom: 20px;\r\n    right: 20px;\r\n  }\r\n\r\n  .title {\r\n    color: darkgray;\r\n  }\r\n\r\n  .message {\r\n    color: dimgray;\r\n  }\r\n</style>"]}, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__ = "data-v-edcac234";
  /* module identifier */
  var __vue_module_identifier__ = undefined;
  /* functional template */
  var __vue_is_functional_template__ = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__ = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    false,
    createInjector,
    undefined,
    undefined
  );

// Import vue component

// Declare install function executed by Vue.use()
function install(Vue) {
    if (install.installed) { return; }
    install.installed = true;
    Vue.component('vue-alert', __vue_component__);
}

// Create module definition for Vue.use()
var plugin = {
    install: install,
};

// Auto-install when vue is found (eg. in browser via <script> tag)
var GlobalVue = null;
if (typeof window !== 'undefined') {
    GlobalVue = window.Vue;
} else if (typeof global !== 'undefined') {
    GlobalVue = global.Vue;
}
if (GlobalVue) {
    GlobalVue.use(plugin);
}

export default __vue_component__;
export { install };
