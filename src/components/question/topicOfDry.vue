<script setup>
import { useMessage } from 'naive-ui'
const props = defineProps(['topicOfDryData'])
// const value = ref(null)
const message = useMessage()
const result = ref('')
const questionsType = {
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
}
// 单选校验规则
// const rules = {
//   radioGroupValue: {
//     required: true,
//     trigger: 'change',
//     message: '请选择 radioGroupValue',
//   },
// }
function handleValidateClick(e) {
  e.preventDefault()
  console.log(result.value)
  result.value?.validate((errors) => {
    if (!errors)
      message.success('Valid')

    else

      message.error('Invalid')
  })
}
// 正确答案颜色
function publishedQuestionsType(str) {
  return questionsType[str]
}
</script>

<template>
  <n-form
    ref="result"
    inline
    :label-width="80"
    :model="formValue"
    :rules="rules"
    :size="size"
  >
    <n-form-item>
      <n-button attr-type="button" @click="handleValidateClick">
        提交
      </n-button>
    </n-form-item>
    <n-form-item label="Radio Group" path="radioGroupValue">
      <n-list hoverable clickable>
        <n-list-item v-for="(item, index) in topicOfDryData.slice(0, 4)" :key="index">
          <n-thing :title="`${`${index + 1}.`}${`${item.topic}：`}`" content-style="margin-top: 10px;">
            <template #description>
              <n-space size="small" style="margin-top: 4px">
                <n-tag :bordered="false" type="info" size="small">
                  {{ publishedQuestionsType(item.typeCode) }}
                </n-tag>
                <n-tag :bordered="false" type="info" size="small">
                  ♥
                </n-tag>
              </n-space>
            </template>
            <n-radio-group v-model:value="model.radioGroupValue" name="radiogroup">
              <n-space v-for="choice in item.choiceAnswers">
                <n-radio :key="choice.choiceAnswer" :value="choice.choiceAnswer">
                  <span :class="{ actived: choice.correct } ">{{ choice.mark }}.{{ choice.choiceAnswer }}</span>
                </n-radio>
              </n-space>
            </n-radio-group>
          </n-thing>
        </n-list-item>
      </n-list>
    </n-form-item>
  </n-form>
</template>

<style scoped lang="scss">
.n-list{
  font-size: 1rem;
  text-align: left;
    .actived{
      color:red;
    }
}
</style>
