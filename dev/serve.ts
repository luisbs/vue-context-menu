import { createApp } from "vue"
import Dev from "./serve.vue"
import ContextMenu from "@/entry"

const app = createApp(Dev)
app.use(ContextMenu)

app.mount("#app")
