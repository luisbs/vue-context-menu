<script lang="ts">
import { computed, defineComponent, onBeforeUnmount, onMounted, ref } from "vue"
import { ContextualMenuOption, MenuOptions, MouseClick } from "vue-context-menu"
import { compileEvents, matchEvent, findInPath } from "./functions"

export default /*#__PURE__*/ defineComponent({
  name: "ContextMenu",
  inheritAttrs: false,
  emits: ["optionClick"],
  props: {
    /**
     * Defines the contextual menu options
     * @see `ContextualMenuOption` type for details.
     */
    options: { type: [String, Array], required: true },
    /** Defines when the context menu is active */
    active: { type: Boolean, default: true },
    /**
     * Defines the icon format used in the contextual menu.
     * - `class`: for font-awesome-like, e.g: `<i class="[icon]" />`
     * - other text: for material-icons-like, e.g: `<i class="[iconFormat]">[icon]</i>`
     */
    iconFormat: String,
    /** Defines a class for the contextual menu wrapper */
    menuClass: String,
    /** Defines a custom class delimitir for indentification of the elements inside a complex html layout */
    delimiter: { type: String, default: "vue-context-menu__content" },
    /** Defines the html attr to use as the element identifier (Default: `id`) */
    attr: { type: String, default: "id" },
    /** Corrects offsetX when using `position: relative` on parent */
    offsetX: { type: Number, default: 0 },
    /** Corrects offsetY when using `position: relative` on parent */
    offsetY: { type: Number, default: 0 },
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
      validator: (v: string) => /(click|ctrl|meta|alt|shift|main|aux|sec|left|middle|right)/.test(v),
    },
  },
  setup(props, { emit }) {
    const visible = ref(false)

    const hideContextMenu = () => (visible.value = false)
    const onEscKeyRelease = (event: KeyboardEvent) => {
      if (event.key === "Escape") hideContextMenu()
    }

    onMounted(() => document.body.addEventListener("keyup", onEscKeyRelease))
    onBeforeUnmount(() => document.body.removeEventListener("keyup", onEscKeyRelease))

    // ? Mantener sincronizado el conjunto de posibles menus
    const __menuOptions = computed<MenuOptions>(() =>
      Array.isArray(props.options) //
        ? compileEvents(props.events, props.options as ContextualMenuOption[])
        : compileEvents(props.events, [{}] as ContextualMenuOption[])
    )

    // ? Stores mouse location
    const location = ref<Record<"x" | "y", number>>({ x: 0, y: 0 })
    const setLocation = (event: MouseEvent) => {
      location.value = {
        x: event.pageX - props.offsetX,
        y: event.pageY - props.offsetY,
      }
    }

    // ? Controls wich element has been clicked
    const selectedItem = ref<string>()

    // ? Actualizar el menu mostrado
    const slotContextMenu = ref<string>()
    const contextMenu = ref<ContextualMenuOption[]>([])
    const onClick = (event: MouseEvent, mode: MouseClick, btn?: string) => {
      visible.value = false
      if (props.active === false) return
      event.stopImmediatePropagation()

      const id = findInPath(event, props.delimiter, props.attr)
      if (!id || id.length < 1) return
      selectedItem.value = id

      event.preventDefault()
      setLocation(event)

      if (
        typeof props.options === "string" &&
        __menuOptions.value.length === 1 &&
        matchEvent(event, __menuOptions.value[0].metaData, mode, btn)
      ) {
        slotContextMenu.value = props.options
        visible.value = true
        return false
      }

      contextMenu.value = __menuOptions.value.filter(option => matchEvent(event, option.metaData, mode, btn))
      if (contextMenu.value.length > 0) visible.value = true
      return false
    }

    return {
      visible: computed(() => props.active && visible.value),
      location: computed(() => ({
        left: `${location.value.x}px`,
        top: `${location.value.y}px`,
      })),

      onClick,
      contextMenu,
      slotContextMenu,
      selectedItem: computed(() => selectedItem.value ?? ""),

      optionClicked(action: string) {
        hideContextMenu()
        emit("optionClick", { action, item: selectedItem.value })
      },

      // ? Configuration for click outside directive
      onClickOutsideConf: computed(() => ({
        handler: () => hideContextMenu(),
        isActive: visible.value,
      })),
    }
  },
})
</script>

