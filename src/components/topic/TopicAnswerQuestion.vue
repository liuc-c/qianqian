<script lang="ts" setup>
import type { Topic } from '@/api/print/topicType'
import { useGreenMode, useShowAnswer } from '@/composables/useTopic'

defineProps<{ topic: Topic; questionType: string }>()
const { showAnswer } = useShowAnswer()
const { greenMode } = useGreenMode()
</script>

<template>
  <!-- 简答题和名词解释题 -->
  <topic-common :question-type="questionType" :topic="topic" />
  <div :class="{ 'answer-area': !greenMode && !showAnswer }" ml-5>
    <TransitionGroup name="list">
      <p v-if="showAnswer" class="text-green">
        <span v-html="topic.answerAnalyse" />
      </p>
    </TransitionGroup>
  </div>
</template>

<style scoped>
.answer-area{
  margin-bottom: 50px;
}
</style>
