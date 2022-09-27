<script lang="ts" setup>
import type { Topic } from '@/api/print/topicType'
defineProps<{ topic: Topic; questionType: string }>()
</script>

<template>
  <div>
    <template v-if="topic.mainTopic !== ''">
      <template v-if="isRepeatMainTopic(topic.mainTopic) || isLastRepeatMainTopic(topic.mainTopic)">
        <p>
          <n-text v-if="topic.isNewTopic" class="print-hidden mr-1" type="error">
            NEW
          </n-text>
          <n-text mr-1 type="info">
            {{ topic.linkNo }}.
          </n-text><span text-green>问：</span><span v-html="`${topic.topic}`" />
        </p>
      </template>
      <template v-else>
        <p>【{{ questionType }}】</p>
        <p><span text-green>题干：</span><span v-html="`${topic.mainTopic}`" /></p>
        <p>
          <n-text v-if="topic.isNewTopic" class="print-hidden mr-1" type="error">
            NEW
          </n-text>
          <n-text mr-1 type="info">
            {{ topic.linkNo }}.
          </n-text><span text-green>问：</span><span v-html="`${topic.topic}`" />
        </p>
      </template>
    </template>
    <template v-else>
      <p>
        <n-text v-if="topic.isNewTopic" class="print-hidden mr-1" type="error">
          NEW
        </n-text>
        <n-text mr-1 type="info">
          {{ topic.linkNo }}.
        </n-text><span v-html="` 【${questionType}】${topic.topic}`" />
      </p>
    </template>
  </div>
</template>

