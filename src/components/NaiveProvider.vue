<script lang="ts" setup>
import { defineComponent, h } from 'vue'

const NaiveProviderContent = defineComponent({
  name: 'NaiveProviderContent',
  setup() {
  },
  render() {
    return h('div')
  },
})
</script>

<template>
  <n-loading-bar-provider>
    <n-dialog-provider>
      <n-notification-provider>
        <n-message-provider>
          <slot />
          <NaiveProviderContent />
        </n-message-provider>
      </n-notification-provider>
    </n-dialog-provider>
  </n-loading-bar-provider>
</template>

<style scoped>

</style>
