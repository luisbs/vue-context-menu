<script lang="ts">
import { defineComponent } from 'vue';
import ContextMenu from '@/context-menu.vue';

export default defineComponent({
  name: 'ServeDev',
  components: {
    ContextMenu
  }
});
</script>

<template>
  <div id="app">
    <context-menu />
  </div>
</template>
