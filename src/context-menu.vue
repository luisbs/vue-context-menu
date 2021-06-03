<template>
  <ul class="context-menu" :class="{ 'context-menu--active': visible }" :style="location" v-click-outside="onClickOutsideConf">
    <template v-for="({ type, name, label, icon }, index) in contextMenu">
      <li :key="index" v-if="type === 'divider'" class="context-menu__divider" />

      <li :key="index" v-else @click.stop="optionClicked(name ?? '')">
        <i v-if="iconFormat === 'class'" :class="icon" />
        <i v-else :class="iconFormat">{{ icon }}</i>
        <span>{{ label ?? name ?? "" }}</span>
      </li>
    </template>
  </ul>

  <!-- eslint-disable-next-line -->
  <div
    v-bind="$attrs"
    class="context-menu__content"
    @click.left.prevent.stop="onClick($event, 'click', 'main')"
    @click.middle.prevent.stop="onClick($event, 'click', 'auxiliar')"
    @click.right.prevent.stop="onClick($event, 'click', 'secondary')"
    @dblclick.left.prevent.stop="onClick($event, 'dblclick', 'main')"
    @dblclick.middle.prevent.stop="onClick($event, 'dblclick', 'auxiliar')"
    @dblclick.right.prevent.stop="onClick($event, 'dblclick', 'secondary')"
  >
    <slot />
  </div>
</template>

<style scoped>
.context-menu {
  --cm-light-grey: #ecf0f1;
  /* --cm-grey: darken(var(--cm-light-grey), 15%); */
  --cm-grey: #c0cdd1;
  --cm-blue: #007aff;
  --cm-white: #fff;
  --cm-black: #333;
  --cm-black-shadow: rgba(51, 51, 51, 0.2);

  top: 0;
  left: 0;
  margin: 0;
  padding: 0;
  display: none;
  list-style: none;
  position: absolute;
  z-index: 1000000;
  background-color: var(--cm-light-grey);
  border-bottom-width: 0px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans",
    "Helvetica Neue", sans-serif;
  box-shadow: 0 3px 6px 0 var(--cm-black-shadow);
  border-radius: 4px;
}
.context-menu.context-menu--active {
  display: block;
}

.context-menu > li {
  display: flex;
  align-items: center;
  padding: 5px 15px;
  color: var(--cm-black);
  cursor: pointer;
}
.context-menu > li:hover {
  background-color: var(--cm-blue);
  color: var(--cm-white);
}

.context-menu .context-menu__divider {
  box-sizing: content-box;
  height: 2px;
  background-color: var(--cm-grey);
  padding: 4px 0;
  background-clip: content-box;
  pointer-events: none;
}

.context-menu li:first-of-type {
  margin-top: 4px;
}
.context-menu li:last-of-type {
  margin-bottom: 4px;
}
</style>

<script lang="ts">
import { computed, defineComponent, onBeforeUnmount, onMounted, ref, watchEffect } from "vue"
import type { ContextualMenuOption, MenuOptionName, MenuOptions, MouseClick, MouseEvents, MouseOptionButtons } from "../context-menu"

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
    options: { type: Array, required: true },
    /** Defines when the context menu is active */
    active: { type: Boolean, default: true },
    /**
     * Defines the icon format used in the contextual menu. (Default: `class`)
     * - `class`: for font-awesome-like, e.g: `<i class="[icon]" />`
     * - other text: for material-icons-like, e.g: `<i class="[iconFormat]">[icon]</i>`
     * @default "class"
     */
    iconFormat: { type: String, default: "class" },
    /** Defines a custom class delimitir for complex layouts */
    delimiter: { type: String, default: "context-menu__content" },
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
    const item = ref<string | number>(0)
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

    // ? Mantener sincronizado el conjunto de posibles menus
    const __menuOptionsMap = ref<MenuOptions>(new Map())
    watchEffect(() => {
      __menuOptionsMap.value = new Map()
      ;(props.options as ContextualMenuOption[]).forEach(m => {
        let name = m.name ?? `no-name-${Math.random().toString().slice(2, 5)}`

        const events = Array.isArray(m.on) ? m.on : Array(m.on)
        events.forEach(e => {
          if (!e) return

          let btn: string | undefined = undefined
          if (/(main|left)/.test(e)) btn = "main"
          else if (/(sec|right)/.test(e)) btn = "secondary"
          else if (/(aux)/.test(e)) btn = "auxiliar"

          if (!btn) return

          const ev = /^dblclick/.test(e) ? "dblclick" : "click"
          let mod = "_"
          if (/ctrl\./.test(e)) mod = "_ctrl_"
          else if (/alt\./.test(e)) mod = "_alt_"
          else if (/shift\./.test(e)) mod = "_shift_"
          else if (/meta\./.test(e)) mod = "_meta_"

          const menuName = `${ev}${mod}${btn}` as MenuOptionName
          const menu = __menuOptionsMap.value.get(menuName) ?? []
          __menuOptionsMap.value.set(menuName, [...menu, { ...(typeof m === "object" ? m : {}), name }])
        })
      })
    })

    // ? Actualizar el menu mostrado
    const location = ref<Record<"x" | "y", number>>({ x: 0, y: 0 })
    const contextMenu = ref<ContextualMenuOption[]>([])
    const showContextMenu = (event: MouseEvent, ev: MouseClick, btn: MouseOptionButtons) => {
      visible.value = false
      contextMenu.value = []

      const t = (event as unknown) as {
        path: HTMLElement[]
        target: HTMLElement
      }

      // let id = t.target.id ?? ""
      let id: string | undefined = undefined
      if (t.path) {
        // ? subir por el path de elementos hasta encontrar el elemento wrapper del context
        t.path.some(p => {
          if (p?.classList?.contains(props.delimiter)) return true
          id = p.id
        })
      }
      item.value = id ?? ""
      if ((id ?? "").length < 1) return

      let mod = "_"
      if (event.ctrlKey) mod = "_ctrl_"
      else if (event.altKey) mod = "_alt_"
      else if (event.shiftKey) mod = "_shift_"
      else if (event.metaKey) mod = "_meta_"

      const menuName = `${ev}${mod}${btn}` as MenuOptionName
      const menu = __menuOptionsMap.value.get(menuName)

      if (menu) {
        contextMenu.value = menu
        location.value = {
          x: event.pageX - props.offsetX,
          y: event.pageY - props.offsetY,
        }
        visible.value = props.active

        event.stopImmediatePropagation()
        event.preventDefault()
      }
    }

    return {
      contextMenu,
      visible: computed(() => props.active && visible.value),
      location: computed(() => ({
        left: `${location.value.x}px`,
        top: `${location.value.y}px`,
      })),
      onClick: (event: MouseEvent, mode: MouseClick, btn: MouseOptionButtons) => showContextMenu(event, mode, btn),

      optionClicked(action: string) {
        hideContextMenu()
        emit("optionClick", { action, item: item.value })
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

</script>
