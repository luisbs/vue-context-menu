import { defineComponent, ref, onMounted, onBeforeUnmount, watchEffect, computed, resolveDirective, openBlock, createBlock, Fragment, createVNode, mergeProps, withModifiers, renderSlot, createCommentVNode, withDirectives, renderList, toDisplayString, withScopeId } from 'vue';

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function createCommonjsModule(fn) {
  var module = { exports: {} };
	return fn(module, module.exports), module.exports;
}

var vClickOutside_umd = createCommonjsModule(function (module, exports) {
!function(e,n){module.exports=n();}(commonjsGlobal,function(){var e="__v-click-outside",n="undefined"!=typeof window,t="undefined"!=typeof navigator,r=n&&("ontouchstart"in window||t&&navigator.msMaxTouchPoints>0)?["touchstart"]:["click"],i=function(e){var n=e.event,t=e.handler;(0, e.middleware)(n)&&t(n);},a=function(n,t){var a=function(e){var n="function"==typeof e;if(!n&&"object"!=typeof e)throw new Error("v-click-outside: Binding value must be a function or an object");return {handler:n?e:e.handler,middleware:e.middleware||function(e){return e},events:e.events||r,isActive:!(!1===e.isActive),detectIframe:!(!1===e.detectIframe),capture:Boolean(e.capture)}}(t.value),o=a.handler,d=a.middleware,c=a.detectIframe,u=a.capture;if(a.isActive){if(n[e]=a.events.map(function(e){return {event:e,srcTarget:document.documentElement,handler:function(e){return function(e){var n=e.el,t=e.event,r=e.handler,a=e.middleware,o=t.path||t.composedPath&&t.composedPath();(o?o.indexOf(n)<0:!n.contains(t.target))&&i({event:t,handler:r,middleware:a});}({el:n,event:e,handler:o,middleware:d})},capture:u}}),c){var l={event:"blur",srcTarget:window,handler:function(e){return function(e){var n=e.el,t=e.event,r=e.handler,a=e.middleware;setTimeout(function(){var e=document.activeElement;e&&"IFRAME"===e.tagName&&!n.contains(e)&&i({event:t,handler:r,middleware:a});},0);}({el:n,event:e,handler:o,middleware:d})},capture:u};n[e]=[].concat(n[e],[l]);}n[e].forEach(function(t){var r=t.event,i=t.srcTarget,a=t.handler;return setTimeout(function(){n[e]&&i.addEventListener(r,a,u);},0)});}},o=function(n){(n[e]||[]).forEach(function(e){return e.srcTarget.removeEventListener(e.event,e.handler,e.capture)}),delete n[e];},d=n?{beforeMount:a,updated:function(e,n){var t=n.value,r=n.oldValue;JSON.stringify(t)!==JSON.stringify(r)&&(o(e),a(e,{value:t}));},unmounted:o}:{};return {install:function(e){e.directive("click-outside",d);},directive:d}});

});

function isValidMouseEvent(str) {
  return /^(click|dblclick|main|auxiliar|secondary|left|right)?$/.test(str) || /^ctrl\.(aux|sec)$/.test(str) || /^(ctrl\.)?(main|auxiliar|secondary|left|right)$/.test(str) || /^(click|dblclick)((\.ctrl)?\.(main|auxiliar|secondary|left|right|aux|sec))?$/.test(str);
}

