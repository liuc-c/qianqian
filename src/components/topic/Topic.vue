<script lang="ts" setup>
import type { Topic } from '@/api/print/topicType'
import { useShowAnswer } from '@/composables/useTopic'
defineProps<{ topic: Topic[] }>()
const { showAnswer, changeShowAnswer } = useShowAnswer()
const questions = {
  '08': 'A3/A4型题',
  '09': 'B型题',
  '06': 'A1型题',
  '07': 'A2型题',
  '14': '案例分析题',
  '02': 'X型题(多选)',
}
const router = useRouter()
const go = (val) => {
  router.push(`/print/${val}`)
}
const printPdf = () => {
  window.print()
}
</script>

<template>
  <div class="fixed-box">
    <n-button class="show-answer mr-3" size="tiny" type="info" @click="printPdf()">
      打印
    </n-button>
    <n-button class="show-answer mr-3" size="tiny" type="success" @click="go('qt')">
      其他
    </n-button>
    <n-button class="show-answer mr-3" size="tiny" type="success" @click="go('jzk')">
      急诊科
    </n-button>
    <n-button class="show-answer mr-3" size="tiny" type="success" @click="go('zzjhs')">
      重症监护室
    </n-button>
    <n-button class="show-answer mr-3" size="tiny" type="success" @click="changeShowAnswer">
      {{ showAnswer ? '隐藏答案' : '显示答案' }}
    </n-button>
  </div>

  <div text-left>
    <template v-for="item in topic">
      <template v-if="item.rightResult.length > 1">
        <topic-multiple :key="item.questionId" :question-type="questions[item.typeCode]" :topic="item" />
      </template>
      <template v-else>
        <topic-radio :key="item.questionId" :question-type="questions[item.typeCode]" :topic="item" />
      </template>
    </template>
  </div>
</template>

<style scoped>
.fixed-box {
  position: fixed;
  top: 12px;
  right: 50px;
}
.fixed-box>button{
  background-color:var(--n-color);
}
@media print {
  .fixed-box{
    display: none;
  }
}
</style>
