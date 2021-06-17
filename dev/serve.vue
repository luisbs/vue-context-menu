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

const testMenu: ContextualMenuOption[] = [{ name: "none", label: "Accion" }]

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

      testMenu,
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
    <!-- Real implementation -->
    <div class="demo">
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
    </div>

    <!-- Test board -->
    <div class="config-test">
      <div>
        <div>
          <h6>click.ctrl,click.left,click.shift.right,dblclick.alt</h6>
          <context-menu events="click.ctrl,click.left,click.shift.right,dblclick.alt" :options="testMenu">
            <span id="test-element">Elemento</span>
          </context-menu>
        </div>
      </div>

      <div></div>
      <div></div>
      <div></div>

      <div>
        <div>
          <h6>click</h6>
          <context-menu events="click" :options="testMenu"><span id="test-element">Elemento</span></context-menu>
        </div>
        <div>
          <h6>click.ctrl</h6>
          <context-menu events="click.ctrl" :options="testMenu"><span id="test-element">Elemento</span></context-menu>
        </div>
        <div>
          <h6>click.meta</h6>
          <context-menu events="click.meta" :options="testMenu"><span id="test-element">Elemento</span></context-menu>
        </div>
        <div>
          <h6>click.alt</h6>
          <context-menu events="click.alt" :options="testMenu"><span id="test-element">Elemento</span></context-menu>
        </div>
        <div>
          <h6>click.shift</h6>
          <context-menu events="click.shift" :options="testMenu"><span id="test-element">Elemento</span></context-menu>
        </div>
      </div>

      <div>
        <div>
          <h6>click.left</h6>
          <context-menu events="click.left" :options="testMenu"><span id="test-element">Elemento</span></context-menu>
        </div>
        <div>
          <h6>click.ctrl.left</h6>
          <context-menu events="click.ctrl.left" :options="testMenu"><span id="test-element">Elemento</span></context-menu>
        </div>
        <div>
          <h6>click.meta.left</h6>
          <context-menu events="click.meta.left" :options="testMenu"><span id="test-element">Elemento</span></context-menu>
        </div>
        <div>
          <h6>click.alt.left</h6>
          <context-menu events="click.alt.left" :options="testMenu"><span id="test-element">Elemento</span></context-menu>
        </div>
        <div>
          <h6>click.shift.left</h6>
          <context-menu events="click.shift.left" :options="testMenu"><span id="test-element">Elemento</span></context-menu>
        </div>
      </div>

      <div>
        <div>
          <h6>click.middle</h6>
          <context-menu events="click.middle" :options="testMenu"><span id="test-element">Elemento</span></context-menu>
        </div>
        <div>
          <h6>click.ctrl.middle</h6>
          <context-menu events="click.ctrl.middle" :options="testMenu"><span id="test-element">Elemento</span></context-menu>
        </div>
        <div>
          <h6>click.meta.middle</h6>
          <context-menu events="click.meta.middle" :options="testMenu"><span id="test-element">Elemento</span></context-menu>
        </div>
        <div>
          <h6>click.alt.middle</h6>
          <context-menu events="click.alt.middle" :options="testMenu"><span id="test-element">Elemento</span></context-menu>
        </div>
        <div>
          <h6>click.shift.middle</h6>
          <context-menu events="click.shift.middle" :options="testMenu"><span id="test-element">Elemento</span></context-menu>
        </div>
      </div>

      <div>
        <div>
          <h6>click.right</h6>
          <context-menu events="click.right" :options="testMenu"><span id="test-element">Elemento</span></context-menu>
        </div>
        <div>
          <h6>click.ctrl.right</h6>
          <context-menu events="click.ctrl.right" :options="testMenu"><span id="test-element">Elemento</span></context-menu>
        </div>
        <div>
          <h6>click.meta.right</h6>
          <context-menu events="click.meta.right" :options="testMenu"><span id="test-element">Elemento</span></context-menu>
        </div>
        <div>
          <h6>click.alt.right</h6>
          <context-menu events="click.alt.right" :options="testMenu"><span id="test-element">Elemento</span></context-menu>
        </div>
        <div>
          <h6>click.shift.right</h6>
          <context-menu events="click.shift.right" :options="testMenu"><span id="test-element">Elemento</span></context-menu>
        </div>
      </div>

      <div>
        <div>
          <h6>click.aux</h6>
          <context-menu events="click.aux" :options="testMenu"><span id="test-element">Elemento</span></context-menu>
        </div>
        <div>
          <h6>click.ctrl.aux</h6>
          <context-menu events="click.ctrl.aux" :options="testMenu"><span id="test-element">Elemento</span></context-menu>
        </div>
        <div>
          <h6>click.meta.aux</h6>
          <context-menu events="click.meta.aux" :options="testMenu"><span id="test-element">Elemento</span></context-menu>
        </div>
        <div>
          <h6>click.alt.aux</h6>
          <context-menu events="click.alt.aux" :options="testMenu"><span id="test-element">Elemento</span></context-menu>
        </div>
        <div>
          <h6>click.shift.aux</h6>
          <context-menu events="click.shift.aux" :options="testMenu"><span id="test-element">Elemento</span></context-menu>
        </div>
      </div>

      <div>
        <div>
          <h6>click.sec</h6>
          <context-menu events="click.sec" :options="testMenu"><span id="test-element">Elemento</span></context-menu>
        </div>
        <div>
          <h6>click.ctrl.sec</h6>
          <context-menu events="click.ctrl.sec" :options="testMenu"><span id="test-element">Elemento</span></context-menu>
        </div>
        <div>
          <h6>click.meta.sec</h6>
          <context-menu events="click.meta.sec" :options="testMenu"><span id="test-element">Elemento</span></context-menu>
        </div>
        <div>
          <h6>click.alt.sec</h6>
          <context-menu events="click.alt.sec" :options="testMenu"><span id="test-element">Elemento</span></context-menu>
        </div>
        <div>
          <h6>click.shift.sec</h6>
          <context-menu events="click.shift.sec" :options="testMenu"><span id="test-element">Elemento</span></context-menu>
        </div>
      </div>

      <div>
        <div>
          <h6>click.main</h6>
          <context-menu events="click.main" :options="testMenu"><span id="test-element">Elemento</span></context-menu>
        </div>
        <div>
          <h6>click.ctrl.main</h6>
          <context-menu events="click.ctrl.main" :options="testMenu"><span id="test-element">Elemento</span></context-menu>
        </div>
        <div>
          <h6>click.meta.main</h6>
          <context-menu events="click.meta.main" :options="testMenu"><span id="test-element">Elemento</span></context-menu>
        </div>
        <div>
          <h6>click.alt.main</h6>
          <context-menu events="click.alt.main" :options="testMenu"><span id="test-element">Elemento</span></context-menu>
        </div>
        <div>
          <h6>click.shift.main</h6>
          <context-menu events="click.shift.main" :options="testMenu"><span id="test-element">Elemento</span></context-menu>
        </div>
      </div>

      <div>
        <div>
          <h6>click.auxiliar</h6>
          <context-menu events="click.auxiliar" :options="testMenu"><span id="test-element">Elemento</span></context-menu>
        </div>
        <div>
          <h6>click.ctrl.auxiliar</h6>
          <context-menu events="click.ctrl.auxiliar" :options="testMenu"><span id="test-element">Elemento</span></context-menu>
        </div>
        <div>
          <h6>click.meta.auxiliar</h6>
          <context-menu events="click.meta.auxiliar" :options="testMenu"><span id="test-element">Elemento</span></context-menu>
        </div>
        <div>
          <h6>click.alt.auxiliar</h6>
          <context-menu events="click.alt.auxiliar" :options="testMenu"><span id="test-element">Elemento</span></context-menu>
        </div>
        <div>
          <h6>click.shift.auxiliar</h6>
          <context-menu events="click.shift.auxiliar" :options="testMenu"><span id="test-element">Elemento</span></context-menu>
        </div>
      </div>

      <div>
        <div>
          <h6>click.secondary</h6>
          <context-menu events="click.secondary" :options="testMenu"><span id="test-element">Elemento</span></context-menu>
        </div>
        <div>
          <h6>click.ctrl.secondary</h6>
          <context-menu events="click.ctrl.secondary" :options="testMenu"><span id="test-element">Elemento</span></context-menu>
        </div>
        <div>
          <h6>click.meta.secondary</h6>
          <context-menu events="click.meta.secondary" :options="testMenu"><span id="test-element">Elemento</span></context-menu>
        </div>
        <div>
          <h6>click.alt.secondary</h6>
          <context-menu events="click.alt.secondary" :options="testMenu"><span id="test-element">Elemento</span></context-menu>
        </div>
        <div>
          <h6>click.shift.secondary</h6>
          <context-menu events="click.shift.secondary" :options="testMenu"><span id="test-element">Elemento</span></context-menu>
        </div>
      </div>

      <div></div>
      <div></div>
      <div></div>

      <div>
        <div>
          <h6>dblclick</h6>
          <context-menu events="dblclick" :options="testMenu"><span id="test-element">Elemento</span></context-menu>
        </div>
        <div>
          <h6>dblclick.ctrl</h6>
          <context-menu events="dblclick.ctrl" :options="testMenu"><span id="test-element">Elemento</span></context-menu>
        </div>
        <div>
          <h6>dblclick.meta</h6>
          <context-menu events="dblclick.meta" :options="testMenu"><span id="test-element">Elemento</span></context-menu>
        </div>
        <div>
          <h6>dblclick.alt</h6>
          <context-menu events="dblclick.alt" :options="testMenu"><span id="test-element">Elemento</span></context-menu>
        </div>
        <div>
          <h6>dblclick.shift</h6>
          <context-menu events="dblclick.shift" :options="testMenu"><span id="test-element">Elemento</span></context-menu>
        </div>
      </div>

      <div>
        <div>
          <h6>dblclick.main</h6>
          <context-menu events="dblclick.main" :options="testMenu"><span id="test-element">Elemento</span></context-menu>
        </div>
        <div>
          <h6>dblclick.ctrl.main</h6>
          <context-menu events="dblclick.ctrl.main" :options="testMenu"><span id="test-element">Elemento</span></context-menu>
        </div>
        <div>
          <h6>dblclick.meta.main</h6>
          <context-menu events="dblclick.meta.main" :options="testMenu"><span id="test-element">Elemento</span></context-menu>
        </div>
        <div>
          <h6>dblclick.alt.main</h6>
          <context-menu events="dblclick.alt.main" :options="testMenu"><span id="test-element">Elemento</span></context-menu>
        </div>
        <div>
          <h6>dblclick.shift.main</h6>
          <context-menu events="dblclick.shift.main" :options="testMenu"><span id="test-element">Elemento</span></context-menu>
        </div>
      </div>

      <div>
        <div>
          <h6>dblclick.left</h6>
          <context-menu events="dblclick.left" :options="testMenu"><span id="test-element">Elemento</span></context-menu>
        </div>
        <div>
          <h6>dblclick.ctrl</h6>
          <context-menu events="dblclick.ctrl.left" :options="testMenu"><span id="test-element">Elemento</span></context-menu>
        </div>
        <div>
          <h6>dblclick.meta</h6>
          <context-menu events="dblclick.meta.left" :options="testMenu"><span id="test-element">Elemento</span></context-menu>
        </div>
        <div>
          <h6>dblclick.alt</h6>
          <context-menu events="dblclick.alt.left" :options="testMenu"><span id="test-element">Elemento</span></context-menu>
        </div>
        <div>
          <h6>dblclick.shift</h6>
          <context-menu events="dblclick.shift.left" :options="testMenu"><span id="test-element">Elemento</span></context-menu>
        </div>
      </div>
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
  display: flex;
  flex-direction: column;
  margin-top: 32px;
  min-height: 100vh;
  width: 100vw;
}
#app button {
  padding: 8px 32px;
}
#app .demo {
  margin-bottom: 64px;
  height: 260px;
  overflow: auto;
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

.config-test {
  display: flex;
  flex-direction: column;
  align-content: center;
  gap: 16px;
  user-select: none;
}
.config-test > div {
  display: flex;
  justify-content: center;
  gap: 32px;
}
.config-test > div > div {
  width: 15%;
  text-align: center;
}
.config-test h6 {
  font-family: sans-serif;
  font-size: 1.2rem;
  line-height: 1;
}
.config-test .vue-context-menu__content {
  margin-top: 24px;
}
.config-test #test-element {
  padding: 10px 16px;
  background-color: bisque;
  font-family: sans-serif;
}
.config-test #test-element.error {
  background-color: red;
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
