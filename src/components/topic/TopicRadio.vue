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
        <template v-if="questionType === 'B型题' && item.correct && showAnswer">
          <p class="text-green">
            <span v-html="item.mark" />. <span v-html="item.choiceAnswer" />
          </p>
        </template>
        <template v-else-if="questionType !== 'B型题'">
          <p :class="{ 'text-green': item.correct && showAnswer }">
            <span v-html="item.mark" />. <span v-html="item.choiceAnswer" />
          </p>
        </template>
      </template>
    </TransitionGroup>
  </div>
</template>

<style scoped>

</style>
