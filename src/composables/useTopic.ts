import type { Ref } from 'vue'
import chapters from '@/utils/chapter.json'
import { getList } from '@/api/print/topic'
import type { Topic } from '@/api/print/topicType'

const showAnswer = ref(false)
const topicLoading = ref(false)
const topic: Ref<Topic[]> = ref([])
const greenMode = ref(false)

// 绿色模式，省点纸
export const useGreenMode = () => {
  const changeGreenMode = () => {
    greenMode.value = !greenMode.value
  }
  return {
    greenMode,
    changeGreenMode,
  }
}

// 答案模式
const answerMode = ref(false)
export const useAnswerMode = () => {
  const changeAnswerMode = () => {
    answerMode.value = !answerMode.value
  }
  return {
    answerMode,
    changeAnswerMode,
  }
}

// 答案解析相关
const answerAnalyse = ref(false)
export const useAnswerAnalyse = () => {
  const changeAnswerAnalyse = () => {
    answerAnalyse.value = !answerAnalyse.value
  }
  return {
    answerAnalyse,
    changeAnswerAnalyse,
  }
}

// 题目加载
export const useTopicLoad = () => {
  const loading = function () {
    topicLoading.value = true
  }
  const unLoading = function () {
    topicLoading.value = false
  }
  return {
    topicLoading,
    loading,
    unLoading,
  }
}

/**
 * 是否是重复的题干
 * @param str 题干
 */
export const isRepeatMainTopic = (str: string) => {
  const rex = /^-\d+$/
  return rex.test(str)
}

/**
 * 是否是最后一个重复的题干
 * @param str 题干
 */
export const isLastRepeatMainTopic = (str: string) => {
  const rex = /^-\d+-last$/
  return rex.test(str)
}

// 题目 watch
export const useTopicWatch = async (name: string) => {
  const getTopicList = async () => {
    topicLoading.value = true
    document.title = name
    const subjectArr = name.split('-')
    if (subjectArr.length === 3) {
      const url = `${subjectArr[0]}/${subjectArr[1]}/${subjectArr[2]}`
      const res = await loadJson(url) as Topic[]
      let preMainTopic = '' // 上一个相同的题干
      let preMainTopicLinkNo = 0 // 第一个相同题干的题号
      let nextMainTopicLinkNo = 0 // 上一个相同题干的题号
      let preAnswerAnalyse = '' // 上一个相同的解析
      topic.value = res.map((item) => {
        // 处理重复题干
        if (item.mainTopic !== '') {
          if (preMainTopic !== item.mainTopic) {
            if (nextMainTopicLinkNo !== 0 && isRepeatMainTopic(res[nextMainTopicLinkNo - 1].mainTopic))
              res[nextMainTopicLinkNo - 1].mainTopic = `-${preMainTopicLinkNo}-last`

            preMainTopic = item.mainTopic
            preMainTopicLinkNo = item.linkNo
            nextMainTopicLinkNo = item.linkNo
          }
          else {
            item.mainTopic = `-${preMainTopicLinkNo}`
            nextMainTopicLinkNo = item.linkNo
          }
        }
        // 处理重复解析
        if (item.answerAnalyse !== '') {
          if (item.answerAnalyse !== preAnswerAnalyse)
            preAnswerAnalyse = item.answerAnalyse
          else
            item.answerAnalyse = ''
        }
        return item
      })
    }
    else {
      topic.value = []
    }
    await nextTick()
    topicLoading.value = false
  }

  async function loadJson(url: string) {
    // 加载
    try {
      return await getList(`/json/医学电子书包/${url}.json`)
    }
    catch (e) {
      return []
    }
  }

  await getTopicList()
}

export const useTopic = () => {
  return { topic }
}

export const chapter = ref(chapters)

/**
 * 根据题目名称获取当前章节的日志信息
 * @param name xx-xx-xx  例：超声医学科-超声医学科-其他
 */
export const getChapterLogByName = (name: string) => {
  interface Chapter { time: number; newCount: number; deleteCount: number; updateTime: string }
  const initData: Array<Chapter> = [{
    time: 0,
    newCount: 0,
    deleteCount: 0,
    updateTime: '未知',
  }]
  let currentChapter: Array<Chapter> = initData
  if (name) {
    const arr = name.split('-')
    if (arr.length === 3) {
      currentChapter = chapter.value.find(x => x.label === arr[0])
        ?.child?.find(x => x.label === arr[1])
        ?.child?.find(x => x.label === arr[2])?.updateLog as Array<Chapter> || initData
      return currentChapter
    }
  }
  return currentChapter
}
// 题目模式下 答案的显示与隐藏
export const useShowAnswer = function () {
  const changeShowAnswer = function () {
    showAnswer.value = !showAnswer.value
  }
  return {
    showAnswer,
    changeShowAnswer,
  }
}
