<script lang="ts">
import { defineComponent, ref } from "vue"
import { ContextualMenuOption, ContextualMenuEvent } from "vue-context-menu"

function unique() {
  return Math.random()
    .toString()
    .slice(2, 5)
}

const menuOptions: ContextualMenuOption[] = [
  { name: "move_up", label: "Subir" },
  { name: "move_down", label: "Bajar" },
  { isDivider: true },
  { name: "duplicate", label: "Duplicar" },
  { name: "delete", label: "Eliminar" },
]

const menuOptionsIcon: ContextualMenuOption[] = [
  { name: "move_up", label: "Subir", icon: "expand_less" },
  { name: "move_down", label: "Bajar", icon: "expand_more" },
  { isDivider: true },
  { name: "duplicate", label: "Duplicar", icon: "content_copy" },
  { name: "delete", label: "Eliminar" },
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
      menuOptionsIcon,
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

<template>
  <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />

  <div id="app">
    <!-- <div> -->
    <div class="flex">
      <button @click="append()">Add</button>
    </div>

    <div class="flex">
      <!-- Default -->
      <context-menu delimiter="elements-wrapper" events="secondary" :options="menuOptions" @optionClick="onMenuClick">
        <ul class="elements-wrapper">
          <li v-for="{ key, value } in elements" :key="key" :id="key">{{ value }}</li>
        </ul>
      </context-menu>

      <!-- Default with icons -->
      <context-menu
        delimiter="elements-wrapper"
        events="secondary"
        iconFormat="material-icons"
        :options="menuOptionsIcon"
        @optionClick="onMenuClick"
      >
        <ul class="elements-wrapper">
          <li v-for="{ key, value } in elements" :key="key" :id="key">{{ value }}</li>
        </ul>
      </context-menu>

      <!-- Custom -->
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
    <!-- </div> -->
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
#app {
  display: flex;
  flex-direction: column;
  margin-top: 32px;
  min-height: 100vh;
  width: 100vw;
}
#app button {
  padding: 8px 32px;
}
#app .flex {
  display: flex;
  justify-content: space-evenly;
  gap: 8px;
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
  background-color: rgb(59, 59, 59);
}
</style>
