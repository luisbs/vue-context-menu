<template>
  <div id="app">
    <div>
      <button @click="append()">Add</button>
      <context-menu delimiter="elements-wrapper" events="secondary" :options="menuOptions" @optionClick="onMenuClick">
        <ul class="elements-wrapper">
          <li v-for="{ key, value } in elements" :key="key" :id="key">{{ value }}</li>
        </ul>
      </context-menu>
    </div>
    <div>
      <button @click="append()">Add</button>
      <context-menu delimiter="elements-wrapper" events="secondary" options="menu" @optionClick="onMenuClick">
        <template v-slot:menu="{ onClick }">
          <ul class="own-menu">
            <li @click="onClick('move_up')">Subir</li>
            <li @click="onClick('move_down')">Bajar</li>
            <li @click="onClick('duplicate')">Duplicar</li>
            <li @click="onClick('delete')">Eliminar</li>
          </ul>
        </template>

        <ul class="elements-wrapper">
          <li v-for="{ key, value } in elements" :key="key" :id="key">{{ value }}</li>
        </ul>
      </context-menu>
    </div>
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
#app {
  width: 100vw;
  display: flex;
  justify-content: space-evenly;
}
#app > div {
  min-height: 100vh;
  margin-top: 32px;
  text-align: center;
}
button {
  padding: 8px 32px;
}
ul.elements-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: min-content;
  margin: auto;
  margin-top: 8px;
  list-style: none;
}
ul.elements-wrapper li {
  margin-top: 2px;
  padding: 4px 16px;
  background-color: antiquewhite;
  border: 1px solid rgba(138, 138, 138, 0);
}
ul.elements-wrapper li:hover {
  background-color: bisque;
  transform: scale(1.1);
}

/* Own Menu */
.own-menu {
  display: flex;
  flex-direction: column;
  list-style: none;
  font-family: "Courier New", Courier, monospace;
  font-weight: bolder;
  color: white;
  background-color: black;
  border-radius: 4px;
}

.own-menu > li {
  padding: 10px 24px;
}
.own-menu > li:hover {
}
</style>

<script lang="ts">
import { defineComponent, ref } from "vue"
import { ContextualMenuOption, ContextualMenuEvent } from "vue-context-menu"

function unique() {
  return Math.random()
    .toString()
    .slice(2, 5)
}

const menuOptions: ContextualMenuOption[] = [
  { name: "move_up", on: "secondary", label: "Subir" },
  { name: "move_down", on: "secondary", label: "Bajar" },
  { type: "divider", on: "secondary" },
  { name: "duplicate", on: "secondary", label: "Duplicar" },
  { name: "delete", on: "secondary", label: "Eliminar" },
]

type ElementsArray = Record<"key" | "value", string>[]

export default defineComponent({
  name: "ServeDev",
  setup() {
    const elements = ref<ElementsArray>([])
    return {
      elements,
      append: () => {
        const key = unique()
        elements.value.push({ key, value: key })
      },

      menuOptions,
      onMenuClick: ({ action, item: key }: ContextualMenuEvent) => {
        if (action === "delete") {
          elements.value = elements.value.filter(el => el.key !== key)
        }

        // * Duplicate
        else if (action === "duplicate") {
          elements.value = elements.value.reduce<ElementsArray>((p, el) => {
            if (el.key === key) return [...p, el, { key: unique(), value: el.value }]
            return [...p, el]
          }, [])
        }

        // * Move up
        else if (action === "move_up") {
          elements.value = elements.value.reduce<ElementsArray>((p, el) => {
            if (el.key !== key) return [...p, el]
            const tmp = p.pop()
            if (tmp) return [...p, el, tmp]
            return [el]
          }, [])
        }

        // * Move up
        else if (action === "move_down") {
          elements.value = elements.value.reduceRight<ElementsArray>((p, el) => {
            if (el.key !== key) return [el, ...p]
            const tmp = p.shift()
            if (tmp) return [tmp, el, ...p]
            return [el]
          }, [])
        }
      },
    }
  },
})
</script>
