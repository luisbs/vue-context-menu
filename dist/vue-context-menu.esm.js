import { defineComponent, ref, onMounted, onBeforeUnmount, computed, resolveDirective, openBlock, createBlock, Fragment, createVNode, mergeProps, withModifiers, renderSlot, withDirectives, renderList, toDisplayString, createCommentVNode } from 'vue';

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function createCommonjsModule(fn) {
  var module = { exports: {} };
	return fn(module, module.exports), module.exports;
}

var vClickOutside_umd = createCommonjsModule(function (module, exports) {
!function(e,n){module.exports=n();}(commonjsGlobal,function(){var e="__v-click-outside",n="undefined"!=typeof window,t="undefined"!=typeof navigator,r=n&&("ontouchstart"in window||t&&navigator.msMaxTouchPoints>0)?["touchstart"]:["click"],i=function(e){var n=e.event,t=e.handler;(0, e.middleware)(n)&&t(n);},a=function(n,t){var a=function(e){var n="function"==typeof e;if(!n&&"object"!=typeof e)throw new Error("v-click-outside: Binding value must be a function or an object");return {handler:n?e:e.handler,middleware:e.middleware||function(e){return e},events:e.events||r,isActive:!(!1===e.isActive),detectIframe:!(!1===e.detectIframe),capture:Boolean(e.capture)}}(t.value),o=a.handler,d=a.middleware,c=a.detectIframe,u=a.capture;if(a.isActive){if(n[e]=a.events.map(function(e){return {event:e,srcTarget:document.documentElement,handler:function(e){return function(e){var n=e.el,t=e.event,r=e.handler,a=e.middleware,o=t.path||t.composedPath&&t.composedPath();(o?o.indexOf(n)<0:!n.contains(t.target))&&i({event:t,handler:r,middleware:a});}({el:n,event:e,handler:o,middleware:d})},capture:u}}),c){var l={event:"blur",srcTarget:window,handler:function(e){return function(e){var n=e.el,t=e.event,r=e.handler,a=e.middleware;setTimeout(function(){var e=document.activeElement;e&&"IFRAME"===e.tagName&&!n.contains(e)&&i({event:t,handler:r,middleware:a});},0);}({el:n,event:e,handler:o,middleware:d})},capture:u};n[e]=[].concat(n[e],[l]);}n[e].forEach(function(t){var r=t.event,i=t.srcTarget,a=t.handler;return setTimeout(function(){n[e]&&i.addEventListener(r,a,u);},0)});}},o=function(n){(n[e]||[]).forEach(function(e){return e.srcTarget.removeEventListener(e.event,e.handler,e.capture)}),delete n[e];},d=n?{beforeMount:a,updated:function(e,n){var t=n.value,r=n.oldValue;JSON.stringify(t)!==JSON.stringify(r)&&(o(e),a(e,{value:t}));},unmounted:o}:{};return {install:function(e){e.directive("click-outside",d);},directive:d}});

});

function isValidMouseEvent(str) {
  return /^(click|dblclick|main|auxiliar|secondary|left|middle|right)$/.test(str) || /^(ctrl|alt|shift|meta)\.(aux|sec)$/.test(str) || /^((ctrl|alt|shift|meta)\.)?(main|auxiliar|secondary|left|middle|right)$/.test(str) || /^(click|dblclick)(\.(ctrl|alt|shift|meta))?(\.(main|auxiliar|secondary|left|middle|right|aux|sec))?$/.test(str);
}

