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
}

function _createForOfIteratorHelper(o, allowArrayLike) {
  var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];

  if (!it) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
      if (it) o = it;
      var i = 0;

      var F = function () {};

      return {
        s: F,
        n: function () {
          if (i >= o.length) return {
            done: true
          };
          return {
            done: false,
            value: o[i++]
          };
        },
        e: function (e) {
          throw e;
        },
        f: F
      };
    }

    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  var normalCompletion = true,
      didErr = false,
      err;
  return {
    s: function () {
      it = it.call(o);
    },
    n: function () {
      var step = it.next();
      normalCompletion = step.done;
      return step;
    },
    e: function (e) {
      didErr = true;
      err = e;
    },
    f: function () {
      try {
        if (!normalCompletion && it.return != null) it.return();
      } finally {
        if (didErr) throw err;
      }
    }
  };
}var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function createCommonjsModule(fn) {
  var module = { exports: {} };
	return fn(module, module.exports), module.exports;
}var vClickOutside_umd = createCommonjsModule(function (module, exports) {
!function(e,n){module.exports=n();}(commonjsGlobal,function(){var e="__v-click-outside",n="undefined"!=typeof window,t="undefined"!=typeof navigator,r=n&&("ontouchstart"in window||t&&navigator.msMaxTouchPoints>0)?["touchstart"]:["click"],i=function(e){var n=e.event,t=e.handler;(0, e.middleware)(n)&&t(n);},a=function(n,t){var a=function(e){var n="function"==typeof e;if(!n&&"object"!=typeof e)throw new Error("v-click-outside: Binding value must be a function or an object");return {handler:n?e:e.handler,middleware:e.middleware||function(e){return e},events:e.events||r,isActive:!(!1===e.isActive),detectIframe:!(!1===e.detectIframe),capture:Boolean(e.capture)}}(t.value),o=a.handler,d=a.middleware,c=a.detectIframe,u=a.capture;if(a.isActive){if(n[e]=a.events.map(function(e){return {event:e,srcTarget:document.documentElement,handler:function(e){return function(e){var n=e.el,t=e.event,r=e.handler,a=e.middleware,o=t.path||t.composedPath&&t.composedPath();(o?o.indexOf(n)<0:!n.contains(t.target))&&i({event:t,handler:r,middleware:a});}({el:n,event:e,handler:o,middleware:d})},capture:u}}),c){var l={event:"blur",srcTarget:window,handler:function(e){return function(e){var n=e.el,t=e.event,r=e.handler,a=e.middleware;setTimeout(function(){var e=document.activeElement;e&&"IFRAME"===e.tagName&&!n.contains(e)&&i({event:t,handler:r,middleware:a});},0);}({el:n,event:e,handler:o,middleware:d})},capture:u};n[e]=[].concat(n[e],[l]);}n[e].forEach(function(t){var r=t.event,i=t.srcTarget,a=t.handler;return setTimeout(function(){n[e]&&i.addEventListener(r,a,u);},0)});}},o=function(n){(n[e]||[]).forEach(function(e){return e.srcTarget.removeEventListener(e.event,e.handler,e.capture)}),delete n[e];},d=n?{beforeMount:a,updated:function(e,n){var t=n.value,r=n.oldValue;JSON.stringify(t)!==JSON.stringify(r)&&(o(e),a(e,{value:t}));},unmounted:o}:{};return {install:function(e){e.directive("click-outside",d);},directive:d}});

});function isValidMouseEvent(str) {
  return /^(click|dblclick|main|auxiliar|secondary|left|middle|right)$/.test(str) || /^(ctrl|alt|shift|meta)\.(aux|sec)$/.test(str) || /^((ctrl|alt|shift|meta)\.)?(main|auxiliar|secondary|left|middle|right)$/.test(str) || /^(click|dblclick)(\.(ctrl|alt|shift|meta))?(\.(main|auxiliar|secondary|left|middle|right|aux|sec))?$/.test(str);
}

function getMetaData(e) {
  var isDblClick = /^dblclick/.test(e);
  return {
    click: !isDblClick,
    dblclick: isDblClick,
    ctrl: /ctrl/.test(e),
    meta: /meta/.test(e),
    alt: /alt/.test(e),
    shift: /shift/.test(e),
    main: /(main|left)/.test(e),
    auxiliar: !isDblClick && /(aux|middle)/.test(e),
    secondary: !isDblClick && /(sec|right)/.test(e)
  };
}

