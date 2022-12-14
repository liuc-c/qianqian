<script lang="ts" setup>
import type { Ref } from 'vue'
import TopicTrueOrFalse from '@/components/topic/TopicTrueOrFalse.vue'
import { isShowTopic, useFilterQuestionsWatch, useQuestions, useShowNewTopic } from '@/composables/useFilterQuestions'

import FilterQuestions from '@/components/topic/FilterQuestions.vue'
import { getChapterByName, useAnswerAnalyse, useAnswerMode, useGreenMode, useShowAnswer, useTopic, useTopicLoad } from '@/composables/useTopic'
import { useWindowWidth } from '@/composables/useWindowWidth'

defineProps<{ name: string }>()
const { topic } = useTopic()
const { topicLoading } = useTopicLoad()
const { showAnswer, changeShowAnswer } = useShowAnswer()
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

const showTopic = computed(() => {
  return topic.value.filter(item => isShowTopic(item.typeCode, item.isNewTopic))
})

const { changeGreenMode, greenMode } = useGreenMode()
const { changeAnswerMode, answerMode } = useAnswerMode()
const { changeAnswerAnalyse, answerAnalyse } = useAnswerAnalyse()
const { changeIsOnlyShowNewTopic, isOnlyShowNewTopic } = useShowNewTopic()
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
      <n-button
        key="answerAnalyse" :type="answerAnalyse ? 'success' : 'info'" size="tiny"
        @click="changeAnswerAnalyse()"
      >
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
  <!-- 骨架加载 -->
  <template v-if="topicLoading">
    <n-skeleton height="40px" mb-6 mt-6 width="33%" />
    <n-skeleton :repeat="40" text />
  </template>
  <template v-else>
    <!-- 标题 -->
    <n-h1 align-text class="left-title" prefix="bar" type="success">
      <n-text type="success">
        {{ name }}
      </n-text>
    </n-h1>
    <!--    更新信息 -->
    <n-blockquote class="left-title print-hidden">
      <div>
        <n-text>
          更新时间：
        </n-text>
        <n-text type="success">
          {{ getChapterByName(name).updateTime }}
        </n-text>
      </div>
      <div>
        <n-text>
          新增题数：
        </n-text>
        <n-text type="success">
          {{ getChapterByName(name).newCount }}
        </n-text>
      </div>
      <n-button key="greenMode" :type="isOnlyShowNewTopic ? 'success' : 'info'" size="tiny" @click="changeIsOnlyShowNewTopic()">
        {{ isOnlyShowNewTopic ? '显示所有题目' : '只显示新增题目' }}
      </n-button>
    </n-blockquote>
    <!-- 答案模式 -->
    <div v-if="answerMode" :style="{ flexDirection: greenMode ? 'row' : 'column' }" class="answer-mode">
      <TransitionGroup name="list">
        <template v-for="item in showTopic" :key="item.questionId">
          <div text-left>
            <answer :question-type="questions[item.typeCode]" :topic="item" />
          </div>
        </template>
      </TransitionGroup>
    </div>
    <!-- 题目模式 -->
    <div v-else pb-10 text-left>
      <template v-if="topic.length === 0">
        <div>暂无数据，请检查链接是否正确或重新加载</div>
      </template>
      <TransitionGroup name="list">
        <template v-for="item in showTopic" :key="item.questionId">
          <div class="seal">
            <!-- 填空题 -->
            <template v-if="questions[item.typeCode] === '填空题'">
              <topic-input :key="item.questionId" :question-type="questions[item.typeCode]" :topic="item" />
            </template>
            <!-- 简答题和名词解释题 -->
            <template v-else-if="questions[item.typeCode] === '简答题' || questions[item.typeCode] === '名词解释'">
              <topic-answer-question :key="item.questionId" :question-type="questions[item.typeCode]" :topic="item" />
            </template>
            <!-- 判断题 -->
            <template v-else-if="questions[item.typeCode] === '判断题'">
              <TopicTrueOrFalse :key="item.questionId" :question-type="questions[item.typeCode]" :topic="item" />
            </template>
            <!-- 多选题 -->
            <template v-else-if="item.rightResult.length > 1">
              <topic-multiple :key="item.questionId" :question-type="questions[item.typeCode]" :topic="item" />
            </template>
            <!-- 单选题 -->
            <template v-else>
              <topic-radio :key="item.questionId" :question-type="questions[item.typeCode]" :topic="item" />
            </template>
            <!-- 解析 (简答题和名词解释不需要解析,解析即答案) -->
            <div
              v-if="item.answerAnalyse !== '' && answerAnalyse
                && !(questions[item.typeCode] === '简答题' || questions[item.typeCode] === '名词解释')" mt-1
            >
              <n-text type="info">
                解析
              </n-text>
              <span v-html="item.answerAnalyse" />
            </div>
            <template v-if="item.mainTopic === '' || isLastRepeatMainTopic(item.mainTopic)">
              <br>
            </template>
          </div>
        </template>
      </TransitionGroup>
    </div>
  </template>
  <!-- 抽屉 -->
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
.answer-mode {
  display: flex;
  flex-wrap: wrap;

  > div {
    margin-right: 30px;
    margin-bottom: 6px;
  }
}

.left-title {
  text-align: left;
}

.fixed-box {
  position: fixed;
  z-index: 999;
  top: 12px;
  right: 60px;
}
</style>
