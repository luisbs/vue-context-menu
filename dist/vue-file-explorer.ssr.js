'use strict';var vue=require('vue');function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
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

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}var script = /*#__PURE__*/vue.defineComponent({
  name: "VueFileExplorer",
  emits: ["initialLoad", "load", "rename"],
  props: {
    layout: {
      type: String,
      default: "details",
      validator: function validator(v) {
        return ["details", "cards"].includes(v);
      }
    },
    render: Function
  },
  setup: function setup(props) {
    var _layout = vue.ref(props.layout);

    var TREE = vue.ref(new Map());
    var folderId = vue.ref(Array.from(TREE.value.keys())[0] || 0);
    var explorer = vue.ref();
    vue.watchEffect(function () {
      if (!explorer.value) return;
      explorer.value.querySelectorAll("button[data-layout]").forEach(function (el) {
        return _layout.value = el.dataset.layout || "details";
      }); // explorer.value.querySelectorAll<HTMLElement>("button[data-open]")
      // explorer.value.querySelectorAll<HTMLElement>("button[data-rename]")
    }, {
      flush: "post"
    });
    return {
      layoutType: _layout,
      folderId: folderId,
      explorer: explorer,
      path: vue.computed(function () {
        var _folderId$value;

        var path = [];
        var isRoot = false;
        var id = (_folderId$value = folderId.value) !== null && _folderId$value !== void 0 ? _folderId$value : 0;

        do {
          if (!TREE.value.has(id)) isRoot = true;else {
            var dt = TREE.value.get(id) || {};

            if (dt.parentId) {
              path.unshift([id, dt.name]);
              id = dt.parentId;
            } else {
              path.unshift([id, dt.name, true]);
              isRoot = true;
            }
          }
        } while (!isRoot);

        return path;
      }),
      content: vue.computed(function () {
        return TREE.value.get(folderId.value) || {
          folders: [],
          files: []
        };
      })
    };
  }
});var _hoisted_1 = {
  ref: "explorer",
  class: "vue-file-explorer"
};
var _hoisted_2 = {
  class: "vfe-bar"
};
var _hoisted_3 = {
  class: "vfe-path"
};
var _hoisted_4 = {
  class: "vfe-layout"
};

var _hoisted_5 = /*#__PURE__*/vue.createVNode("button", {
  type: "button",
  "data-layout": "cards"
}, "Cards Layout", -1);

var _hoisted_6 = /*#__PURE__*/vue.createVNode("button", {
  type: "button",
  "data-layout": "details"
}, "Details Layout", -1);

var _hoisted_7 = {
  class: "vfe-content"
};
var _hoisted_8 = {
  key: 0,
  class: "vfe-cards"
};
var _hoisted_9 = {
  key: 1,
  class: "vfe-details"
};

var _hoisted_10 = /*#__PURE__*/vue.createVNode("thead", null, [/*#__PURE__*/vue.createVNode("tr", null, [/*#__PURE__*/vue.createVNode("th", null, "Id"), /*#__PURE__*/vue.createVNode("th", null, "Name"), /*#__PURE__*/vue.createVNode("th", null, "Actions")])], -1);

var _hoisted_11 = /*#__PURE__*/vue.createVNode("td", null, null, -1);

var _hoisted_12 = /*#__PURE__*/vue.createVNode("td", null, null, -1);

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return vue.openBlock(), vue.createBlock("div", _hoisted_1, [vue.createVNode("div", _hoisted_2, [vue.createVNode("div", _hoisted_3, [vue.renderSlot(_ctx.$slots, "folder-path", {
    path: _ctx.path
  }, function () {
    return [(vue.openBlock(true), vue.createBlock(vue.Fragment, null, vue.renderList(_ctx.path, function (p, i) {
      return vue.openBlock(), vue.createBlock("button", {
        key: i,
        type: "button",
        "data-open": p[0]
      }, vue.toDisplayString(p[1]), 9, ["data-open"]);
    }), 128))];
  })]), vue.createVNode("div", _hoisted_4, [vue.renderSlot(_ctx.$slots, "layout-selector", {}, function () {
    return [_hoisted_5, _hoisted_6];
  })])]), vue.createVNode("div", _hoisted_7, [_ctx.layoutType === 'cards' ? (vue.openBlock(), vue.createBlock("div", _hoisted_8)) : (vue.openBlock(), vue.createBlock("table", _hoisted_9, [vue.createVNode("table", null, [vue.renderSlot(_ctx.$slots, "thead", {}, function () {
    return [_hoisted_10];
  }), vue.renderSlot(_ctx.$slots, "tbody", {}, function () {
    return [vue.createVNode("tbody", null, [(vue.openBlock(true), vue.createBlock(vue.Fragment, null, vue.renderList(_ctx.content.folders, function (_ref, i) {
      var id = _ref.id,
          name = _ref.name;
      return vue.openBlock(), vue.createBlock("tr", {
        key: i
      }, [vue.createVNode("td", null, vue.toDisplayString(id), 1), vue.createVNode("td", null, vue.toDisplayString(name), 1), _hoisted_11]);
    }), 128)), (vue.openBlock(true), vue.createBlock(vue.Fragment, null, vue.renderList(_ctx.content.files, function (_ref2, i) {
      var id = _ref2.id,
          name = _ref2.name;
      return vue.openBlock(), vue.createBlock("tr", {
        key: i
      }, [vue.createVNode("td", null, vue.toDisplayString(id), 1), vue.createVNode("td", null, vue.toDisplayString(name), 1), _hoisted_12]);
    }), 128))])];
  })])]))])], 512);
}script.render = render;// Import vue component

// Default export is installable instance of component.
// IIFE injects install function into component, allowing component
// to be registered via Vue.use() as well as Vue.component(),
var component = /*#__PURE__*/(function () {
  // Assign InstallableComponent type
  var installable = script; // Attach install function executed by Vue.use()

  installable.install = function (app) {
    app.component("FileExplorer", installable);
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