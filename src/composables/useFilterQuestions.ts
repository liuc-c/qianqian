import type { Ref } from 'vue'
import type { Topic } from '@/api/print/topicType'

export type topicTypeType = Ref<{ [key: string]: string | boolean }[] | []>
export type questionsType = Ref<{ [key: string]: string }>

const topicTypeArr: topicTypeType = ref([])
const questions: questionsType = ref({
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
})

const unique = (arr: any[], val: string) => {
  const res = new Set()
  return arr.filter(item => !res.has(item[val]) && res.add(item[val])).map((item) => {
    const temp: { [key: string]: any } = {}
    temp[val] = item[val]
    temp.label = questions.value[item[val]]
    temp.isShow = true
    return temp
  })
}

export const useFilterQuestions: (topic: Topic[]) =>
{
  topicTypeArr: topicTypeType
} = (topic: Topic[]) => {
  topicTypeArr.value = unique(topic, 'typeCode')
  return {
    topicTypeArr,
  }
}

export const useQuestions = () => {
  return questions
}

