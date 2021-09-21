import { defineComponent, ref, watchEffect, computed, openBlock, createBlock, createVNode, renderSlot, Fragment, renderList, toDisplayString } from 'vue';

var script = /*#__PURE__*/defineComponent({
  name: "FileExplorer",
  emits: ["initialLoad", "load", "rename"],
  props: {
    layout: {
      type: String,
      default: "details",
      validator: v => ["details", "cards"].includes(v)
    },
    render: Function
  },

  setup(props) {
    const _layout = ref(props.layout);

    const TREE = ref(new Map());
    const folderId = ref(Array.from(TREE.value.keys())[0] || 0);
    const explorer = ref();
    watchEffect(() => {
      if (!explorer.value) return;
      explorer.value.querySelectorAll("button[data-layout]").forEach(el => _layout.value = el.dataset.layout || "details"); // explorer.value.querySelectorAll<HTMLElement>("button[data-open]")
      // explorer.value.querySelectorAll<HTMLElement>("button[data-rename]")
    }, {
      flush: "post"
    });
    return {
      layoutType: _layout,
      folderId,
      explorer,
      path: computed(() => {
        var _folderId$value;

        const path = [];
        let isRoot = false;
        let id = (_folderId$value = folderId.value) !== null && _folderId$value !== void 0 ? _folderId$value : 0;

        do {
          if (!TREE.value.has(id)) isRoot = true;else {
            const dt = TREE.value.get(id) || {};

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
      content: computed(() => TREE.value.get(folderId.value) || {
        folders: [],
        files: []
      })
    };
  }

});

const _hoisted_1 = {
  ref: "explorer",
  class: "vue-file-explorer"
};
const _hoisted_2 = {
  class: "vfe-bar"
};
const _hoisted_3 = {
  class: "vfe-path"
};
const _hoisted_4 = {
  class: "vfe-layout"
};

const _hoisted_5 = /*#__PURE__*/createVNode("button", {
  type: "button",
  "data-layout": "cards"
}, "Cards Layout", -1);

const _hoisted_6 = /*#__PURE__*/createVNode("button", {
  type: "button",
  "data-layout": "details"
}, "Details Layout", -1);

const _hoisted_7 = {
  class: "vfe-content"
};
const _hoisted_8 = {
  key: 0,
  class: "vfe-cards"
};
const _hoisted_9 = {
  key: 1,
  class: "vfe-details"
};

const _hoisted_10 = /*#__PURE__*/createVNode("thead", null, [/*#__PURE__*/createVNode("tr", null, [/*#__PURE__*/createVNode("th", null, "Id"), /*#__PURE__*/createVNode("th", null, "Name"), /*#__PURE__*/createVNode("th", null, "Actions")])], -1);

const _hoisted_11 = /*#__PURE__*/createVNode("td", null, null, -1);

const _hoisted_12 = /*#__PURE__*/createVNode("td", null, null, -1);

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock("div", _hoisted_1, [createVNode("div", _hoisted_2, [createVNode("div", _hoisted_3, [renderSlot(_ctx.$slots, "folder-path", {
    path: _ctx.path
  }, () => [(openBlock(true), createBlock(Fragment, null, renderList(_ctx.path, (p, i) => {
    return openBlock(), createBlock("button", {
      key: i,
      type: "button",
      "data-open": p[0]
    }, toDisplayString(p[1]), 9, ["data-open"]);
  }), 128))])]), createVNode("div", _hoisted_4, [renderSlot(_ctx.$slots, "layout-selector", {}, () => [_hoisted_5, _hoisted_6])])]), createVNode("div", _hoisted_7, [_ctx.layoutType === 'cards' ? (openBlock(), createBlock("div", _hoisted_8)) : (openBlock(), createBlock("table", _hoisted_9, [createVNode("table", null, [renderSlot(_ctx.$slots, "thead", {}, () => [_hoisted_10]), renderSlot(_ctx.$slots, "tbody", {}, () => [createVNode("tbody", null, [(openBlock(true), createBlock(Fragment, null, renderList(_ctx.content.folders, ({
    id,
    name
  }, i) => {
    return openBlock(), createBlock("tr", {
      key: i
    }, [createVNode("td", null, toDisplayString(id), 1), createVNode("td", null, toDisplayString(name), 1), _hoisted_11]);
  }), 128)), (openBlock(true), createBlock(Fragment, null, renderList(_ctx.content.files, ({
    id,
    name
  }, i) => {
    return openBlock(), createBlock("tr", {
      key: i
    }, [createVNode("td", null, toDisplayString(id), 1), createVNode("td", null, toDisplayString(name), 1), _hoisted_12]);
  }), 128))])])])]))])], 512);
}

script.render = render;

// Import vue component

// Default export is installable instance of component.
// IIFE injects install function into component, allowing component
// to be registered via Vue.use() as well as Vue.component(),
var entry_esm = /*#__PURE__*/(() => {
  // Assign InstallableComponent type
  const installable = script; // Attach install function executed by Vue.use()

  installable.install = app => {
    app.component("FileExplorer", installable);
  };

  return installable;
})(); // It's possible to expose named exports when writing components that can
// also be used as directives, etc. - eg. import { RollupDemoDirective } from 'rollup-demo';
// export const RollupDemoDirective = directive;

export default entry_esm;
