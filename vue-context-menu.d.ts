import { DefineComponent, Plugin } from 'vue';

declare const ContextMenu: DefineComponent<{}, {}, any> & { install: Exclude<Plugin['install'], undefined> };
export default ContextMenu;

export type MouseClick = "click" | "dblclick"
type MouseModificators = "ctrl" | "alt" | "shift" | "meta"

type MouseButton = "main" | "left"
type MouseButtonLong = MouseButton | "secondary" | "right" | "auxiliar" | "middle"
type MouseButtonShort = "sec" | "aux"
type AllButtons = MouseButtonLong | MouseButtonShort

type MouseCombination = `${MouseModificators}.${AllButtons}`
export type MouseEvents =
  | MouseClick
  | MouseButtonLong
  | MouseCombination
  | `click.${MouseModificators | AllButtons | MouseCombination}`
  | `dblclick.${MouseModificators | MouseButton}`
  | `dblclick.${MouseModificators}.${MouseButton}`

  /** Defines the behaviour of the Contextual Menu Items */
export interface ContextualMenuOption {
  /** Use a name slot instead of the auto-genrated li element */
  use?: string
  /** When true a menu divider is generated, useful to organice actions */
  isDivider?: boolean

  /** Unique name to identify the action, replace 'label' if not defined */
  name?: string
  /** Text to show on the menu */
  label?: string
  /** Icon to show on the menu */
  icon?: string
  /** Classname to be added to the menu li option */
  class?: string

  /** Defines specific items to have this menu option */
  scope?: string | string[]
  /**
   * Defines specific events when this option is shown
   * Should be `MouseEvents` comma separated
   */
  on?: string
}


/** Event emmitted by the context menu when an option is clicked */
export interface ContextualMenuEvent {
  /** Action selected by the user */
  action: string
  /** Item over the event was performed */
  item: string
}

// export type MouseOptionButtons = "main" | "auxiliar" | "secondary"
// export type MenuOptionName = MouseClick | `${MouseClick}_${MouseModificators}` | `${MouseClick}_${MouseOptionButtons}` | `${MouseClick}_${MouseModificators}_${MouseOptionButtons}`
// export type MenuOptionName =
//   | MouseClick
//   | `${MouseClick}.${MouseModificators}`
//   | `${MouseClick}.${MouseOptionButtons}`
//   | `${MouseClick}.${MouseModificators}.${MouseOptionButtons}`
// export type MenuOptions = Map<MenuOptionName, ContextualMenuOption[]>

export interface EventMetaData {
  click: boolean
  dblclick: boolean
  ctrl: boolean
  meta: boolean
  alt: boolean
  shift: boolean
  main: boolean
  auxiliar: boolean
  secondary: boolean
}
export type MenuOptions = Array<ContextualMenuOption & { name: string; metaData: Array<EventMetaData> }>
