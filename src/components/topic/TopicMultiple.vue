<script lang="ts" setup>
import type { Topic } from '@/api/print/topicType'
import { useGreenMode, useShowAnswer } from '@/composables/useTopic'

defineProps<{ topic: Topic; questionType: string }>()
const { showAnswer } = useShowAnswer()
const { greenMode } = useGreenMode()
</script>

<template>
  <topic-common :question-type="questionType" :topic="topic" />
  <div :class="{ 'answer-box': greenMode }">
    <template v-for="item in topic.choiceAnswers" :key="`${topic.questionId}${item.mark}`">
      <p :class="{ 'text-green': item.correct && showAnswer }">
        <span v-html="item.mark" />. <span v-html="item.choiceAnswer" />
      </p>
    </template>
  </div>
</template>

<style scoped>

</style>
