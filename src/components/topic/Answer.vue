<script lang="ts" setup>
import type { Topic } from '@/api/print/topicType'
import { useAnswerAnalyse } from '@/composables/useTopic'

defineProps<{ topic: Topic; questionType: string }>()
const {
  answerAnalyse,
} = useAnswerAnalyse()
</script>

<template>
  <div class="seal">
    <n-text :type="topic.isDelete ? 'error' : 'info'" mr-1>
      {{ topic.linkNo }}.
    </n-text>
    <template v-if="questionType === '简答题' || questionType === '名词解释'">
      <span v-html="topic.answerAnalyse" />
    </template>
    <template v-else-if="questionType === '判断题'">
      <template v-for="item in topic.choiceAnswers" :key="`${topic.questionId}${item.mark}`">
        <span v-if="item.correct" v-html="item.choiceAnswer" />
      </template>
    </template>
    <template v-else-if="topic.rightResult">
      <span>{{ topic.rightResult }}</span>
    </template>
    <template v-else>
      <template v-for="item in topic.choiceAnswers" :key="item.mark">
        <span v-if="item.correct">{{ item.mark }}</span>
        <!-- 填空题 -->
        <template v-if="topic.typeCode === '03'">
          <span mr-1>.</span>
          <span border-b v-html="item.choiceAnswer" />
          <span mr-4 />
        </template>
      </template>
    </template>
    <!-- 解析 -->
    <template
      v-if="topic.answerAnalyse && answerAnalyse
        && !(questionType === '简答题' || questionType === '名词解释')"
    >
      <n-text ml-2 type="info">
        解析：
      </n-text>
      <span v-html="topic.answerAnalyse" />
    </template>
  </div>
</template>

<style scoped>

</style>
