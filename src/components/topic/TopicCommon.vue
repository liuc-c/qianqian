<script lang="ts" setup>
import type { Topic } from '@/api/print/topicType'
import { isLastRepeatMainTopic, isRepeatMainTopic } from '@/composables/useTopic'
defineProps<{ topic: Topic; questionType: string }>()
</script>

<template>
  <div>
    <template v-if="topic.mainTopic !== ''">
      <template v-if="isRepeatMainTopic(topic.mainTopic) || isLastRepeatMainTopic(topic.mainTopic)">
        <p><span text-green>{{ topic.linkNo }}. 问：</span><span v-html="`${topic.topic}`" /></p>
      </template>
      <template v-else>
        <p>【{{ questionType }}】</p>
        <p><span text-green>题干：</span><span v-html="`${topic.mainTopic}`" /></p>
        <p><span text-green>{{ topic.linkNo }}. 问：</span><span v-html="`${topic.topic}`" /></p>
      </template>
    </template>
    <template v-else>
      <p><span text-green>{{ topic.linkNo }}.</span><span v-html="` 【${questionType}】${topic.topic}`" /></p>
    </template>
  </div>
</template>

<style scoped>

</style>
