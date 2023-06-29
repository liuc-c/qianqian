import type { Ref } from 'vue'
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

export const chapter = ref([
  {
    label: '超声医学科',
    child: [
      {
        label: '急诊科及重症监护室',
        child: [
          { label: '其他', newCount: 49, updateTime: '2022/9/27 22:40' },
          { label: '重症监护室', newCount: 3378, updateTime: '2022/9/27 22:40' },
          { label: '急诊科', newCount: 1995, updateTime: '2022/9/27 22:40' },
        ],
      },
      {
        label: '内科',
        child: [
          { label: '其他', newCount: 0, updateTime: '2022/9/12 21:00' },
        ],
      },
      {
        label: '超声医学科',
        child: [
          { label: '其他', newCount: 1425, updateTime: '2022/9/27 22:40' },
          { label: '其他2', newCount: 4, updateTime: '2022/9/27 22:40' },
          { label: '超声基础', newCount: 643, updateTime: '2022/9/27 22:40' },
          { label: '介入超声', newCount: 45, updateTime: '2022/9/27 22:40' },
          { label: '周围血管', newCount: 282, updateTime: '2023/6/30 01:20' },
          { label: '基础知识', newCount: 504, updateTime: '2022/9/27 22:40' },
          { label: '头颈、四肢和浅表器官', newCount: 233, updateTime: '2022/9/27 22:40' },
          { label: '妇产科', newCount: 1702, updateTime: '2022/9/27 22:40' },
          { label: '小儿', newCount: 2, updateTime: '2022/9/27 22:40' },
          { label: '心脏', newCount: 1831, updateTime: '2022/9/27 22:40' },
          { label: '心脏和胸壁、胸膜腔', newCount: 481, updateTime: '2022/9/27 22:40' },
          { label: '泌尿系统、腹膜后间隙、大血管和肾上腺', newCount: 195, updateTime: '2022/9/27 22:40' },
          { label: '浅表器官', newCount: 775, updateTime: '2022/9/27 22:40' },
          { label: '浅表器官与周围血管', newCount: 0, updateTime: '2023/6/30 01:20' },
          { label: '肌肉骨关节及外周神经系统', newCount: 61, updateTime: '2022/9/27 22:40' },
          { label: '肝脏和脾脏', newCount: 156, updateTime: '2022/9/27 22:40' },
          { label: '胆道、胰腺和胃肠', newCount: 159, updateTime: '2022/9/27 22:40' },
          { label: '腹部(含胸部)', newCount: 2862, updateTime: '2022/9/27 22:40' },
        ],
      },
      {
        label: '医学影像科',
        child: [
          { label: '其他', newCount: 0, updateTime: '2022/9/12 21:00' },
          { label: '介入放射学', newCount: 0, updateTime: '2022/9/12 21:00' },
          { label: '呼吸系统', newCount: 0, updateTime: '2022/9/12 21:00' },
          { label: '基础知识', newCount: 0, updateTime: '2022/9/12 21:00' },
          { label: '循环系统', newCount: 0, updateTime: '2022/9/12 21:00' },
          { label: '泌尿（含生殖）', newCount: 0, updateTime: '2022/9/12 21:00' },
          { label: '消化系统', newCount: 0, updateTime: '2022/9/12 21:00' },
          { label: '神经（含头颈部）', newCount: 0, updateTime: '2022/9/12 21:00' },
          { label: '骨关节', newCount: 0, updateTime: '2022/9/12 21:00' },
        ],
      },
      {
        label: '外科',
        child: [
          { label: '其他', newCount: 0, updateTime: '2022/9/12 21:00' },
        ],
      },
      {
        label: '核医学科',
        child: [
          { label: '其他', newCount: 0, updateTime: '2022/9/12 21:00' },
        ],
      },
      {

      },
      {
        label: '妇产科',
        child: [
          { label: '其他', newCount: 2447, updateTime: '2022/9/27 22:40' },
        ],
      },
      {
        label: '出科考试',
        child: [
          { label: '重症医学科', newCount: 0, updateTime: '2022/9/12 21:00' },
          { label: '妇产科', newCount: 0, updateTime: '2022/11/22 23:00' },
        ],
      },
    ],
  },
],
)

/**
 * 根据题目名称获取当前章节信息
 * @param name xx-xx-xx  例：超声医学科-超声医学科-其他
 */
export const getChapterByName = (name: string) => {
  const initData = { label: '', newCount: 0, updateTime: '未知' }
  let currentChapter: { label: string; newCount: number ;updateTime: string } = initData
  if (name) {
    const arr = name.split('-')
    if (arr.length === 3) {
      currentChapter = chapter.value.find(x => x.label === arr[0])
        ?.child?.find(x => x.label === arr[1])
        ?.child?.find(x => x.label === arr[2]) || initData
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
