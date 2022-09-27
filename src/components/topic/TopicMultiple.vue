<script lang="ts" setup>
import type { Ref } from 'vue'
import { useTopicAnimeOfArr } from '@/composables/useTopicAnime'
import type { Topic } from '@/api/print/topicType'
import { useGreenMode, useShowAnswer } from '@/composables/useTopic'

defineProps<{ topic: Topic; questionType: string }>()
const { showAnswer } = useShowAnswer()
const { greenMode } = useGreenMode()
// 选项动画
const topicOptions: Ref<HTMLElement[]> = ref([])
useTopicAnimeOfArr(topicOptions, greenMode)
</script>

<template>
  <topic-common :question-type="questionType" :topic="topic" />
  <div :class="{ 'answer-box': greenMode }" ml-5>
    <template v-for="item in topic.choiceAnswers" :key="`${topic.questionId}${item.mark}`">
      <p ref="topicOptions" :class="{ 'text-green': item.correct && showAnswer }">
        <span v-html="item.mark" />. <span v-html="item.choiceAnswer" />
      </p>
    </template>
  </div>
</template>

<style scoped>

</style>
