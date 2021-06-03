'use strict';var vue=require('vue');function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);

    if (enumerableOnly) {
      symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    }

    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}

function _iterableToArrayLimit(arr, i) {
  var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]);

  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;

  var _s, _e;

  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function createCommonjsModule(fn) {
  var module = { exports: {} };
	return fn(module, module.exports), module.exports;
}var vClickOutside_umd = createCommonjsModule(function (module, exports) {
!function(e,n){module.exports=n();}(commonjsGlobal,function(){var e="__v-click-outside",n="undefined"!=typeof window,t="undefined"!=typeof navigator,r=n&&("ontouchstart"in window||t&&navigator.msMaxTouchPoints>0)?["touchstart"]:["click"],i=function(e){var n=e.event,t=e.handler;(0, e.middleware)(n)&&t(n);},a=function(n,t){var a=function(e){var n="function"==typeof e;if(!n&&"object"!=typeof e)throw new Error("v-click-outside: Binding value must be a function or an object");return {handler:n?e:e.handler,middleware:e.middleware||function(e){return e},events:e.events||r,isActive:!(!1===e.isActive),detectIframe:!(!1===e.detectIframe),capture:Boolean(e.capture)}}(t.value),o=a.handler,d=a.middleware,c=a.detectIframe,u=a.capture;if(a.isActive){if(n[e]=a.events.map(function(e){return {event:e,srcTarget:document.documentElement,handler:function(e){return function(e){var n=e.el,t=e.event,r=e.handler,a=e.middleware,o=t.path||t.composedPath&&t.composedPath();(o?o.indexOf(n)<0:!n.contains(t.target))&&i({event:t,handler:r,middleware:a});}({el:n,event:e,handler:o,middleware:d})},capture:u}}),c){var l={event:"blur",srcTarget:window,handler:function(e){return function(e){var n=e.el,t=e.event,r=e.handler,a=e.middleware;setTimeout(function(){var e=document.activeElement;e&&"IFRAME"===e.tagName&&!n.contains(e)&&i({event:t,handler:r,middleware:a});},0);}({el:n,event:e,handler:o,middleware:d})},capture:u};n[e]=[].concat(n[e],[l]);}n[e].forEach(function(t){var r=t.event,i=t.srcTarget,a=t.handler;return setTimeout(function(){n[e]&&i.addEventListener(r,a,u);},0)});}},o=function(n){(n[e]||[]).forEach(function(e){return e.srcTarget.removeEventListener(e.event,e.handler,e.capture)}),delete n[e];},d=n?{beforeMount:a,updated:function(e,n){var t=n.value,r=n.oldValue;JSON.stringify(t)!==JSON.stringify(r)&&(o(e),a(e,{value:t}));},unmounted:o}:{};return {install:function(e){e.directive("click-outside",d);},directive:d}});

});function isValidMouseEvent(str) {
  return /^(click|dblclick|main|auxiliar|secondary|left|right)?$/.test(str) || /^ctrl\.(aux|sec)$/.test(str) || /^(ctrl\.)?(main|auxiliar|secondary|left|right)$/.test(str) || /^(click|dblclick)((\.ctrl)?\.(main|auxiliar|secondary|left|right|aux|sec))?$/.test(str);
}

