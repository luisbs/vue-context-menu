import { defineComponent, ref, onMounted, onBeforeUnmount, watchEffect, computed, resolveDirective, openBlock, createBlock, Fragment, createVNode, mergeProps, withModifiers, renderSlot, withDirectives, renderList, toDisplayString, createCommentVNode } from 'vue';

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
    });

    const compileNameEvent = e => {
      if (!e) return;
      let btn = undefined;
      if (/(main|left)/.test(e)) btn = "main";else if (/(sec|right)/.test(e)) btn = "secondary";else if (/(aux)/.test(e)) btn = "auxiliar";
      if (!btn) return;
      const event = /^dblclick/.test(e) ? "dblclick" : "click";
      let mod = "_";
      if (/ctrl\./.test(e)) mod = "_ctrl_";else if (/alt\./.test(e)) mod = "_alt_";else if (/shift\./.test(e)) mod = "_shift_";else if (/meta\./.test(e)) mod = "_meta_";
      return `${event}${mod}${btn}`;
    }; // ? Mantener sincronizado el conjunto de posibles menus


    const __menuOptionsMap = ref(new Map());

    watchEffect(() => {
      if (typeof props.options === 'string') return;
      __menuOptionsMap.value = new Map();
      props.options.forEach(opt => {
        var _opt$name;

        let name = (_opt$name = opt.name) !== null && _opt$name !== void 0 ? _opt$name : `no-name-${Math.random().toString().slice(2, 5)}`;

        if (!opt.on) {
          __events.value.forEach(e => {
            var _menuOptionsMap$valu;

            const menuName = compileNameEvent(e);
            if (!menuName) return;
            const menu = (_menuOptionsMap$valu = __menuOptionsMap.value.get(menuName)) !== null && _menuOptionsMap$valu !== void 0 ? _menuOptionsMap$valu : [];

            __menuOptionsMap.value.set(menuName, [...menu, { ...(typeof opt === "object" ? opt : {}),
              name
            }]);
          });
        }

        const events = Array.isArray(opt.on) ? opt.on : Array(opt.on);
        events.forEach(e => {
          var _menuOptionsMap$valu2;

          const menuName = compileNameEvent(e);
          if (!menuName) return;
          const menu = (_menuOptionsMap$valu2 = __menuOptionsMap.value.get(menuName)) !== null && _menuOptionsMap$valu2 !== void 0 ? _menuOptionsMap$valu2 : [];

          __menuOptionsMap.value.set(menuName, [...menu, { ...(typeof opt === "object" ? opt : {}),
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
    }; // ? Controls wich element has been clicked


    const selectedItem = ref();

    const setSelectedItem = event => {
      try {
        const t = event;
        let id = undefined; // ? subir por el path de elementos hasta encontrar el elemento wrapper del context

        for (const el of t.path) {
          var _el$classList;

          if (el !== null && el !== void 0 && (_el$classList = el.classList) !== null && _el$classList !== void 0 && _el$classList.contains(props.delimiter)) {
            selectedItem.value = id;
            return id;
          } // ? Store child id
          else id = el.id;
        }
      } catch (error) {
        console.warn(`vue-context-menu: Not found child element attr 'id' of element with class '${props.delimiter}'`);
      }

      selectedItem.value = undefined;
      return undefined;
    }; // ? Actualizar el menu mostrado


    const contextMenu = ref([]);

    const showContextMenu = (event, ev, btn) => {
      const id = setSelectedItem(event);
      if (!id || id.length < 1) return;
      let mod = "_";
      if (event.ctrlKey) mod = "_ctrl_";else if (event.altKey) mod = "_alt_";else if (event.shiftKey) mod = "_shift_";else if (event.metaKey) mod = "_meta_";
      const menuName = `${ev}${mod}${btn}`;

      const menu = __menuOptionsMap.value.get(menuName);

      if (!menu) contextMenu.value = [];else {
        event.stopImmediatePropagation();
        event.preventDefault();
        setLocation(event);
        contextMenu.value = menu;
        visible.value = true;
      }
    };

    const slotContextMenu = ref();

    const showSlotMenu = event => {
      const id = setSelectedItem(event);

      if (typeof props.options !== 'string' || !id || id.length < 1) {
        slotContextMenu.value = undefined;
        return;
      }

      event.stopImmediatePropagation();
      event.preventDefault();
      setLocation(event);
      slotContextMenu.value = props.options;
      visible.value = true;
    };

    return {
      visible: computed(() => props.active && visible.value),
      location: computed(() => ({
        left: `${location.value.x}px`,
        top: `${location.value.y}px`
      })),
      contextMenu,
      slotContextMenu,
      selectedItem: computed(() => {
        var _selectedItem$value;

        return (_selectedItem$value = selectedItem.value) !== null && _selectedItem$value !== void 0 ? _selectedItem$value : "";
      }),
      onClick: (event, mode, btn) => {
        console.log(`Executing contextMenu '${mode}:${btn}'`, event);
        visible.value = false;
        if (props.active === false) return;
        if (typeof props.options === 'string') showSlotMenu(event);else showContextMenu(event, mode, btn);
      },

      optionClicked(action) {
        hideContextMenu();
        emit("optionClick", {
          action,
          item: selectedItem.value
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

const _hoisted_1 = {
  key: 1
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _directive_click_outside = resolveDirective("click-outside");

  return openBlock(), createBlock(Fragment, null, [createVNode("div", mergeProps(_ctx.$attrs, {
    class: "vue-context-menu__content",
    onClick: _cache[1] || (_cache[1] = withModifiers($event => _ctx.onClick($event, 'click', 'main'), ["left", "stop", "prevent"])),
    onMouseup: _cache[2] || (_cache[2] = withModifiers($event => _ctx.onClick($event, 'click', 'auxiliar'), ["middle", "stop", "prevent"])),
    onDblclick: [_cache[3] || (_cache[3] = withModifiers($event => _ctx.onClick($event, 'dblclick', 'main'), ["left", "stop", "prevent"])), _cache[4] || (_cache[4] = withModifiers($event => _ctx.onClick($event, 'dblclick', 'auxiliar'), ["middle", "stop", "prevent"]))],
    onContextmenu: _cache[5] || (_cache[5] = withModifiers($event => _ctx.onClick($event, 'click', 'secondary'), ["stop", "prevent"]))
  }), [renderSlot(_ctx.$slots, "default")], 16), _ctx.visible ? withDirectives((openBlock(), createBlock("div", {
    key: 0,
    class: "vue-context-menu",
    style: _ctx.location
  }, [_ctx.slotContextMenu ? renderSlot(_ctx.$slots, _ctx.slotContextMenu, {
    key: 0,
    item: _ctx.selectedItem,
    onClick: _ctx.optionClicked
  }) : (openBlock(), createBlock("ul", {
    key: 1,
    class: ["vue-context-menu__options", [{
      'vue-context-menu--icons': _ctx.iconFormat
    }, _ctx.menuClass]]
  }, [(openBlock(true), createBlock(Fragment, null, renderList(_ctx.contextMenu, ({
    use,
    isDivider,
    name,
    label,
    icon,
    class: className
  }, index) => {
    return openBlock(), createBlock(Fragment, {
      key: index
    }, [use ? renderSlot(_ctx.$slots, use, {
      key: 0,
      onClick: _ctx.optionClicked
    }) : isDivider ? (openBlock(), createBlock("li", {
      key: 1,
      class: ["vue-context-menu__divider", className]
    }, null, 2)) : (openBlock(), createBlock("li", {
      key: 2,
      class: className,
      onClick: withModifiers($event => _ctx.optionClicked(name !== null && name !== void 0 ? name : ''), ["stop"])
    }, [_ctx.iconFormat && icon ? (openBlock(), createBlock(Fragment, {
      key: 0
    }, [_ctx.iconFormat === 'class' ? (openBlock(), createBlock("i", {
      key: 0,
      class: ["vue-context-menu__icon", icon]
    }, null, 2)) : (openBlock(), createBlock("i", {
      key: 1,
      class: ["vue-context-menu__icon", _ctx.iconFormat]
    }, toDisplayString(icon), 3))], 64)) : createCommentVNode("", true), (label !== null && label !== void 0 ? label : name) ? (openBlock(), createBlock("span", _hoisted_1, toDisplayString(label !== null && label !== void 0 ? label : name), 1)) : createCommentVNode("", true)], 10, ["onClick"]))], 64);
  }), 128))], 2))], 4)), [[_directive_click_outside, _ctx.onClickOutsideConf]]) : createCommentVNode("", true)], 64);
}

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

var css_248z = "\n.vue-context-menu {\n  --cm_margin: 4px 0;\n  --cm_padding: 5px 24px;\n  --cm_offset: 16px;\n  --cm_gap: 4px;\n  --cm_radius: 4px;\n  --cm_color: #000;\n  --cm_background: #ecf0f1;\n  --cm_shadow: 0 3px 6px 0 rgba(51, 51, 51, 0.2);\n  --cm_font: -apple-system, BlinkMacSystemFont, \"Segoe UI\", \"Roboto\", \"Oxygen\", \"Ubuntu\", \"Cantarell\", \"Fira Sans\", \"Droid Sans\",\n    \"Helvetica Neue\", sans-serif;\n\n  --cm_color--hover: #fff;\n  --cm_background--hover: #ea1e63;\n\n  --cm_divider_padding: 8px;\n  --cm_divider_color: #c0cdd1;\n\n  top: 0;\n  left: 0;\n  margin: 0;\n  padding: 0;\n  display: block;\n  position: absolute;\n  z-index: 1000000;\n}\n.vue-context-menu .vue-context-menu--icons {\n  --cm_offset: 34px;\n  --cm_icon_padding: 0 0 0 8px;\n}\n.vue-context-menu .vue-context-menu__options {\n  display: block;\n  padding: var(--cm_margin);\n  color: var(--cm_color);\n  background-color: var(--cm_background);\n  border-radius: var(--cm_radius);\n  box-shadow: var(--cm_shadow);\n  font-family: var(--cm_font);\n  list-style: none;\n}\n.vue-context-menu .vue-context-menu__options > li {\n  cursor: pointer;\n  position: relative;\n  padding: var(--cm_padding);\n  padding-left: var(--cm_offset);\n}\n.vue-context-menu .vue-context-menu__options > li:hover {\n  color: var(--cm_color--hover);\n  background-color: var(--cm_background--hover);\n}\n.vue-context-menu li.vue-context-menu__divider {\n  pointer-events: none;\n  box-sizing: content-box;\n  height: calc(var(--cm_gap) / 2);\n  padding: var(--cm_divider_padding);\n  background-color: var(--cm_divider_color);\n  background-clip: content-box;\n}\n.vue-context-menu li .vue-context-menu__icon {\n  position: absolute;\n  left: 0;\n  padding: var(--cm_icon_padding);\n}\n";
styleInject(css_248z);

script.render = render;

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
