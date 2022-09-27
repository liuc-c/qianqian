import type { Ref } from 'vue'
import * as _ from 'lodash'
import { useTopic } from '@/composables/useTopic'
export type topicTypeType = Ref<{ [key: string]: string | boolean }[] | []>
export type questionsType = Ref<{ [key: string]: string }>

const topicTypeArr: topicTypeType = ref([])
const questions: questionsType = ref({
  '01': '未知题型01',
  '02': 'X型题(多选)', // 正常多选题
  '03': '填空题', // 核医学
  '04': '判断题', // 核医学
  '05': '未知题型05',
  '06': 'A1型题', // 普通单选题
  '07': 'A2型题', // 案例单选题
  '08': 'A3/A4型题', // 类似案例分析题
  '09': 'B型题', // 题干和选项相同，选项在题干中，问题不同
  '10': 'C型题', // 类似B型题
  '11': '未知题型11',
  '12': '名词解释', // 核医学
  '13': '简答题', // 核医学
  '14': '案例分析题', // 题干相同，选项不同，选项在问题中
})
const { topic } = useTopic()

const unique = (arr: any[], val: string) => {
  const count = _.countBy(arr, val)
  const res = new Set()
  return arr.filter(item => !res.has(item[val]) && res.add(item[val])).map((item) => {
    const temp: { [key: string]: any } = {}
    temp[val] = item[val]
    temp.label = questions.value[item[val]]
    temp.isShow = true
    temp.count = count[temp[val]]
    return temp
  })
}

export const useFilterQuestionsWatch = () => {
  topicTypeArr.value = unique(topic.value, 'typeCode')
  watch(topic, (topic) => {
    topicTypeArr.value = unique(topic, 'typeCode')
  })
  return {
    topicTypeArr,
  }
}
export const useTopicTypeArr = () => { return { topicTypeArr } }

export const useQuestions = () => {
  return questions
}

// 是否只显示新增题目
const isOnlyShowNewTopic = ref<boolean>(false)
export const useShowNewTopic = () => {
  const changeIsOnlyShowNewTopic = () => {
    isOnlyShowNewTopic.value = !isOnlyShowNewTopic.value
  }
  return {
    isOnlyShowNewTopic,
    changeIsOnlyShowNewTopic,
  }
}
export const isShowTopic = (typeCode: string, isNewTopic: boolean) => {
  const item = topicTypeArr.value.find(item => item.typeCode === typeCode)
  let isShow: boolean
  if (isOnlyShowNewTopic.value)
    isShow = isNewTopic && item?.isShow as boolean
  else
    isShow = item?.isShow as boolean
  return isShow
}
