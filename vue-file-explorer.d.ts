import { DefineComponent, Plugin } from "vue"

declare const ContextMenu: DefineComponent<{}, {}, any> & { install: Exclude<Plugin["install"], undefined> }
export default ContextMenu

export interface Folder {
  parentId: number | string | null
  name: string
  folders: Array<{ id: number; name: string; data: any }>
  files: Array<{ id: number; name: string; data: any }>
}
