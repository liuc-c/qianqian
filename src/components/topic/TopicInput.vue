<script lang="ts" setup>
import type { Topic } from '@/api/print/topicType'
import { useShowAnswer } from '@/composables/useTopic'

defineProps<{ topic: Topic; questionType: string }>()
const { showAnswer } = useShowAnswer()
</script>

<template>
  <topic-common :question-type="questionType" :topic="topic" />
  <div>
    <template v-for="item in topic.choiceAnswers" :key="`${topic.questionId}${item.mark}`">
      <p v-if="item.correct && showAnswer " class="text-green">
        <span v-html="item.mark" />. <span v-html="item.choiceAnswer" />
      </p>
    </template>
  </div>
  <br>
</template>

<style scoped>

</style>
