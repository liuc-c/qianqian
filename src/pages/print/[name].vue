<script lang="ts" setup>
import { useTopicWatch } from '@/composables/useTopic'
const { name } = defineProps<{ name: string }>()
watchEffect(async () => {
  await useTopicWatch(name)
}, { flush: 'post' })
</script>

<template>
  <Topic :name="name" />
</template>