var script = /*#__PURE__*/vue.defineComponent({
  name: "ContextMenu",
  inheritAttrs: false,
  emits: ["optionClick"],
  props: {
    /**
     * Defines the contextual menu options
     * @see `ContextualMenuOption` type for details.
     */
    options: {
      type: Array,
      required: true
    },

    /** Defines when the context menu is active */
    active: {
      type: Boolean,
      default: true
    },

    /**
     * Defines the icon format used in the contextual menu. (Default: `class`)
     * - `class`: for font-awesome-like, e.g: `<i class="[icon]" />`
     * - other text: for material-icons-like, e.g: `<i class="[iconFormat]">[icon]</i>`
     * @default "class"
     */
    iconFormat: {
      type: String,
      default: "class"
    },

    /** Defines a custom class delimitir for complex layouts */
    delimiter: {
      type: String,
      default: "context-menu__content"
    },

    /** Corrects offsetX when using `position: relative` on parent */
    offsetX: {
      type: Number,
      default: 0
    },

    /** Corrects offsetY when using `position: relative` on parent */
    offsetY: {
      type: Number,
      default: 0
    },

    /**
     * Defines the events to catch as comma separated strings
     * e.g: `click.secondary, dblclick.ctrl.right`
     *
     * The `click` can be omited, but the `dblclick` is required to prevent misunderstandings
     * e.g: `main, dblclick.main`
     *
     * The `left` and `right` are alias of `main` and `secondary` respectively.
     * @see `ContextualMenuOption["on"]` type for the posible values.
     */
    events: {
      type: String,
      default: "secondary",
      validator: function validator(v) {
        return /(click|main|aux|sec|left|right)/.test(v);
      }
    }
  },
  setup: function setup(props, _ref) {
    var emit = _ref.emit;
    var item = vue.ref(0);
    var visible = vue.ref(false);

    var hideContextMenu = function hideContextMenu() {
      return visible.value = false;
    };

    var onEscKeyRelease = function onEscKeyRelease(event) {
      if (event.key === "Escape") hideContextMenu();
    };

    vue.onMounted(function () {
      return document.body.addEventListener("keyup", onEscKeyRelease);
    });
    vue.onBeforeUnmount(function () {
      return document.body.removeEventListener("keyup", onEscKeyRelease);
    });

    var __events = vue.ref([]);

    var __catchClick = vue.ref(false);

    var __catchDblClick = vue.ref(false);

    vue.watchEffect(function () {
      __catchClick.value = __catchDblClick.value = false;
      __events.value = props.events.split(",").filter(function (e) {
        var valid = isValidMouseEvent(e);

        if (valid) {
          if (/^dblclick/.test(e)) __catchDblClick.value = true;else __catchClick.value = true;
        }

        return valid;
      });
    }); // ? Mantener sincronizado el conjunto de posibles menus

    var __menuOptionsMap = vue.ref(new Map());

    vue.watchEffect(function () {
      __menuOptionsMap.value = new Map();
      props.options.forEach(function (m) {
        var _m$name;

        var name = (_m$name = m.name) !== null && _m$name !== void 0 ? _m$name : "no-name-".concat(Math.random().toString().slice(2, 5));
        var events = Array.isArray(m.on) ? m.on : Array(m.on);
        events.forEach(function (e) {
          var _menuOptionsMap$valu;

          if (!e) return;
          var btn = undefined;
          if (/(main|left)/.test(e)) btn = "main";else if (/(sec|right)/.test(e)) btn = "secondary";else if (/(aux)/.test(e)) btn = "auxiliar";
          if (!btn) return;
          var ev = /^dblclick/.test(e) ? "dblclick" : "click";
          var mod = "_";
          if (/ctrl\./.test(e)) mod = "_ctrl_";else if (/alt\./.test(e)) mod = "_alt_";else if (/shift\./.test(e)) mod = "_shift_";else if (/meta\./.test(e)) mod = "_meta_";
          var menuName = "".concat(ev).concat(mod).concat(btn);
          var menu = (_menuOptionsMap$valu = __menuOptionsMap.value.get(menuName)) !== null && _menuOptionsMap$valu !== void 0 ? _menuOptionsMap$valu : [];

          __menuOptionsMap.value.set(menuName, [].concat(_toConsumableArray(menu), [_objectSpread2(_objectSpread2({}, _typeof(m) === "object" ? m : {}), {}, {
            name: name
          })]));
        });
      });
    }); // ? Actualizar el menu mostrado

    var location = vue.ref({
      x: 0,
      y: 0
    });
    var contextMenu = vue.ref([]);

    var showContextMenu = function showContextMenu(event, ev, btn) {
      var _id, _id2;

      visible.value = false;
      contextMenu.value = [];
      var t = event; // let id = t.target.id ?? ""

      var id = undefined;

      if (t.path) {
        // ? subir por el path de elementos hasta encontrar el elemento wrapper del context
        t.path.some(function (p) {
          var _p$classList;

          if (p !== null && p !== void 0 && (_p$classList = p.classList) !== null && _p$classList !== void 0 && _p$classList.contains(props.delimiter)) return true;
          id = p.id;
        });
      }

      item.value = (_id = id) !== null && _id !== void 0 ? _id : "";
      if (((_id2 = id) !== null && _id2 !== void 0 ? _id2 : "").length < 1) return;
      var mod = "_";
      if (event.ctrlKey) mod = "_ctrl_";else if (event.altKey) mod = "_alt_";else if (event.shiftKey) mod = "_shift_";else if (event.metaKey) mod = "_meta_";
      var menuName = "".concat(ev).concat(mod).concat(btn);

      var menu = __menuOptionsMap.value.get(menuName);

      if (menu) {
        contextMenu.value = menu;
        location.value = {
          x: event.pageX - props.offsetX,
          y: event.pageY - props.offsetY
        };
        visible.value = props.active;
        event.stopImmediatePropagation();
        event.preventDefault();
      }
    };

    return {
      contextMenu: contextMenu,
      visible: vue.computed(function () {
        return props.active && visible.value;
      }),
      location: vue.computed(function () {
        return {
          left: "".concat(location.value.x, "px"),
          top: "".concat(location.value.y, "px")
        };
      }),
      onClick: function onClick(event, mode, btn) {
        return showContextMenu(event, mode, btn);
      },
      optionClicked: function optionClicked(action) {
        hideContextMenu();
        emit("optionClick", {
          action: action,
          item: item.value
        });
      },
      // ? Configuration for click outside directive
      onClickOutsideConf: vue.computed(function () {
        return {
          handler: function handler() {
            return hideContextMenu();
          },
          isActive: visible.value
        };
      })
    };
  }
});var _withId = /*#__PURE__*/vue.withScopeId("data-v-0f415512");

