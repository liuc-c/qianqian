<script lang="ts" setup>
import type { Topic } from '@/api/print/topicType'

defineProps<{ topic: Topic; questionType: string }>()
</script>

<template>
  <div>
    <template v-if="topic.mainTopic !== ''">
      <p>{{ topic.linkNo }}. 【{{ questionType }}】</p>
      <p><span text-green>题干：</span><span v-html="`${topic.mainTopic}`" /></p>
      <p><span text-green>问：</span><span v-html="`${topic.topic}`" /></p>
    </template>
    <template v-else>
      <p v-html="`${topic.linkNo}. 【${questionType}】${topic.topic}`" />
    </template>
  </div>
</template>

<style scoped>

</style>
