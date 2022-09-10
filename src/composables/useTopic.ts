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

// 题目 watch
export const useTopicWatch = async (name: string) => {
  const getTopicList = async () => {
    topicLoading.value = true
    document.title = name
    const subjectArr = name.split('-')
    if (subjectArr.length === 3) {
      const url = `${subjectArr[0]}/${subjectArr[1]}/${subjectArr[2]}`
      const res = await loadJson(url) as Topic[]
      let preMainTopic = ''
      let preMainTopicLinkNo = 0
      let preAnswerAnalyse = ''
      let preAnswerAnalyseLinkNo = 0
      topic.value = res.map((item) => {
        // 处理重复题干
        if (item.mainTopic !== '') {
          if (preMainTopic !== item.mainTopic) {
            preMainTopic = item.mainTopic
            preMainTopicLinkNo = item.linkNo
          }
          else {
            item.mainTopic = `同${preMainTopicLinkNo}题`
          }
        }
        // 处理重复解析
        if (item.answerAnalyse !== '') {
          if (item.answerAnalyse !== preAnswerAnalyse) {
            preAnswerAnalyse = item.answerAnalyse
            preAnswerAnalyseLinkNo = item.linkNo
          }
          else {
            item.answerAnalyse = `同${preAnswerAnalyseLinkNo}题`
          }
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
  // {
  //   label: '内科',
  //   child: [
  // { label: '重症监护病房（ICU）' }, //TODO
  //     {
  //       label: '呼吸内科',
  //       child: [
  //         { label: '其他' },
  //         { label: '职业性肺病' },
  //         { label: '呼吸内科辅助检查和治疗' },
  //         { label: '呼吸系统相关综合征' },
  //         { label: '呼吸衰竭' },
  //         { label: '原发性支气管肺癌' },
  //         { label: '呼吸系统疾病总论' },
  //         { label: '支气管扩张症' },
  //         { label: '感染性疾病' },
  //         { label: '肺血管病' },
  //         { label: '肉芽性肺疾病' },
  //         { label: '弥漫性间质性肺疾病' },
  //         { label: '少见呼吸系统疾病' },
  //         { label: '老年呼吸系统疾病' },
  //         { label: '特发性间质性肺炎和其他弥漫性肺疾病' },
  //         { label: '慢性阻塞性肺疾病' },
  //         { label: '肺血栓栓塞症' },
  //         { label: '气流阻塞性疾病' },
  //         { label: '睡眠呼吸暂停综合征' },
  //         { label: '肺结核病' },
  //         { label: '胸膜疾病' },
  //         { label: '急性上呼吸道感染及急性气管-支气管炎' },
  //         { label: '肺脓肿' },
  //         { label: '肺动脉高压与肺源性心脏病' },
  //         { label: '肺炎' },
  //         { label: '肺间质病' },
  //         { label: '肺部肿瘤' },
  //         { label: '呼吸系统常见症状' },
  //       ],
  //     },
  //     {
  //       label: '心血管内科（含心电图室）',
  //       child: [
  //         { label: '其他' },
  //         { label: '主动脉和周围血管疾病' },
  //         { label: '心内科治疗' },
  //         { label: '心电图室' },
  //         { label: '其他心脏病' },
  //         { label: '心律失常' },
  //         { label: '先天性心血管疾病' },
  //         { label: '心内科其他辅助检查' },
  //         { label: '心肌疾病' },
  //         { label: '心源性晕厥' },
  //         { label: '心脏骤停与心脏性猝死' },
  //         { label: '心包疾病' },
  //         { label: '低血压' },
  //         { label: '风湿性心脏病' },
  //         { label: '心脏肿瘤' },
  //         { label: '总论' },
  //         { label: '常见心脏病急诊的诊断与处理' },
  //         { label: '感染性心内膜炎' },
  //         { label: '高血压' },
  //         { label: '动脉粥样硬化和冠状动脉粥样硬化性心脏病' },
  //         { label: '心血管神经症' },
  //         { label: '心脏瓣膜病' },
  //         { label: '心力衰竭' },
  //         { label: '心功能不全' },
  //         { label: '功能性心脏不适' },
  //         { label: '肺动脉高压和肺源性心脏病' },
  //         { label: '循环系统疾病总论' },
  //       ],
  //     },
  //     { label: '消化内科' },
  //     { label: '内分泌科' },
  //     { label: '急诊科' },
  //     { label: '神经内科' },
  //     { label: '肾脏内科' },
  //     { label: '血液内科' },
  //     { label: '感染科' },
  //     { label: '风湿免疫内科' },
  //     { label: '皮肤病科' },
  //     { label: '老年病房' },
  //     { label: '内科门诊（包括内科各亚专业）' },
  //     { label: '肿瘤内科（含放疗科）' },
  //     { label: '医学影像科（含超声科和核医学科）' },
  //   ],
  // },
  {
    label: '超声医学科',
    child: [
      {
        label: '急诊科及重症监护室',
        child: [
          { label: '其他' },
          { label: '重症监护室' },
          { label: '急诊科' },
        ],
      },
      {
        label: '内科',
        child: [
          { label: '其他' },
        ],
      },
      {
        label: '超声医学科',
        child: [
          { label: '其他' },
          { label: '超声基础' },
          { label: '心脏和胸壁、胸膜腔' },
          { label: '胆道、胰腺和胃肠' },
          { label: '妇产科' },
          { label: '肝脏和脾脏' },
          { label: '头颈、四肢和浅表器官' },
          { label: '泌尿系统、腹膜后间隙、大血管和肾上腺' },
        ],
      },
      {
        label: '医学影像科',
        child: [
          { label: '其他' },
          { label: '介入放射学' },
          { label: '呼吸系统' },
          { label: '基础知识' },
          { label: '循环系统' },
          { label: '泌尿（含生殖）' },
          { label: '消化系统' },
          { label: '神经（含头颈部）' },
          { label: '骨关节' },
        ],
      },
      {
        label: '外科',
        child: [
          { label: '其他' },
        ],
      },
      {
        label: '出科考试',
        child: [
          { label: '重症医学科' },
        ],
      },

      // {
      //   label: '核医学科',
      //   child: [ // TODO
      //     { label: '其他' },
      //   ],
      // },
      // {

      // },
      // {
      //   label: '妇产科', // TODO
      //   child: [
      //     { label: '其他' },
      //   ],
      // },
    ],
  },
],
)

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
