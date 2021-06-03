import { DefineComponent, Plugin } from 'vue';

declare const ContextMenu: DefineComponent<{}, {}, any> & { install: Exclude<Plugin['install'], undefined> };
export default ContextMenu;