var script = /*#__PURE__*/defineComponent({
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
      validator: v => /(click|main|aux|sec|left|right)/.test(v)
    }
  },

  setup(props, {
    emit
  }) {
    const item = ref(0);
    const visible = ref(false);

    const hideContextMenu = () => visible.value = false;

    const onEscKeyRelease = event => {
      if (event.key === "Escape") hideContextMenu();
    };

    onMounted(() => document.body.addEventListener("keyup", onEscKeyRelease));
    onBeforeUnmount(() => document.body.removeEventListener("keyup", onEscKeyRelease));

    const __events = ref([]);

    const __catchClick = ref(false);

    const __catchDblClick = ref(false);

    watchEffect(() => {
      __catchClick.value = __catchDblClick.value = false;
      __events.value = props.events.split(",").filter(e => {
        const valid = isValidMouseEvent(e);

        if (valid) {
          if (/^dblclick/.test(e)) __catchDblClick.value = true;else __catchClick.value = true;
        }

        return valid;
      });
    }); // ? Mantener sincronizado el conjunto de posibles menus

    const __menuOptionsMap = ref(new Map());

    watchEffect(() => {
      if (typeof props.options === 'string') return;
      __menuOptionsMap.value = new Map();
      props.options.forEach(m => {
        var _m$name;

        let name = (_m$name = m.name) !== null && _m$name !== void 0 ? _m$name : `no-name-${Math.random().toString().slice(2, 5)}`;
        const events = Array.isArray(m.on) ? m.on : Array(m.on);
        events.forEach(e => {
          var _menuOptionsMap$valu;

          if (!e) return;
          let btn = undefined;
          if (/(main|left)/.test(e)) btn = "main";else if (/(sec|right)/.test(e)) btn = "secondary";else if (/(aux)/.test(e)) btn = "auxiliar";
          if (!btn) return;
          const ev = /^dblclick/.test(e) ? "dblclick" : "click";
          let mod = "_";
          if (/ctrl\./.test(e)) mod = "_ctrl_";else if (/alt\./.test(e)) mod = "_alt_";else if (/shift\./.test(e)) mod = "_shift_";else if (/meta\./.test(e)) mod = "_meta_";
          const menuName = `${ev}${mod}${btn}`;
          const menu = (_menuOptionsMap$valu = __menuOptionsMap.value.get(menuName)) !== null && _menuOptionsMap$valu !== void 0 ? _menuOptionsMap$valu : [];

          __menuOptionsMap.value.set(menuName, [...menu, { ...(typeof m === "object" ? m : {}),
            name
          }]);
        });
      });
    });
    const location = ref({
      x: 0,
      y: 0
    });

    const setLocation = event => {
      location.value = {
        x: event.pageX - props.offsetX,
        y: event.pageY - props.offsetY
      };
    }; // ? Actualizar el menu mostrado


    const contextMenu = ref([]);

    const showContextMenu = (event, ev, btn) => {
      var _id, _id2;

      const t = event; // let id = t.target.id ?? ""

      let id = undefined;

      if (t.path) {
        // ? subir por el path de elementos hasta encontrar el elemento wrapper del context
        t.path.some(p => {
          var _p$classList;

          if (p !== null && p !== void 0 && (_p$classList = p.classList) !== null && _p$classList !== void 0 && _p$classList.contains(props.delimiter)) return true;
          id = p.id;
        });
      }

      item.value = (_id = id) !== null && _id !== void 0 ? _id : "";
      if (((_id2 = id) !== null && _id2 !== void 0 ? _id2 : "").length < 1) return;
      let mod = "_";
      if (event.ctrlKey) mod = "_ctrl_";else if (event.altKey) mod = "_alt_";else if (event.shiftKey) mod = "_shift_";else if (event.metaKey) mod = "_meta_";
      const menuName = `${ev}${mod}${btn}`;

      const menu = __menuOptionsMap.value.get(menuName);

      if (!menu) contextMenu.value = [];else {
        event.stopImmediatePropagation();
        event.preventDefault();
        setLocation(event);
        contextMenu.value = menu;
      }
    };

    const slotContextMenu = ref();

    const showSlotMenu = event => {
      if (typeof props.options !== 'string') slotContextMenu.value = undefined;else {
        event.stopImmediatePropagation();
        event.preventDefault();
        setLocation(event);
        slotContextMenu.value = props.options;
      }
    };

    return {
      visible: computed(() => props.active && visible.value),
      location: computed(() => ({
        left: `${location.value.x}px`,
        top: `${location.value.y}px`
      })),
      slotContextMenu,
      contextMenu,
      onClick: (event, mode, btn) => {
        visible.value = false;
        if (props.active === false) return;
        if (typeof props.options === 'string') showSlotMenu(event);else showContextMenu(event, mode, btn);
        visible.value = true;
      },

      optionClicked(action) {
        hideContextMenu();
        emit("optionClick", {
          action,
          item: item.value
        });
      },

      // ? Configuration for click outside directive
      onClickOutsideConf: computed(() => ({
        handler: () => hideContextMenu(),
        isActive: visible.value
      }))
    };
  }

});

const _withId = /*#__PURE__*/withScopeId("data-v-12140889");