function getMetaData(e) {
  const isDblClick = /^dblclick/.test(e);
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
  const events = (eventsString !== null && eventsString !== void 0 ? eventsString : "").replaceAll(/\s/g, "").split(",").filter(name => isValidMouseEvent(name));
  const menuOptions = [];

  for (const opt of options) {
    var _opt$name;

    let name = (_opt$name = opt.name) !== null && _opt$name !== void 0 ? _opt$name : Math.random().toString().slice(2, 5);
    const metaData = [];
    (!opt.on ? events : Array.isArray(opt.on) ? opt.on : [opt.on]). //
    forEach(event => metaData.push(getMetaData(event)));
    menuOptions.push({ ...opt,
      name,
      metaData
    });
  }

  return menuOptions;
}
function matchEvent(event, metaData, mode, btn) {
  if (mode === "dblclick") {
    return metaData.some(data => !data.dblclick || data.ctrl && !event.ctrlKey || data.meta && !event.metaKey || data.alt && !event.altKey || data.shift && !event.shiftKey || event.button !== 0 ? false : true);
  } // Single click


  return metaData.some(data => !data.click || data.ctrl && !event.ctrlKey || data.meta && !event.metaKey || data.alt && !event.altKey || data.shift && !event.shiftKey || data.main && event.button !== 0 || // (data.auxiliar && event.button !== 1) ||
  data.auxiliar && btn !== "auxiliar" || // (data.secondary && event.button !== 2) ||
  data.secondary && btn !== "secondary" ? false : true);
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
      validator: v => /(click|ctrl|meta|alt|shift|main|aux|sec|left|middle|right)/.test(v)
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
    onBeforeUnmount(() => document.body.removeEventListener("keyup", onEscKeyRelease)); // ? Mantener sincronizado el conjunto de posibles menus

    const __menuOptions = computed(() => Array.isArray(props.options) //
    ? compileEvents(props.events, props.options) : compileEvents(props.events, [{}])); // ? Stores mouse location


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
        console.log(`Looking for selected element on ${props.delimiter}`);
        let id = undefined; // ? subir por el path de elementos hasta encontrar el elemento wrapper del context

        for (const el of t.path) {
          var _el$classList;

          console.log(`stored id: '${id}', testing:`, el, el === null || el === void 0 ? void 0 : el.classList);

          if (el !== null && el !== void 0 && (_el$classList = el.classList) !== null && _el$classList !== void 0 && _el$classList.contains(props.delimiter)) {
            console.log(`found delimiter, selected child with id '${id}'`);
            selectedItem.value = id;
            return id;
          } // else id = el.id
          // ? Store child id
          else {
              console.log(`storing '${el.id}', going up`);
              id = el.id;
            }
        }
      } catch (error) {
        console.warn(`vue-context-menu: Not found child element attr 'id' of element with class '${props.delimiter}'`);
      }

      selectedItem.value = undefined;
      return undefined;
    }; // ? Actualizar el menu mostrado


    const slotContextMenu = ref();
    const contextMenu = ref([]);

    const onClick = (event, mode, btn) => {
      visible.value = false;
      if (props.active === false) return;
      event.stopImmediatePropagation();
      const id = setSelectedItem(event);
      if (!id || id.length < 1) return;
      event.preventDefault();
      setLocation(event);

      if (typeof props.options === "string" && __menuOptions.value.length === 1 && matchEvent(event, __menuOptions.value[0].metaData, mode, btn)) {
        slotContextMenu.value = props.options;
        visible.value = true;
        return false;
      }

      contextMenu.value = __menuOptions.value.filter(option => matchEvent(event, option.metaData, mode, btn));
      if (contextMenu.value.length > 0) visible.value = true;
      return false;
    };

    return {
      visible: computed(() => props.active && visible.value),
      location: computed(() => ({
        left: `${location.value.x}px`,
        top: `${location.value.y}px`
      })),
      onClick,
      contextMenu,
      slotContextMenu,
      selectedItem: computed(() => {
        var _selectedItem$value;

        return (_selectedItem$value = selectedItem.value) !== null && _selectedItem$value !== void 0 ? _selectedItem$value : "";
      }),

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
    onClick: _cache[1] || (_cache[1] = withModifiers($event => _ctx.onClick($event, 'click'), ["prevent", "stop"])),
    onDblclick: _cache[2] || (_cache[2] = withModifiers($event => _ctx.onClick($event, 'dblclick', 'main'), ["prevent", "stop"])),
    onMouseup: _cache[3] || (_cache[3] = withModifiers($event => _ctx.onClick($event, 'click', 'auxiliar'), ["middle", "prevent", "stop"])),
    onContextmenu: _cache[4] || (_cache[4] = withModifiers($event => _ctx.onClick($event, 'click', 'secondary'), ["prevent", "stop"]))
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

var css_248z = "\n.vue-context-menu {\n  --cm_margin: 4px 0;\n  --cm_padding: 5px 24px;\n  --cm_offset: 16px;\n  --cm_gap: 4px;\n  --cm_radius: 4px;\n  --cm_color: #000;\n  --cm_background: #ecf0f1;\n  --cm_shadow: 0 3px 6px 0 rgba(51, 51, 51, 0.2);\n  --cm_font: -apple-system, BlinkMacSystemFont, \"Segoe UI\", \"Roboto\", \"Oxygen\", \"Ubuntu\", \"Cantarell\", \"Fira Sans\", \"Droid Sans\",\n    \"Helvetica Neue\", sans-serif;\n\n  --cm_color--hover: #fff;\n  --cm_background--hover: #ea1e63;\n\n  --cm_divider_padding: 8px;\n  --cm_divider_color: #c0cdd1;\n\n  top: 0;\n  left: 0;\n  margin: 0;\n  padding: 0;\n  display: block;\n  position: absolute;\n  z-index: 1000000;\n}\n.vue-context-menu .vue-context-menu--icons {\n  --cm_offset: 34px;\n  --cm_inset: 8px;\n}\n.vue-context-menu .vue-context-menu__options {\n  display: block;\n  padding: var(--cm_margin);\n  color: var(--cm_color);\n  background-color: var(--cm_background);\n  border-radius: var(--cm_radius);\n  box-shadow: var(--cm_shadow);\n  font-family: var(--cm_font);\n  list-style: none;\n}\n.vue-context-menu .vue-context-menu__options > li {\n  cursor: pointer;\n  position: relative;\n  padding: var(--cm_padding);\n  padding-left: var(--cm_offset);\n}\n.vue-context-menu .vue-context-menu__options > li:hover {\n  color: var(--cm_color--hover);\n  background-color: var(--cm_background--hover);\n}\n.vue-context-menu li.vue-context-menu__divider {\n  pointer-events: none;\n  box-sizing: content-box;\n  height: calc(var(--cm_gap) / 2);\n  padding: var(--cm_divider_padding);\n  background-color: var(--cm_divider_color);\n  background-clip: content-box;\n}\n.vue-context-menu li .vue-context-menu__icon {\n  position: absolute;\n  left: var(--cm_inset);\n}\n";
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
