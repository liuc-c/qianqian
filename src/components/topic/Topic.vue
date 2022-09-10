<script lang="ts" setup>
import type { Ref } from 'vue'
import { useFilterQuestionsWatch, useQuestions } from '@/composables/useFilterQuestions'

import FilterQuestions from '@/components/topic/FilterQuestions.vue'
import {
  useAnswerAnalyse,
  useAnswerMode,
  useGreenMode,
  useShowAnswer,
  useTopic,
  useTopicLoad,
} from '@/composables/useTopic'
import { useWindowWidth } from '@/composables/useWindowWidth'

defineProps<{ name: string }>()
const { topic } = useTopic()
const { topicLoading } = useTopicLoad()
const {
  showAnswer,
  changeShowAnswer,
} = useShowAnswer()
const active: Ref<boolean> = ref(false)

const printPdf = () => {
  active.value = false
  window.print()
}

// 抽屉宽度
const windowWidth = useWindowWidth()

const questions = useQuestions()

// 题型控制
const route = useRoute()
const { topicTypeArr } = useFilterQuestionsWatch()

// 抽屉控制
const drawerFlag = ref('')
const openDrawer = (flag: string) => {
  drawerFlag.value = flag
  active.value = !active.value
}
const {
  changeGreenMode,
  greenMode,
} = useGreenMode()
const {
  changeAnswerMode,
  answerMode,
} = useAnswerMode()
const {
  changeAnswerAnalyse,
  answerAnalyse,
} = useAnswerAnalyse()
</script>

<template>
  <div class="fixed-box print-hidden">
    <n-space :wrap-item="true">
      <n-button key="print" class="show-answer" size="tiny" type="info" @click="printPdf()">
        打印
      </n-button>
      <n-button key="greenMode" :type="greenMode ? 'success' : 'info'" size="tiny" @click="changeGreenMode()">
        {{ greenMode ? '不省了' : '省点纸吧' }}
      </n-button>
      <n-button key="answerAnalyse" :type="answerAnalyse ? 'success' : 'info'" size="tiny" @click="changeAnswerAnalyse()">
        {{ answerAnalyse ? '不要解析' : '来点解析' }}
      </n-button>
      <n-button key="answerMode" :type="answerMode ? 'success' : 'info'" size="tiny" @click="changeAnswerMode()">
        {{ answerMode ? '题目模式' : '答案模式' }}
      </n-button>
      <n-button key="filterQuestions" size="tiny" type="success" @click="openDrawer('filterQuestions')">
        题型
      </n-button>
      <n-button key="chapter" size="tiny" type="success" @click="openDrawer('chapter')">
        章节
      </n-button>
      <n-button key="showAnswer" :disabled="answerMode" size="tiny" type="success" @click="changeShowAnswer">
        {{ showAnswer ? '隐藏答案' : '显示答案' }}
      </n-button>
    </n-space>
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
    <div v-if="answerMode" :style="{ flexDirection: greenMode ? 'row' : 'column' }" class="answer-mode">
      <TransitionGroup name="list">
        <template v-for="item in topic">
          <div v-if="isShowTopic(item.typeCode)" :key="item.questionId" text-left>
            <answer :topic="item" />
          </div>
        </template>
      </TransitionGroup>
    </div>
    <div v-else text-left>
      <template v-if="topic.length === 0">
        <div>暂无数据，请检查链接是否正确</div>
      </template>
      <TransitionGroup name="list">
        <template v-for="item in topic" :key="item.questionId">
          <div v-if="isShowTopic(item.typeCode)">
            <template v-if="questions[item.typeCode] === '填空题'">
              <topic-input :key="item.questionId" :question-type="questions[item.typeCode]" :topic="item" />
            </template>
            <template v-else-if="item.rightResult.length > 1">
              <topic-multiple :key="item.questionId" :question-type="questions[item.typeCode]" :topic="item" />
            </template>
            <template v-else>
              <topic-radio :key="item.questionId" :question-type="questions[item.typeCode]" :topic="item" />
            </template>
            <div v-if="item.answerAnalyse && answerAnalyse" mt-1>
              <n-text type="info">
                解析
              </n-text>
              <span v-html="item.answerAnalyse" />
            </div>
            <br>
          </div>
        </template>
      </TransitionGroup>
    </div>
  </template>
  <n-drawer v-model:show="active" :width="windowWidth < 600 ? windowWidth : 600" placement="right">
    <template v-if="drawerFlag === 'filterQuestions'">
      <FilterQuestions v-model:active="active" v-model:topicTypeArr="topicTypeArr" />
    </template>
    <template v-else-if="drawerFlag === 'chapter'">
      <chapter v-model:active="active" :window-width="windowWidth" />
    </template>
  </n-drawer>
</template>

<style lang="scss" scoped>
.answer-mode{
  display: flex;
  flex-wrap: wrap;
  >div{
    margin-right: 30px;
    margin-bottom: 6px;
  }
}
.topic-title {
  text-align: left;
}

.fixed-box {
  position: fixed;
  z-index: 999;
  top: 12px;
  right: 60px;
}
</style>
