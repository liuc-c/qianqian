<script lang="ts" setup>
import type { Ref } from 'vue'
import { useFilterQuestions, useQuestions } from '@/composables/useFilterQuestions'
import FilterQuestions from '@/components/topic/FilterQuestions.vue'
import type { Topic } from '@/api/print/topicType'
import { useShowAnswer, useTopicLoad } from '@/composables/useTopic'
import { useWindowWidth } from '@/composables/useWindowWidth'

const props = defineProps<{ topic: Topic[]; name: string }>()
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
let topicTypeArr

watchEffect(() => {
  topicTypeArr = useFilterQuestions(props.topic).topicTypeArr
}, { flush: 'post' })

// 抽屉控制
const drawerFlag = ref('')
const openDrawer = (flag: string) => {
  drawerFlag.value = flag
  active.value = !active.value
}
</script>

<template>
  <div class="fixed-box print-hidden">
    <n-button class="show-answer mr-3" size="tiny" type="info" @click="printPdf()">
      打印
    </n-button>
    <n-button class="show-answer mr-3" size="tiny" type="success" @click="openDrawer('filterQuestions')">
      题型
    </n-button>
    <n-button class="show-answer mr-3" size="tiny" type="success" @click="openDrawer('chapter')">
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
    <template v-if="drawerFlag === 'filterQuestions'">
      <FilterQuestions v-model:active="active" v-model:topicTypeArr="topicTypeArr" :window-width="windowWidth" />
    </template>
    <template v-else-if="drawerFlag === 'chapter'">
      <chapter v-model:active="active" :window-width="windowWidth" />
    </template>
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
