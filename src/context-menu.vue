<script lang="ts">
import { computed, defineComponent, onBeforeUnmount, onMounted, ref, watchEffect } from "vue"
import type { ContextualMenuOption, MenuOptionName, MenuOptions, MouseClick, MouseEvents, MouseOptionButtons } from "../vue-context-menu"

function isValidMouseEvent(str: string): str is MouseEvents {
  return (
    /^(click|dblclick|main|auxiliar|secondary|left|right)?$/.test(str) ||
    /^ctrl\.(aux|sec)$/.test(str) ||
    /^(ctrl\.)?(main|auxiliar|secondary|left|right)$/.test(str) ||
    /^(click|dblclick)((\.ctrl)?\.(main|auxiliar|secondary|left|right|aux|sec))?$/.test(str)
  )
}

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
    iconFormat: String ,
    /** Defines a class for the contextual menu wrapper */
    menuClass: String,
    /** Defines a custom class delimitir for complex layouts */
    delimiter: { type: String, default: "vue-context-menu__content" },
    /** Corrects offsetX when using `position: relative` on parent */
    offsetX: { type: Number, default: 0 },
    /** Corrects offsetY when using `position: relative` on parent */
    offsetY: { type: Number, default: 0 },
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
      validator: (v: string) => /(click|main|aux|sec|left|right)/.test(v),
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

    const __events = ref<MouseEvents[]>([])
    const __catchClick = ref(false)
    const __catchDblClick = ref(false)
    watchEffect(() => {
      __catchClick.value = __catchDblClick.value = false

      __events.value = (props.events.split(",") as MouseEvents[]).filter(e => {
        const valid = isValidMouseEvent(e)
        if (valid) {
          if (/^dblclick/.test(e)) __catchDblClick.value = true
          else __catchClick.value = true
        }
        return valid
      })
    })

    const compileNameEvent = (e?:string) => {
      if (!e) return

      let btn: string | undefined = undefined
      if (/(main|left)/.test(e)) btn = "main"
      else if (/(sec|right)/.test(e)) btn = "secondary"
      else if (/(aux)/.test(e)) btn = "auxiliar"

      if (!btn) return

      const event = /^dblclick/.test(e) ? "dblclick" : "click"
      let mod = "_"
      if (/ctrl\./.test(e)) mod = "_ctrl_"
      else if (/alt\./.test(e)) mod = "_alt_"
      else if (/shift\./.test(e)) mod = "_shift_"
      else if (/meta\./.test(e)) mod = "_meta_"

      return `${event}${mod}${btn}` as MenuOptionName
    }

    // ? Mantener sincronizado el conjunto de posibles menus
    const __menuOptionsMap = ref<MenuOptions>(new Map())
    watchEffect(() => {
      if (typeof props.options === 'string') return

      __menuOptionsMap.value = new Map()
      ;(props.options as ContextualMenuOption[]).forEach(opt => {
        let name = opt.name ?? `no-name-${Math.random().toString().slice(2, 5)}`

        if (!opt.on) {
          __events.value.forEach((e) => {
            const menuName = compileNameEvent(e)
            if (!menuName) return

            const menu = __menuOptionsMap.value.get(menuName) ?? []
            __menuOptionsMap.value.set(menuName, [...menu, { ...(typeof opt === "object" ? opt : {}), name }])
          })
        }

        const events = Array.isArray(opt.on) ? opt.on : Array(opt.on)
        events.forEach(e => {
          const menuName = compileNameEvent(e)
            if (!menuName) return

          const menu = __menuOptionsMap.value.get(menuName) ?? []
          __menuOptionsMap.value.set(menuName, [...menu, { ...(typeof opt === "object" ? opt : {}), name }])
        })
      })
    })

    const location = ref<Record<"x" | "y", number>>({ x: 0, y: 0 })
    const setLocation = (event: MouseEvent) => {
        location.value = {
          x: event.pageX - props.offsetX,
          y: event.pageY - props.offsetY,
        }
    }

    // ? Controls wich element has been clicked
    const selectedItem = ref<string>()
    const setSelectedItem = (event: MouseEvent): string | undefined => {
      try {
        const t = (event as unknown) as { path: HTMLElement[] }

        let id: string | undefined = undefined
        // ? subir por el path de elementos hasta encontrar el elemento wrapper del context
        for (const el of t.path) {
          if (el?.classList?.contains(props.delimiter)) {
            selectedItem.value = id
            return id
          }

          // ? Store child id
          else id = el.id
        }

      } catch (error) {
        console.warn(`vue-context-menu: Not found child element attr 'id' of element with class '${props.delimiter}'`);
      }
      selectedItem.value = undefined
      return undefined
    }


    // ? Actualizar el menu mostrado
    const contextMenu = ref<ContextualMenuOption[]>([])
    const showContextMenu = (event: MouseEvent, ev: MouseClick, btn: MouseOptionButtons) => {
      const id = setSelectedItem(event)
      if (!id || id.length < 1) return

      let mod = "_"
      if (event.ctrlKey) mod = "_ctrl_"
      else if (event.altKey) mod = "_alt_"
      else if (event.shiftKey) mod = "_shift_"
      else if (event.metaKey) mod = "_meta_"

      const menuName = `${ev}${mod}${btn}` as MenuOptionName
      const menu = __menuOptionsMap.value.get(menuName)

      if (!menu) contextMenu.value = []
      else {
        event.stopImmediatePropagation()
        event.preventDefault()

        setLocation(event)
        contextMenu.value = menu
        visible.value = true
      }
    }

    const slotContextMenu = ref<string>()
    const showSlotMenu = (event: MouseEvents) => {
      const id = setSelectedItem(event)
      if (typeof props.options !== 'string' || !id || id.length < 1) {
        slotContextMenu.value = undefined
        return
      }

      event.stopImmediatePropagation()
      event.preventDefault()

      setLocation(event)
      slotContextMenu.value = props.options
      visible.value = true
    }

    return {
      visible: computed(() => props.active && visible.value),
      location: computed(() => ({
        left: `${location.value.x}px`,
        top: `${location.value.y}px`,
      })),

      contextMenu,
      slotContextMenu,
      selectedItem: computed(() => selectedItem.value ?? ""),
      onClick: (event: MouseEvent, mode: MouseClick, btn: MouseOptionButtons) => {
        visible.value = false
        if (props.active === false) return

        if (typeof props.options === 'string') showSlotMenu(event)
        else showContextMenu(event, mode, btn)
      },

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
    @click.left.prevent.stop="onClick($event, 'click', 'main')"
    @click.middle.prevent.stop="onClick($event, 'click', 'auxiliar')"
    @click.right.prevent.stop="onClick($event, 'click', 'secondary')"
    @dblclick.left.prevent.stop="onClick($event, 'dblclick', 'main')"
    @dblclick.middle.prevent.stop="onClick($event, 'dblclick', 'auxiliar')"
    @dblclick.right.prevent.stop="onClick($event, 'dblclick', 'secondary')"
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
  --cm_margin: 4px 8px;
  --cm_padding: 5px 8px;
  --cm_offset: 8px;
  --cm_gap: 4px;
  --cm_radius: 4px;
  --cm_color: #000;
  --cm_background: #ecf0f1;
  --cm_divider-color: #c0cdd1;
  --cm_shadow: 0 3px 6px 0 rgba(51, 51, 51, 0.2);
  --cm_font: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans",
    "Helvetica Neue", sans-serif;

  --cm_color--hover: #fff;
  --cm_background--hover: #ea1e63;

  top: 0;
  left: 0;
  margin: 0;
  padding: 0;
  display: block;
  position: absolute;
  z-index: 1000000;
}
.vue-context-menu .vue-context-menu--icons {
  --cm_offset: 28px;
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

.vue-context-menu .vue-context-menu__icon {
  position: absolute;
  left: 0;
}

.vue-context-menu .vue-context-menu__divider {
  pointer-events: none;
  box-sizing: content-box;
  height: calc(var(--cm_gap) / 2);
  padding: var(--cm_gap) 0;
  background-color: var(--cm_divider-color);
  background-clip: content-box;
}
</style>