<template>
  <!-- eslint-disable-next-line -->
  <div
    v-bind="$attrs"
    class="vue-context-menu__content"
    @click.prevent.stop="onClick($event, 'click')"
    @dblclick.prevent.stop="onClick($event, 'dblclick', 'main')"
    @click.middle.prevent.stop="onClick($event, 'click', 'auxiliar')"
    @contextmenu.prevent.stop="onClick($event, 'click', 'secondary')"
  >
    <slot />
  </div>

  <div v-if="visible" class="vue-context-menu" :style="location" v-click-outside="onClickOutsideConf">
    <slot v-if="slotContextMenu" :name="slotContextMenu" :item="selectedItem" :onClick="optionClicked" />

    <ul v-else class="vue-context-menu__options" :class="[{ 'vue-context-menu--icons': iconFormat }, menuClass]">
      <template v-for="({ use, isDivider, name, label, icon, class: className }, index) in contextMenu" :key="index">
        <slot v-if="use" :name="use" :onClick="optionClicked" />

        <li v-else-if="isDivider" class="vue-context-menu__divider" :class="className" />

        <li v-else :class="className" @click.stop="optionClicked(name ?? '')">
          <template v-if="iconFormat && icon">
            <i v-if="iconFormat === 'class'" class="vue-context-menu__icon" :class="icon" />
            <i v-else class="vue-context-menu__icon" :class="iconFormat">{{ icon }}</i>
          </template>
          <span v-if="label ?? name">{{ label ?? name }}</span>
        </li>
      </template>
    </ul>
  </div>
</template>

<style>
.vue-context-menu {
  --cm_margin: 4px 0;
  --cm_padding: 5px 24px;
  --cm_offset: 16px;
  --cm_gap: 4px;
  --cm_radius: 4px;
  --cm_color: #000;
  --cm_background: #ecf0f1;
  --cm_shadow: 0 3px 6px 0 rgba(51, 51, 51, 0.2);
  --cm_font: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans",
    "Helvetica Neue", sans-serif;

  --cm_color--hover: #fff;
  --cm_background--hover: #ea1e63;

  --cm_divider_padding: 8px;
  --cm_divider_color: #c0cdd1;

  top: 0;
  left: 0;
  margin: 0;
  padding: 0;
  display: block;
  position: absolute;
  z-index: 1000000;
}
.vue-context-menu .vue-context-menu--icons {
  --cm_offset: 34px;
  --cm_inset: 8px;
}

.vue-context-menu .vue-context-menu__options {
  display: block;
  padding: var(--cm_margin);
  color: var(--cm_color);
  background-color: var(--cm_background);
  border-radius: var(--cm_radius);
  box-shadow: var(--cm_shadow);
  font-family: var(--cm_font);
  list-style: none;
}

.vue-context-menu .vue-context-menu__options > li {
  cursor: pointer;
  position: relative;
  padding: var(--cm_padding);
  padding-left: var(--cm_offset);
}
.vue-context-menu .vue-context-menu__options > li:hover {
  color: var(--cm_color--hover);
  background-color: var(--cm_background--hover);
}

.vue-context-menu li.vue-context-menu__divider {
  pointer-events: none;
  box-sizing: content-box;
  height: calc(var(--cm_gap) / 2);
  padding: var(--cm_divider_padding);
  background-color: var(--cm_divider_color);
  background-clip: content-box;
}

.vue-context-menu li .vue-context-menu__icon {
  position: absolute;
  left: var(--cm_inset);
}
</style>