vue.pushScopeId("data-v-0f415512");

var _hoisted_1 = {
  key: 0,
  class: "context-menu__divider"
};

vue.popScopeId();

var render = /*#__PURE__*/_withId(function (_ctx, _cache, $props, $setup, $data, $options) {
  var _directive_click_outside = vue.resolveDirective("click-outside");

  return vue.openBlock(), vue.createBlock(vue.Fragment, null, [vue.withDirectives(vue.createVNode("ul", {
    class: ["context-menu", {
      'context-menu--active': _ctx.visible
    }],
    style: _ctx.location
  }, [(vue.openBlock(true), vue.createBlock(vue.Fragment, null, vue.renderList(_ctx.contextMenu, function (_ref, index) {
    var _ref2;

    var type = _ref.type,
        name = _ref.name,
        label = _ref.label,
        icon = _ref.icon;
    return vue.openBlock(), vue.createBlock(vue.Fragment, {
      key: index
    }, [type === 'divider' ? (vue.openBlock(), vue.createBlock("li", _hoisted_1)) : (vue.openBlock(), vue.createBlock("li", {
      key: 1,
      onClick: vue.withModifiers(function ($event) {
        return _ctx.optionClicked(name !== null && name !== void 0 ? name : '');
      }, ["stop"])
    }, [_ctx.iconFormat === 'class' ? (vue.openBlock(), vue.createBlock("i", {
      key: 0,
      class: icon
    }, null, 2)) : (vue.openBlock(), vue.createBlock("i", {
      key: 1,
      class: _ctx.iconFormat
    }, vue.toDisplayString(icon), 3)), vue.createVNode("span", null, vue.toDisplayString((_ref2 = label !== null && label !== void 0 ? label : name) !== null && _ref2 !== void 0 ? _ref2 : ""), 1)], 8, ["onClick"]))], 64);
  }), 128))], 6), [[_directive_click_outside, _ctx.onClickOutsideConf]]), vue.createVNode("div", vue.mergeProps(_ctx.$attrs, {
    class: "context-menu__content",
    onClick: _cache[1] || (_cache[1] = vue.withModifiers(function ($event) {
      return _ctx.onClick($event, 'click', 'main');
    }, ["left", "prevent", "stop"])),
    onMouseup: _cache[2] || (_cache[2] = vue.withModifiers(function ($event) {
      return _ctx.onClick($event, 'click', 'auxiliar');
    }, ["middle", "prevent", "stop"])),
    onContextmenu: _cache[3] || (_cache[3] = vue.withModifiers(function ($event) {
      return _ctx.onClick($event, 'click', 'secondary');
    }, ["right", "prevent", "stop"])),
    onDblclick: [_cache[4] || (_cache[4] = vue.withModifiers(function ($event) {
      return _ctx.onClick($event, 'dblclick', 'main');
    }, ["left", "prevent", "stop"])), _cache[5] || (_cache[5] = vue.withModifiers(function ($event) {
      return _ctx.onClick($event, 'dblclick', 'auxiliar');
    }, ["middle", "prevent", "stop"])), _cache[6] || (_cache[6] = vue.withModifiers(function ($event) {
      return _ctx.onClick($event, 'dblclick', 'secondary');
    }, ["right", "prevent", "stop"]))]
  }), [vue.renderSlot(_ctx.$slots, "default")], 16)], 64);
});function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}var css_248z = "\n.context-menu[data-v-0f415512] {\n  --cm-light-grey: #ecf0f1;\n  /* --cm-grey: darken(var(--cm-light-grey), 15%); */\n  --cm-grey: #c0cdd1;\n  --cm-blue: #007aff;\n  --cm-white: #fff;\n  --cm-black: #333;\n  --cm-black-shadow: rgba(51, 51, 51, 0.2);\n\n  top: 0;\n  left: 0;\n  margin: 0;\n  padding: 0;\n  display: none;\n  list-style: none;\n  position: absolute;\n  z-index: 1000000;\n  background-color: var(--cm-light-grey);\n  border-bottom-width: 0px;\n  font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", \"Roboto\", \"Oxygen\", \"Ubuntu\", \"Cantarell\", \"Fira Sans\", \"Droid Sans\",\n    \"Helvetica Neue\", sans-serif;\n  box-shadow: 0 3px 6px 0 var(--cm-black-shadow);\n  border-radius: 4px;\n}\n.context-menu.context-menu--active[data-v-0f415512] {\n  display: block;\n}\n.context-menu > li[data-v-0f415512] {\n  display: flex;\n  align-items: center;\n  padding: 5px 15px;\n  color: var(--cm-black);\n  cursor: pointer;\n}\n.context-menu > li[data-v-0f415512]:hover {\n  background-color: var(--cm-blue);\n  color: var(--cm-white);\n}\n.context-menu .context-menu__divider[data-v-0f415512] {\n  box-sizing: content-box;\n  height: 2px;\n  background-color: var(--cm-grey);\n  padding: 4px 0;\n  background-clip: content-box;\n  pointer-events: none;\n}\n.context-menu li[data-v-0f415512]:first-of-type {\n  margin-top: 4px;\n}\n.context-menu li[data-v-0f415512]:last-of-type {\n  margin-bottom: 4px;\n}\n";
styleInject(css_248z);script.render = render;
script.__scopeId = "data-v-0f415512";// Default export is installable instance of component.
// IIFE injects install function into component, allowing component
// to be registered via Vue.use() as well as Vue.component(),
var component = /*#__PURE__*/(function () {
  // Assign InstallableComponent type
  var installable = script; // Attach install function executed by Vue.use()

  installable.install = function (app) {
    app.use(vClickOutside_umd);
    app.component("ContextMenu", installable);
  };

  return installable;
})(); // It's possible to expose named exports when writing components that can
// also be used as directives, etc. - eg. import { RollupDemoDirective } from 'rollup-demo';
// export const RollupDemoDirective = directive;
var namedExports=/*#__PURE__*/Object.freeze({__proto__:null,'default': component});// only expose one global var, with named exports exposed as properties of
// that global var (eg. plugin.namedExport)

Object.entries(namedExports).forEach(function (_ref) {
  var _ref2 = _slicedToArray(_ref, 2),
      exportName = _ref2[0],
      exported = _ref2[1];

  if (exportName !== 'default') component[exportName] = exported;
});module.exports=component;