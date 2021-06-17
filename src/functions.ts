import { ContextualMenuOption, MouseEvents, MenuOptions, EventMetaData } from "vue-context-menu"

function isValidMouseEvent(str: string): str is MouseEvents {
  return (
    /^(click|dblclick|main|auxiliar|secondary|left|middle|right)$/.test(str) ||
    /^(ctrl|alt|shift|meta)\.(aux|sec)$/.test(str) ||
    /^((ctrl|alt|shift|meta)\.)?(main|auxiliar|secondary|left|middle|right)$/.test(str) ||
    /^(click|dblclick)(\.(ctrl|alt|shift|meta))?(\.(main|auxiliar|secondary|left|middle|right|aux|sec))?$/.test(str)
  )
}

function getMetaData(e: string): EventMetaData {
  const isDblClick = /^dblclick/.test(e)

  return {
    click: !isDblClick,
    dblclick: isDblClick,

    ctrl: /ctrl/.test(e),
    meta: /meta/.test(e),
    alt: /alt/.test(e),
    shift: /shift/.test(e),

    main: /(main|left)/.test(e),
    auxiliar: !isDblClick && /(aux|middle)/.test(e),
    secondary: !isDblClick && /(sec|right)/.test(e),
  }
}

export function compileEvents(eventsString?: string, options?: string | ContextualMenuOption[]): MenuOptions {
  if (!options || typeof options === "string") return []

  const events = ((eventsString ?? "").replaceAll(/\s/g, "").split(",") as MouseEvents[]).filter(name => isValidMouseEvent(name))

  const menuOptions = [] as MenuOptions
  for (const opt of options) {
    let name =
      opt.name ??
      Math.random()
        .toString()
        .slice(2, 5)

    const metaData = [] as EventMetaData[]
    ;(!opt.on ? events : Array.isArray(opt.on) ? opt.on : [opt.on]) //
      .forEach(event => metaData.push(getMetaData(event)))
    menuOptions.push({ ...opt, name, metaData })
  }
  return menuOptions
}