function compileEvents(eventsString, options) {
  if (!options || typeof options === "string") return [];
  var events = (eventsString !== null && eventsString !== void 0 ? eventsString : "").replaceAll(/\s/g, "").split(",").filter(function (name) {
    return isValidMouseEvent(name);
  });
  var menuOptions = [];

  var _iterator = _createForOfIteratorHelper(options),
      _step;

  try {
    var _loop = function _loop() {
      var _opt$name;

      var opt = _step.value;
      var name = (_opt$name = opt.name) !== null && _opt$name !== void 0 ? _opt$name : Math.random().toString().slice(2, 5);
      var metaData = [];
      (!opt.on ? events : Array.isArray(opt.on) ? opt.on : [opt.on]). //
      forEach(function (event) {
        return metaData.push(getMetaData(event));
      });
      menuOptions.push(_objectSpread2(_objectSpread2({}, opt), {}, {
        name: name,
        metaData: metaData
      }));
    };

    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      _loop();
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  return menuOptions;
}var script = /*#__PURE__*/vue.defineComponent({
  name: "ContextMenu",
  inheritAttrs: false,
  emits: ["optionClick"],
  props: {
    /**
     * Defines the contextual menu options
     * @see `ContextualMenuOption` type for details.
     */
    options: {
      type: [String, Array],
      required: true
    },

    /** Defines when the context menu is active */
    active: {
      type: Boolean,
      default: true
    },

    /**
     * Defines the icon format used in the contextual menu.
     * - `class`: for font-awesome-like, e.g: `<i class="[icon]" />`
     * - other text: for material-icons-like, e.g: `<i class="[iconFormat]">[icon]</i>`
     */
    iconFormat: String,

    /** Defines a class for the contextual menu wrapper */
    menuClass: String,

    /** Defines a custom class delimitir for complex layouts */
    delimiter: {
      type: String,
      default: "vue-context-menu__content"
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
     * e.g: `click.secondary, dblclick.ctrl.left`
     *
     * The `click` can be omited, but the `dblclick` is required to prevent misunderstandings
     * e.g: `main, dblclick.main`
     *
     * The `left`, `middle` and `right` are alias of `main`, `auxiliar` and `secondary` respectively.
     * @see `MouseEvents` type for the posible values.
     */
    events: {
      type: String,
      default: "secondary",
      validator: function validator(v) {
        return /(click|ctrl|meta|alt|shift|main|aux|sec|left|middle|right)/.test(v);
      }
    }
  },
  setup: function setup(props, _ref) {
    var emit = _ref.emit;
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
    }); // ? Mantener sincronizado el conjunto de posibles menus

    var __menuOptions = vue.computed(function () {
      return Array.isArray(props.options) //
      ? compileEvents(props.events, props.options) : [];
    }); // ? Stores mouse location


    var location = vue.ref({
      x: 0,
      y: 0
    });

    var setLocation = function setLocation(event) {
      location.value = {
        x: event.pageX - props.offsetX,
        y: event.pageY - props.offsetY
      };
    }; // ? Controls wich element has been clicked


    var selectedItem = vue.ref();

    var setSelectedItem = function setSelectedItem(event) {
      try {
        var t = event;
        var id = undefined; // ? subir por el path de elementos hasta encontrar el elemento wrapper del context

        var _iterator = _createForOfIteratorHelper(t.path),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var _el$classList;

            var el = _step.value;

            if (el !== null && el !== void 0 && (_el$classList = el.classList) !== null && _el$classList !== void 0 && _el$classList.contains(props.delimiter)) {
              selectedItem.value = id;
              return id;
            } // ? Store child id
            else id = el.id;
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      } catch (error) {
        console.warn("vue-context-menu: Not found child element attr 'id' of element with class '".concat(props.delimiter, "'"));
      }

      selectedItem.value = undefined;
      return undefined;
    }; // ? Actualizar el menu mostrado


    var slotContextMenu = vue.ref();
    var contextMenu = vue.ref([]);

    var onClick = function onClick(event, mode, btn) {
      visible.value = false;
      if (props.active === false) return;
      event.stopImmediatePropagation();
      var id = setSelectedItem(event);
      if (!id || id.length < 1) return;
      event.preventDefault();
      setLocation(event); // console.log(`Executing contextMenu '${mode}:${btn}'`, event)

      if (typeof props.options === "string") {
        slotContextMenu.value = props.options;
        visible.value = true;
        return false;
      }

      console.log("events", _toConsumableArray(__menuOptions.value));
      contextMenu.value = __menuOptions.value.filter(function (option) {
        if (mode === "dblclick") {
          return option.metaData.some(function (data) {
            return !data.dblclick || data.ctrl && !event.ctrlKey || data.meta && !event.metaKey || data.alt && !event.altKey || data.shift && !event.shiftKey || event.button !== 0 ? false : true;
          });
        } // Single click


        return option.metaData.some(function (data) {
          return (// return option.metaData.some(data =>
            !data.click || data.ctrl && !event.ctrlKey || data.meta && !event.metaKey || data.alt && !event.altKey || data.shift && !event.shiftKey || data.main && event.button !== 0 || // (data.auxiliar && event.button !== 1) ||
            data.auxiliar && btn !== "auxiliar" || // (data.secondary && event.button !== 2) ||
            data.secondary && btn !== "secondary" ? false : true
          );
        });
      });
      console.log("showing menu", _toConsumableArray(contextMenu.value), btn);
      if (contextMenu.value.length > 0) visible.value = true;
      return false;
    };

    return {
      visible: vue.computed(function () {
        return props.active && visible.value;
      }),
      location: vue.computed(function () {
        return {
          left: "".concat(location.value.x, "px"),
          top: "".concat(location.value.y, "px")
        };
      }),
      onClick: onClick,
      contextMenu: contextMenu,
      slotContextMenu: slotContextMenu,
      selectedItem: vue.computed(function () {
        var _selectedItem$value;

        return (_selectedItem$value = selectedItem.value) !== null && _selectedItem$value !== void 0 ? _selectedItem$value : "";
      }),
      optionClicked: function optionClicked(action) {
        hideContextMenu();
        emit("optionClick", {
          action: action,
          item: selectedItem.value
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
});var _hoisted_1 = {
  key: 1
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _directive_click_outside = vue.resolveDirective("click-outside");

  return vue.openBlock(), vue.createBlock(vue.Fragment, null, [vue.createVNode("div", vue.mergeProps(_ctx.$attrs, {
    class: "vue-context-menu__content",
    onClick: _cache[1] || (_cache[1] = vue.withModifiers(function ($event) {
      return _ctx.onClick($event, 'click');
    }, ["prevent", "stop"])),
    onDblclick: _cache[2] || (_cache[2] = vue.withModifiers(function ($event) {
      return _ctx.onClick($event, 'dblclick', 'main');
    }, ["prevent", "stop"])),
    onMouseup: _cache[3] || (_cache[3] = vue.withModifiers(function ($event) {
      return _ctx.onClick($event, 'click', 'auxiliar');
    }, ["middle", "prevent", "stop"])),
    onContextmenu: _cache[4] || (_cache[4] = vue.withModifiers(function ($event) {
      return _ctx.onClick($event, 'click', 'secondary');
    }, ["prevent", "stop"]))
  }), [vue.renderSlot(_ctx.$slots, "default")], 16), _ctx.visible ? vue.withDirectives((vue.openBlock(), vue.createBlock("div", {
    key: 0,
    class: "vue-context-menu",
    style: _ctx.location
  }, [_ctx.slotContextMenu ? vue.renderSlot(_ctx.$slots, _ctx.slotContextMenu, {
    key: 0,
    item: _ctx.selectedItem,
    onClick: _ctx.optionClicked
  }) : (vue.openBlock(), vue.createBlock("ul", {
    key: 1,
    class: ["vue-context-menu__options", [{
      'vue-context-menu--icons': _ctx.iconFormat
    }, _ctx.menuClass]]
  }, [(vue.openBlock(true), vue.createBlock(vue.Fragment, null, vue.renderList(_ctx.contextMenu, function (_ref, index) {
    var use = _ref.use,
        isDivider = _ref.isDivider,
        name = _ref.name,
        label = _ref.label,
        icon = _ref.icon,
        className = _ref.class;
    return vue.openBlock(), vue.createBlock(vue.Fragment, {
      key: index
    }, [use ? vue.renderSlot(_ctx.$slots, use, {
      key: 0,
      onClick: _ctx.optionClicked
    }) : isDivider ? (vue.openBlock(), vue.createBlock("li", {
      key: 1,
      class: ["vue-context-menu__divider", className]
    }, null, 2)) : (vue.openBlock(), vue.createBlock("li", {
      key: 2,
      class: className,
      onClick: vue.withModifiers(function ($event) {
        return _ctx.optionClicked(name !== null && name !== void 0 ? name : '');
      }, ["stop"])
    }, [_ctx.iconFormat && icon ? (vue.openBlock(), vue.createBlock(vue.Fragment, {
      key: 0
    }, [_ctx.iconFormat === 'class' ? (vue.openBlock(), vue.createBlock("i", {
      key: 0,
      class: ["vue-context-menu__icon", icon]
    }, null, 2)) : (vue.openBlock(), vue.createBlock("i", {
      key: 1,
      class: ["vue-context-menu__icon", _ctx.iconFormat]
    }, vue.toDisplayString(icon), 3))], 64)) : vue.createCommentVNode("", true), (label !== null && label !== void 0 ? label : name) ? (vue.openBlock(), vue.createBlock("span", _hoisted_1, vue.toDisplayString(label !== null && label !== void 0 ? label : name), 1)) : vue.createCommentVNode("", true)], 10, ["onClick"]))], 64);
  }), 128))], 2))], 4)), [[_directive_click_outside, _ctx.onClickOutsideConf]]) : vue.createCommentVNode("", true)], 64);
}function styleInject(css, ref) {
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
}var css_248z = "\n.vue-context-menu {\n  --cm_margin: 4px 0;\n  --cm_padding: 5px 24px;\n  --cm_offset: 16px;\n  --cm_gap: 4px;\n  --cm_radius: 4px;\n  --cm_color: #000;\n  --cm_background: #ecf0f1;\n  --cm_shadow: 0 3px 6px 0 rgba(51, 51, 51, 0.2);\n  --cm_font: -apple-system, BlinkMacSystemFont, \"Segoe UI\", \"Roboto\", \"Oxygen\", \"Ubuntu\", \"Cantarell\", \"Fira Sans\", \"Droid Sans\",\n    \"Helvetica Neue\", sans-serif;\n\n  --cm_color--hover: #fff;\n  --cm_background--hover: #ea1e63;\n\n  --cm_divider_padding: 8px;\n  --cm_divider_color: #c0cdd1;\n\n  top: 0;\n  left: 0;\n  margin: 0;\n  padding: 0;\n  display: block;\n  position: absolute;\n  z-index: 1000000;\n}\n.vue-context-menu .vue-context-menu--icons {\n  --cm_offset: 34px;\n  --cm_inset: 8px;\n}\n.vue-context-menu .vue-context-menu__options {\n  display: block;\n  padding: var(--cm_margin);\n  color: var(--cm_color);\n  background-color: var(--cm_background);\n  border-radius: var(--cm_radius);\n  box-shadow: var(--cm_shadow);\n  font-family: var(--cm_font);\n  list-style: none;\n}\n.vue-context-menu .vue-context-menu__options > li {\n  cursor: pointer;\n  position: relative;\n  padding: var(--cm_padding);\n  padding-left: var(--cm_offset);\n}\n.vue-context-menu .vue-context-menu__options > li:hover {\n  color: var(--cm_color--hover);\n  background-color: var(--cm_background--hover);\n}\n.vue-context-menu li.vue-context-menu__divider {\n  pointer-events: none;\n  box-sizing: content-box;\n  height: calc(var(--cm_gap) / 2);\n  padding: var(--cm_divider_padding);\n  background-color: var(--cm_divider_color);\n  background-clip: content-box;\n}\n.vue-context-menu li .vue-context-menu__icon {\n  position: absolute;\n  left: var(--cm_inset);\n}\n";
styleInject(css_248z);script.render = render;// Default export is installable instance of component.
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