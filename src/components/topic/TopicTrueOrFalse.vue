<script lang="ts" setup>
import type { Topic } from '@/api/print/topicType'
import { useGreenMode, useShowAnswer } from '@/composables/useTopic'

defineProps<{ topic: Topic; questionType: string }>()
const { showAnswer } = useShowAnswer()
const { greenMode } = useGreenMode()
</script>

<template>
  <div :class="{ 'true-of-false-box': greenMode }">
    <topic-common :question-type="questionType" :topic="topic" />
    <TransitionGroup name="list">
      <template v-for="item in topic.choiceAnswers" :key="`${topic.questionId}${item.mark}`">
        <span v-if="item.correct && showAnswer " class="text-green" ml-5 v-html="item.choiceAnswer" />
      </template>
    </TransitionGroup>
  </div>
</template>

<style scoped>
.true-of-false-box{
  display: flex;
}
</style>
