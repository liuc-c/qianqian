import type { Ref } from 'vue'
import * as _ from 'lodash'
import { useTopic } from '@/composables/useTopic'
export type topicTypeType = Ref<{ [key: string]: string | boolean }[] | []>
export type questionsType = Ref<{ [key: string]: string }>

const topicTypeArr: topicTypeType = ref([])
const questions: questionsType = ref({
  '01': '未知题型01',
  '02': 'X型题(多选)',
  '03': '填空题',
  '04': '判断题',
  '05': '未知题型05',
  '06': 'A1型题',
  '07': 'A2型题',
  '08': 'A3/A4型题',
  '09': 'B型题',
  '10': '未知题型10',
  '11': '未知题型11',
  '12': '名词解释',
  '13': '简答题',
  '14': '案例分析题',
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

export const isShowTopic = (typeCode: string) => {
  return topicTypeArr.value.find(item => item.typeCode === typeCode)?.isShow
}
