<script lang="ts" setup>
import type { topicTypeType } from '@/composables/useFilterQuestions'

const props = defineProps<{ active: boolean; windowWidth: number; topicTypeArr: topicTypeType }>()
const emits = defineEmits<{
  (event: 'update:active', active: boolean): void
  (event: 'update:topicTypeArr', topicTypeArr: topicTypeType): void
}>()
</script>

<template>
  {{ topicTypeArr }}
</template>

<style scoped>

</style>
