<script lang="ts">
import { defineComponent, computed, ref, watchEffect } from "vue"
import { Folder } from "vue-file-explorer"

export default /*#__PURE__*/ defineComponent({
  name: "FileExplorer",
  emits: ["initialLoad", "load", "rename"],
  props: {
    layout: {
      type: String,
      default: "details",
      validator: (v: string) => ["details", "cards"].includes(v),
    },
    render: Function,
  },
  setup(props) {
    const _layout = ref<string>(props.layout as "details")
    const TREE = ref(new Map<number | string, Folder>())
    const folderId = ref<string | number>(Array.from(TREE.value.keys())[0] || 0)

    const explorer = ref<HTMLElement>()
    watchEffect(
      () => {
        if (!explorer.value) return

        explorer.value.querySelectorAll<HTMLElement>("button[data-layout]").forEach(el => (_layout.value = el.dataset.layout || "details"))
        // explorer.value.querySelectorAll<HTMLElement>("button[data-open]")
        // explorer.value.querySelectorAll<HTMLElement>("button[data-rename]")
      },
      { flush: "post" }
    )

    return {
      layoutType: _layout,
      folderId,
      explorer,

      path: computed(() => {
        const path: Array<[string | number, string, boolean?]> = []

        let isRoot = false
        let id = folderId.value ?? 0
        do {
          if (!TREE.value.has(id)) isRoot = true
          else {
            const dt = TREE.value.get(id) || ({} as Folder)
            if (dt.parentId) {
              path.unshift([id, dt.name])
              id = dt.parentId
            } else {
              path.unshift([id, dt.name, true])
              isRoot = true
            }
          }
        } while (!isRoot)
        return path
      }),
      content: computed(() => TREE.value.get(folderId.value) || { folders: [], files: [] }),
    }
  },
})
</script>

<template>
  <div ref="explorer" class="vue-file-explorer">
    <div class="vfe-bar">
      <div class="vfe-path">
        <slot name="folder-path" :path="path">
          <button v-for="(p, i) in path" :key="i" type="button" :data-open="p[0]">
            {{ p[1] }}
          </button>
        </slot>
      </div>
      <div class="vfe-layout">
        <slot name="layout-selector">
          <button type="button" data-layout="cards">Cards Layout</button>
          <button type="button" data-layout="details">Details Layout</button>
        </slot>
      </div>
    </div>

    <div class="vfe-content">
      <div v-if="layoutType === 'cards'" class="vfe-cards"></div>
      <table v-else class="vfe-details">
        <table>
          <slot name="thead">
            <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Actions</th>
              </tr>
            </thead>
          </slot>
          <slot name="tbody">
            <tbody>
              <tr v-for="({ id, name }, i) in content.folders" :key="i">
                <td>{{ id }}</td>
                <td>{{ name }}</td>
                <td></td>
              </tr>
              <tr v-for="({ id, name }, i) in content.files" :key="i">
                <td>{{ id }}</td>
                <td>{{ name }}</td>
                <td></td>
              </tr>
            </tbody>
          </slot>
        </table>
      </table>
    </div>
  </div>
</template>
