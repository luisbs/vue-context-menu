import { DefineComponent, Plugin } from 'vue';

declare const ContextMenu: DefineComponent<{}, {}, any> & { install: Exclude<Plugin['install'], undefined> };
export default ContextMenu;

export type MouseClick = "click" | "dblclick"
type MouseButton = "main" | "aux" | "sec" | "auxiliar" | "secondary" | "left" | "right"
type MouseModificators = "ctrl" | "alt" | "shift" | "meta"

export type MouseEvents =
  | MouseClick
  | Exclude<MouseButton, "aux" | "sec">
  | `${MouseModificators}.${MouseButton}`
  | `${MouseClick}.${MouseButton}`
  | `${MouseClick}.${MouseModificators}.${MouseButton}`

  /** Defines the behaviour of the Contextual Menu Items */
export interface ContextualMenuOption {
  /** Unique name to identify the action, replace 'label' if not defined */
  name?: string
  /** Generates a divider */
  type?: "divider"
  /** Text to show on the menu */
  label?: string
  /** Icon to show on the menu */
  icon?: string
  /** Classname to be added to the menu option */
  class?: string
  /** Defines specific items to have this menu option */
  scope?: string | string[]
  /** Defines specific events when this option is shown */
  on?: MouseEvents | MouseEvents[]
}

/** Event emmitted by the context menu when an option is clicked */
export interface ContextualMenuEvent {
  /** Action selected by the user */
  action: string
  /** Item over the event was performed */
  item: string
}

export type MouseOptionButtons = "main" | "auxiliar" | "secondary"
export type MenuOptionName = MouseClick | `${MouseClick}_${MouseOptionButtons}` | `${MouseClick}_${MouseModificators}_${MouseOptionButtons}`
export type MenuOptions = Map<MenuOptionName, ContextualMenuOption[]>
