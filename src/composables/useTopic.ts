import type { Topic } from '@/api/print/topicType'

const showAnswer = ref(false)

export const useTopic = function (val: string) {
  const list: Topic[] = JSON.parse(val) as Topic[]
  return ref<Topic[]>(list)
}

export const useShowAnswer = function () {
  const changeShowAnswer = function () {
    showAnswer.value = !showAnswer.value
  }
  return { showAnswer, changeShowAnswer }
}