const render = /*#__PURE__*/_withId((_ctx, _cache, $props, $setup, $data, $options) => {
  const _directive_click_outside = resolveDirective("click-outside");

  return openBlock(), createBlock(Fragment, null, [createVNode("div", mergeProps(_ctx.$attrs, {
    class: "context-menu__content",
    onClick: _cache[1] || (_cache[1] = withModifiers($event => _ctx.onClick($event, 'click', 'main'), ["left", "prevent", "stop"])),
    onMouseup: _cache[2] || (_cache[2] = withModifiers($event => _ctx.onClick($event, 'click', 'auxiliar'), ["middle", "prevent", "stop"])),
    onContextmenu: _cache[3] || (_cache[3] = withModifiers($event => _ctx.onClick($event, 'click', 'secondary'), ["right", "prevent", "stop"])),
    onDblclick: [_cache[4] || (_cache[4] = withModifiers($event => _ctx.onClick($event, 'dblclick', 'main'), ["left", "prevent", "stop"])), _cache[5] || (_cache[5] = withModifiers($event => _ctx.onClick($event, 'dblclick', 'auxiliar'), ["middle", "prevent", "stop"])), _cache[6] || (_cache[6] = withModifiers($event => _ctx.onClick($event, 'dblclick', 'secondary'), ["right", "prevent", "stop"]))]
  }), [renderSlot(_ctx.$slots, "default")], 16), _ctx.visible ? (openBlock(), createBlock(Fragment, {
    key: 0
  }, [_ctx.slotContextMenu ? renderSlot(_ctx.$slots, _ctx.slotContextMenu, {
    key: 0
  }) : createCommentVNode("", true), withDirectives(createVNode("ul", {
    class: "context-menu",
    style: _ctx.location
  }, [(openBlock(true), createBlock(Fragment, null, renderList(_ctx.contextMenu, ({
    type,
    name,
    label,
    icon,
    class: className,
    slot: slotName
  }, index) => {
    var _ref;

    return openBlock(), createBlock(Fragment, {
      key: index
    }, [slotName ? renderSlot(_ctx.$slots, slotName, {
      key: 0
    }) : createCommentVNode("", true), type === 'divider' ? (openBlock(), createBlock("li", {
      key: 1,
      class: ["context-menu__divider", className]
    }, null, 2)) : (openBlock(), createBlock("li", {
      key: 2,
      class: className,
      onClick: withModifiers($event => _ctx.optionClicked(name !== null && name !== void 0 ? name : ''), ["stop"])
    }, [_ctx.iconFormat === 'class' ? (openBlock(), createBlock("i", {
      key: 0,
      class: icon
    }, null, 2)) : (openBlock(), createBlock("i", {
      key: 1,
      class: _ctx.iconFormat
    }, toDisplayString(icon), 3)), createVNode("span", null, toDisplayString((_ref = label !== null && label !== void 0 ? label : name) !== null && _ref !== void 0 ? _ref : ""), 1)], 10, ["onClick"]))], 64);
  }), 128))], 4), [[_directive_click_outside, _ctx.onClickOutsideConf]])], 64)) : createCommentVNode("", true)], 64);
});

function styleInject(css, ref) {
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
}

var css_248z = "\n.context-menu[data-v-12140889] {\n  --cm-light-grey: #ecf0f1;\n  /* --cm-grey: darken(var(--cm-light-grey), 15%); */\n  --cm-grey: #c0cdd1;\n  --cm-blue: #007aff;\n  --cm-white: #fff;\n  --cm-black: #333;\n  --cm-black-shadow: rgba(51, 51, 51, 0.2);\n\n  top: 0;\n  left: 0;\n  margin: 0;\n  padding: 0;\n  display: block;\n  list-style: none;\n  position: absolute;\n  z-index: 1000000;\n  background-color: var(--cm-light-grey);\n  border-bottom-width: 0px;\n  font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", \"Roboto\", \"Oxygen\", \"Ubuntu\", \"Cantarell\", \"Fira Sans\", \"Droid Sans\",\n    \"Helvetica Neue\", sans-serif;\n  box-shadow: 0 3px 6px 0 var(--cm-black-shadow);\n  border-radius: 4px;\n}\n.context-menu > li[data-v-12140889] {\n  display: flex;\n  align-items: center;\n  padding: 5px 15px;\n  color: var(--cm-black);\n  cursor: pointer;\n}\n.context-menu > li[data-v-12140889]:hover {\n  background-color: var(--cm-blue);\n  color: var(--cm-white);\n}\n.context-menu .context-menu__divider[data-v-12140889] {\n  box-sizing: content-box;\n  height: 2px;\n  background-color: var(--cm-grey);\n  padding: 4px 0;\n  background-clip: content-box;\n  pointer-events: none;\n}\n.context-menu li[data-v-12140889]:first-of-type {\n  margin-top: 4px;\n}\n.context-menu li[data-v-12140889]:last-of-type {\n  margin-bottom: 4px;\n}\n";
styleInject(css_248z);

script.render = render;
script.__scopeId = "data-v-12140889";

// Default export is installable instance of component.
// IIFE injects install function into component, allowing component
// to be registered via Vue.use() as well as Vue.component(),
var entry_esm = /*#__PURE__*/(() => {
  // Assign InstallableComponent type
  const installable = script; // Attach install function executed by Vue.use()

  installable.install = app => {
    app.use(vClickOutside_umd);
    app.component("ContextMenu", installable);
  };

  return installable;
})(); // It's possible to expose named exports when writing components that can
// also be used as directives, etc. - eg. import { RollupDemoDirective } from 'rollup-demo';
// export const RollupDemoDirective = directive;

export default entry_esm;
