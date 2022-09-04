<script lang="ts" setup>
import type { Ref } from 'vue'
import type { Topic } from '@/api/print/topicType'
import { useShowAnswer, useTopicLoad } from '@/composables/useTopic'
import { useWindowWidth } from '@/composables/useWindowWidth'

defineProps<{ topic: Topic[]; name: string }>()
const { topicLoading } = useTopicLoad()
const {
  showAnswer,
  changeShowAnswer,
} = useShowAnswer()
const active: Ref<boolean> = ref(false)
const questions = {
  // '01': '',
  '02': 'X型题(多选)',
  '03': '填空题',
  '04': '判断题',
  // '05': '',
  '06': 'A1型题',
  '07': 'A2型题',
  '08': 'A3/A4型题',
  '09': 'B型题',
  // '10': '',
  // '11': '',
  '12': '名词解释',
  '13': '简答题',
  '14': '案例分析题',
}
const printPdf = () => {
  active.value = false
  window.print()
}

const windowWidth = useWindowWidth()
</script>

<template>
  <div class="fixed-box print-hidden">
    <n-button class="show-answer mr-3" size="tiny" type="info" @click="printPdf()">
      打印
    </n-button>
    <n-button class="show-answer mr-3" size="tiny" type="success">
      题型
    </n-button>
    <n-button class="show-answer mr-3" size="tiny" type="success" @click="active = !active">
      章节
    </n-button>
    <n-button class="show-answer mr-3" size="tiny" type="success" @click="changeShowAnswer">
      {{ showAnswer ? '隐藏答案' : '显示答案' }}
    </n-button>
  </div>
  <template v-if="topicLoading">
    <n-skeleton height="40px" mb-6 mt-6 width="33%" />
    <n-skeleton :repeat="40" text />
  </template>
  <template v-else>
    <n-h1 align-text class="topic-title" prefix="bar" type="success">
      <n-text type="success">
        {{ name }}
      </n-text>
    </n-h1>
    <div text-left>
      <template v-if="topic.length === 0">
        <div>暂无数据，请检查链接是否正确</div>
      </template>
      <template v-for="item in topic">
        <template v-if="questions[item.typeCode] === '填空题'">
          <topic-input :key="item.questionId" :question-type="questions[item.typeCode]" :topic="item" />
        </template>
        <template v-else-if="item.rightResult.length > 1">
          <topic-multiple :key="item.questionId" :question-type="questions[item.typeCode]" :topic="item" />
        </template>
        <template v-else>
          <topic-radio :key="item.questionId" :question-type="questions[item.typeCode]" :topic="item" />
        </template>
      </template>
    </div>
  </template>
  <n-drawer v-model:show="active" :width="windowWidth < 600 ? windowWidth : 600" placement="right">
    <n-drawer-content title="章节">
      <chapter v-model:active="active" :window-width="windowWidth" />
    </n-drawer-content>
  </n-drawer>
</template>

<style scoped>
.topic-title{
  text-align: left;
}
.fixed-box {
  position: fixed;
  top: 12px;
  right: 50px;
}

.fixed-box > button {
  background-color: var(--n-color);
}
</style>
