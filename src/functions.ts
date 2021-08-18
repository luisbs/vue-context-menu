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

export function matchEvent(event: MouseEvent, metaData: EventMetaData[], mode: string, btn?: string): boolean {
  if (mode === "dblclick") {
    return metaData.some(data =>
      !data.dblclick ||
      (data.ctrl && !event.ctrlKey) ||
      (data.meta && !event.metaKey) ||
      (data.alt && !event.altKey) ||
      (data.shift && !event.shiftKey) ||
      event.button !== 0
        ? false
        : true
    )
  }

  // Single click
  return metaData.some(data =>
    !data.click ||
    (data.ctrl && !event.ctrlKey) ||
    (data.meta && !event.metaKey) ||
    (data.alt && !event.altKey) ||
    (data.shift && !event.shiftKey) ||
    (data.main && event.button !== 0) ||
    // (data.auxiliar && event.button !== 1) ||
    (data.auxiliar && btn !== "auxiliar") ||
    // (data.secondary && event.button !== 2) ||
    (data.secondary && btn !== "secondary")
      ? false
      : true
  )
}

// ? subir por el path de elementos hasta encontrar el elemento wrapper del context
export function findInPath(event: Event, delimiter: string, attr = "id"): string | undefined {
  try {
    const path = (event.composedPath() as HTMLElement[]) ?? ((event as unknown) as { path: HTMLElement[] }).path ?? []
    for (const el of path) {
      if (el.parentElement?.classList.contains(delimiter)) return el.getAttribute(attr) ?? el.id
    }
  } catch (error) {
    console.warn(`vue-context-menu: Not found child element attr 'id' of element with class '${delimiter}'`)
  }

  return (event.target as HTMLElement).id || undefined
}
