<script lang="ts" setup>
import type { Topic } from '@/api/print/topicType'
import { useGreenMode, useShowAnswer } from '@/composables/useTopic'

defineProps<{ topic: Topic; questionType: string }>()
const { showAnswer } = useShowAnswer()
const { greenMode } = useGreenMode()
</script>

<template>
  <topic-common :question-type="questionType" :topic="topic" />
  <div :class="{ 'answer-box': greenMode }" ml-5>
    <TransitionGroup name="list">
      <template v-for="item in topic.choiceAnswers" :key="`${topic.questionId}${item.mark}`">
        <p v-if="item.correct && showAnswer " class="text-green">
          <span v-html="item.mark" />. <span border-b v-html="item.choiceAnswer" />
        </p>
      </template>
    </TransitionGroup>
  </div>
</template>

<style scoped>

</style>
