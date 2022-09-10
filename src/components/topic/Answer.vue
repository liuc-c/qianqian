<script lang="ts" setup>
import type { Topic } from '@/api/print/topicType'
import { useAnswerAnalyse } from '@/composables/useTopic'

defineProps<{ topic: Topic }>()
const {
  answerAnalyse,
} = useAnswerAnalyse()
</script>

<template>
  <div class="seal">
    <span text-green>{{ topic.linkNo }}. </span>
    <template v-if="topic.rightResult">
      <span>{{ topic.rightResult }}</span>
    </template>
    <template v-else>
      <template v-for="item in topic.choiceAnswers" :key="item.mark">
        <span v-if="item.correct">{{ item.mark }}</span>
        <!-- 填空题 -->
        <template v-if="topic.typeCode === '03'">
          <span>.&nbsp;</span>
          <span border-b v-html="item.choiceAnswer" />
          <span>&nbsp;&nbsp;</span>
        </template>
      </template>
    </template>
    <template v-if="topic.answerAnalyse && answerAnalyse">
      <n-text ml-2 type="info">
        解析：
      </n-text>
      <span v-html="topic.answerAnalyse" />
    </template>
    <br>
  </div>
</template>

<style scoped>

</style>
